var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"","category":"page"},{"location":"api/","page":"API","title":"API","text":"Modules = [Krotov]","category":"page"},{"location":"api/#Krotov.KrotovWrk","page":"API","title":"Krotov.KrotovWrk","text":"Krotov Workspace.\n\n\n\n\n\n","category":"type"},{"location":"examples/state_to_state_rwa/","page":"Example 2 (RWA)","title":"Example 2 (RWA)","text":"EditURL = \"https://github.com/QuantumControl-jl/Krotov.jl/blob/master/examples/state_to_state_rwa.jl\"","category":"page"},{"location":"examples/state_to_state_rwa/#Example-2:-Optimization-of-a-State-to-State-Transfer-in-a-Lambda-System-in-the-RWA","page":"Example 2 (RWA)","title":"Example 2: Optimization of a State-to-State Transfer in a Lambda System in the RWA","text":"","category":"section"},{"location":"examples/state_to_state_rwa/","page":"Example 2 (RWA)","title":"Example 2 (RWA)","text":"tip: Tip\nThis example is also available as a Jupyter notebook: state_to_state_rwa.ipynb","category":"page"},{"location":"examples/state_to_state_rwa/","page":"Example 2 (RWA)","title":"Example 2 (RWA)","text":"This example is illustrates the use of complex-valued control fields. This is accomplished by rewriting the Hamiltonian as the sum of two independent controls (real and imaginary parts). We consider a 3-level system in a Lambda configuration.","category":"page"},{"location":"examples/state_to_state_rwa/","page":"Example 2 (RWA)","title":"Example 2 (RWA)","text":"const σ̂_z = ComplexF64[1 0; 0 -1]\nconst σ̂_x = ComplexF64[0 1; 1  0]\n\n\n\"\"\"Two-level-system Hamiltonian.\"\"\"\nfunction hamiltonian(Ω=1.0, E0=0.2)\n\n    Ĥ₀ = -0.5 * Ω * σ̂_z\n    Ĥ₁ = σ̂_x\n\n    return [Ĥ₀, Ĥ₁]\n\nend","category":"page"},{"location":"examples/state_to_state_rwa/","page":"Example 2 (RWA)","title":"Example 2 (RWA)","text":"","category":"page"},{"location":"examples/state_to_state_rwa/","page":"Example 2 (RWA)","title":"Example 2 (RWA)","text":"This page was generated using Literate.jl.","category":"page"},{"location":"overview/#Overview","page":"Overview","title":"Overview","text":"","category":"section"},{"location":"examples/#Examples","page":"List of Examples","title":"Examples","text":"","category":"section"},{"location":"examples/","page":"List of Examples","title":"List of Examples","text":"Pages = [\n    \"simple_state_to_state.md\",\n    \"state_to_state_rwa.md\",\n]\nDepth = 1","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"EditURL = \"https://github.com/QuantumControl-jl/Krotov.jl/blob/master/examples/simple_state_to_state.jl\"","category":"page"},{"location":"examples/simple_state_to_state/#Example-1:-Optimization-of-a-State-to-State-Transfer-in-a-Two-Level-System","page":"Example 1 (TLS)","title":"Example 1: Optimization of a State-to-State Transfer in a Two-Level-System","text":"","category":"section"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"tip: Tip\nThis example is also available as a Jupyter notebook: simple_state_to_state.ipynb","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"gdefop1hat1 gdefinittextinit gdeftgttexttgt","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"This first example illustrates the basic use of the Krotov.jl by solving a simple canonical optimization problem: the transfer of population in a two level system.","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"using QuantumPropagators\nusing QuantumControlBase\nusing Krotov","category":"page"},{"location":"examples/simple_state_to_state/#Two-level-Hamiltonian","page":"Example 1 (TLS)","title":"Two-level Hamiltonian","text":"","category":"section"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"We consider the Hamiltonian opH_0 = - fracomega2 opsigma_z, representing a simple qubit with energy level splitting omega in the basis ket0ket1. The control field epsilon(t) is assumed to couple via the Hamiltonian opH_1(t) = epsilon(t) opsigma_x to the qubit, i.e., the control field effectively drives transitions between both qubit states.","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"const σ̂_z = ComplexF64[1 0; 0 -1];\nconst σ̂_x = ComplexF64[0 1; 1  0];\nnothing #hide","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"\"\"\"Two-level-system Hamiltonian.\"\"\"\nfunction hamiltonian(Ω=1.0, E0=0.2)\n    Ĥ₀ = -0.5 * Ω * σ̂_z\n    Ĥ₁ = σ̂_x\n    ϵ(t) = E0 * flattop(t, T=5, t_rise=0.3, func=:blackman)\n    return (Ĥ₀, (Ĥ₁, ϵ))\nend\n;\nnothing #hide","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"H = hamiltonian();\nnothing #hide","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"The control field here switches on from zero at t=0 to it's maximum amplitude 0.2 within the time period 0.3 (the switch-on shape is half a Blackman pulse). It switches off again in the time period 0.3 before the final time T=5). We use a time grid with 500 time steps between 0 and T:","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"tlist = collect(range(0, 5, length=500));\nnothing #hide","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"using PyPlot\n\nfunction plot_pulse(pulse::Vector, tlist)\n    fig, ax = matplotlib.pyplot.subplots(figsize=(6, 3))\n    ax.plot(tlist, pulse)\n    ax.set_xlabel(\"time\")\n    ax.set_ylabel(\"amplitude\")\n    return fig\nend\n\nplot_pulse(ϵ::T, tlist) where T<:Function =\n    plot_pulse([ϵ(t) for t in tlist], tlist)\n\nplot_pulse(H[2][2], tlist)","category":"page"},{"location":"examples/simple_state_to_state/#Optimization-target","page":"Example 1 (TLS)","title":"Optimization target","text":"","category":"section"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"The krotov package requires the goal of the optimization to be described by a list of Objective instances. In this example, there is only a single objective: the state-to-state transfer from initial state ketPsi_init = ket0 to the target state ketPsi_tgt = ket1, under the dynamics of the Hamiltonian opH(t):","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"function ket(label)\n    result = Dict(\n        \"0\" => Vector{ComplexF64}([1, 0]),\n        \"1\" => Vector{ComplexF64}([0, 1]),\n    )\n    return result[string(label)]\nend\n;\nnothing #hide","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"objectives = [Objective(initial_state=ket(0), generator=H, target=ket(1))]","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"problem = ControlProblem(\n    objectives=objectives,\n    pulse_options=Dict(\n        H[2][2]  => Dict(\n            :lambda_a => 5,\n            :update_shape => t -> flattop(t, T=5, t_rise=0.3, func=:blackman),\n        )\n    ),\n    tlist=tlist,\n);\nnothing #hide","category":"page"},{"location":"examples/simple_state_to_state/#Simulate-dynamics-under-the-guess-field","page":"Example 1 (TLS)","title":"Simulate dynamics under the guess field","text":"","category":"section"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"Before running the optimization procedure, we first simulate the dynamics under the guess field epsilon_0(t). The following solves equation of motion for the defined objective, which contains the initial state ketPsi_init and the Hamiltonian opH(t) defining its evolution.","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"guess_dynamics = propagate(\n        objectives[1], problem.tlist;\n        storage=true, observables=(Ψ->abs.(Ψ).^2, )\n)","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"function plot_population(pop0::Vector, pop1::Vector, tlist)\n    fig, ax = matplotlib.pyplot.subplots(figsize=(6, 3))\n    ax.plot(tlist, pop0, label=\"0\")\n    ax.plot(tlist, pop1, label=\"1\")\n    ax.legend()\n    ax.set_xlabel(\"time\")\n    ax.set_ylabel(\"population\")\n    return fig\nend\n\nplot_population(guess_dynamics[1,:], guess_dynamics[2,:], tlist)","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"","category":"page"},{"location":"examples/simple_state_to_state/","page":"Example 1 (TLS)","title":"Example 1 (TLS)","text":"This page was generated using Literate.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Krotov","category":"page"},{"location":"#Krotov.jl","page":"Home","title":"Krotov.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Julia implementation of Krotov's method for quantum optimal control","category":"page"},{"location":"","page":"Home","title":"Home","text":"Krotov.jl is a port of the krotov Python package","category":"page"},{"location":"#Overview","page":"Home","title":"Overview","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"overview.md\",\n]\nDepth = 1","category":"page"},{"location":"#Examples","page":"Home","title":"Examples","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"examples/simple_state_to_state.md\",\n    \"examples/state_to_state_rwa.md\",\n]\nDepth = 1","category":"page"},{"location":"#API","page":"Home","title":"API","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\n    \"api.md\",\n]\nDepth = 1","category":"page"}]
}
