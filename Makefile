.PHONY: help test docs clean distclean devrepl codestyle servedocs
.DEFAULT_GOAL := help

JULIA ?= julia
PORT ?= 8000

define PRINT_HELP_JLSCRIPT
rx = r"^([a-z0-9A-Z_-]+):.*?##[ ]+(.*)$$"
for line in eachline()
    m = match(rx, line)
    if !isnothing(m)
        target, help = m.captures
        println("$$(rpad(target, 20)) $$help")
    end
end
endef
export PRINT_HELP_JLSCRIPT


help:  ## show this help
	@julia -e "$$PRINT_HELP_JLSCRIPT" < $(MAKEFILE_LIST)


test:  test/Manifest.toml  ## Run the test suite
	$(JULIA) --project=test --banner=no --startup-file=yes -e 'include("devrepl.jl"); test()'
	@echo "Done. Consider using 'make devrepl'"


test/Manifest.toml: test/Project.toml ../scripts/installorg.jl
	$(JULIA) --project=test ../scripts/installorg.jl
	@touch $@


devrepl:  ## Start an interactive REPL for testing and building documentation
	$(JULIA) --project=test --banner=no --startup-file=yes -i devrepl.jl


docs: test/Manifest.toml  ## Build the documentation
	$(JULIA) --project=test docs/make.jl
	@echo "Done. Consider using 'make devrepl'"

servedocs: test/Manifest.toml  ## Build (auto-rebuild) and serve documentation at PORT=8000
	$(JULIA) --project=test -e 'include("devrepl.jl"); servedocs(port=$(PORT), verbose=true)'

clean: ## Clean up build/doc/testing artifacts
	$(JULIA) -e 'include("test/clean.jl"); clean()'

codestyle: test/Manifest.toml ../.JuliaFormatter.toml ## Apply the codestyle to the entire project
	$(JULIA) --project=test -e 'using JuliaFormatter; format(".", verbose=true)'
	@echo "Done. Consider using 'make devrepl'"


distclean: clean ## Restore to a clean checkout state
	$(JULIA) -e 'include("test/clean.jl"); clean(distclean=true)'
