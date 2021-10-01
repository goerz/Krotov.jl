.PHONY: help test docs clean distclean devrepl
.DEFAULT_GOAL := help

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
    match = re.match(r'^([a-z0-9A-Z_-]+):.*?## (.*)$$', line)
    if match:
        target, help = match.groups()
        print("%-20s %s" % (target, help))
print("""
Instead of "make test", consider "make devrepl" if you want to run the test
suite or generate the docs repeatedly.

Make sure you have Revise.jl installed in your standard Julia environment
""")
endef
export PRINT_HELP_PYSCRIPT

GITORIGIN := $(shell git config remote.origin.url)

help:  ## show this help
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)


# We want to test against checkouts of QuantumControl packages
QUANTUMCONTROLBASE ?= ../QuantumControlBase.jl
QUANTUMPROPAGATORS ?= ../QuantumPropagators.jl
QUANTUMCONTROL ?= ../QuantumControl.jl


define DEV_PACKAGES
using Pkg;
Pkg.develop(path="$(QUANTUMCONTROLBASE)");
Pkg.develop(path="$(QUANTUMPROPAGATORS)");
Pkg.develop(path="$(QUANTUMCONTROL)");
endef
export DEV_PACKAGES

define ENV_PACKAGES
using Pkg;
$(DEV_PACKAGES)
Pkg.develop(PackageSpec(path=pwd()));
Pkg.instantiate()
endef
export ENV_PACKAGES


Manifest.toml: Project.toml $(QUANTUMCONTROLBASE)/Project.toml $(QUANTUMPROPAGATORS)/Project.toml $(QUANTUMCONTROL)/Project.toml 
	julia --project=. -e "$$DEV_PACKAGES;Pkg.instantiate()"


examples/dump/README.md:
	git clone --branch data-dump $(GITORIGIN) examples/dump


test:  Manifest.toml examples/dump/README.md ## Run the test suite
	@rm -f test/Manifest.toml  # Pkg.test cannot handle existing test/Manifest.toml
	julia --startup-file=yes -e 'using Pkg;Pkg.activate(".");Pkg.test(coverage=true)'
	@echo "Done. Consider using 'make devrepl'"


test/Manifest.toml: test/Project.toml $(QUANTUMCONTROLBASE)/Project.toml $(QUANTUMPROPAGATORS)/Project.toml $(QUANTUMCONTROL)/Project.toml
	julia --project=test -e "$$ENV_PACKAGES"


devrepl: test/Manifest.toml examples/dump/README.md ## Start an interactive REPL for testing and building documentation
	@julia --threads auto --project=test --banner=no --startup-file=yes -e 'include("test/init.jl")' -i


docs/Manifest.toml: docs/Project.toml $(QUANTUMCONTROLBASE)/Project.toml $(QUANTUMPROPAGATORS)/Project.toml $(QUANTUMCONTROL)/Project.toml
	julia --project=docs -e "$$ENV_PACKAGES"


docs: docs/Manifest.toml examples/dump/README.md ## Build the documentation
	julia --project=docs docs/make.jl
	@echo "Done. Consider using 'make devrepl'"


clean: ## Clean up build/doc/testing artifacts
	rm -f src/*.cov test/*.cov
	rm -f test/examples/*.*
	for file in examples/*.jl; do rm -f docs/src/"$${file%.jl}".*; done
	rm -rf docs/build


distclean: clean ## Restore to a clean checkout state
	rm -f Manifest.toml docs/Manifest.toml test/Manifest.toml
	rm -rf test/examples/dump docs/src/examples/dump
	rm -rf examples/dump
