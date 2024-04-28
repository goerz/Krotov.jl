using QuantumControlBase.QuantumPropagators.Controls: get_controls, discretize
using Printf
using Dates


"""Result object returned by [`optimize_krotov`](@ref).

# Attributes

The attributes of a `KrotovResult` object include

* `iter`:  The number of the current iteration
* `J_T`: The value of the final-time functional in the current iteration
* `J_T_prev`: The value of the final-time functional in the previous iteration
* `tlist`: The time grid on which the control are discetized.
* `guess_controls`: A vector of the original control fields (each field
  discretized to the points of `tlist`)
* optimized_controls: A vector of the optimized control fileds in the current
  iterations
* records: A vector of tuples with values returned by an `info_hook` routine
  passed to [`optimize`](@ref)
* converged: A boolean flag on whether the optimization is converged. This
  may be set to `true` by a `check_convergence` function.
* message: A message string to explain the reason for convergence. This may be
  set by a `check_convergence` function.

All of the above attributes may be referenced in a `check_convergence` function
passed to [`optimize(problem; method=Krotov)`](@ref QuantumControlBase.optimize(::ControlProblem, ::Val{:Krotov}))
"""
mutable struct KrotovResult{STST}
    tlist::Vector{Float64}
    iter_start::Int64  # the starting iteration number
    iter_stop::Int64 # the maximum iteration number
    iter::Int64  # the current iteration number
    secs::Float64  # seconds that the last iteration took
    tau_vals::Vector{ComplexF64}
    J_T::Float64  # the current value of the final-time functional J_T
    J_T_prev::Float64  # previous value of J_T
    guess_controls::Vector{Vector{Float64}}
    optimized_controls::Vector{Vector{Float64}}
    states::Vector{STST} # the forward-propagated states after each iteration
    start_local_time::DateTime
    end_local_time::DateTime
    records::Vector{Tuple}  # storage for info_hook to write data into at each iteration
    converged::Bool
    message::String
end

function KrotovResult(problem)
    tlist = problem.tlist
    controls = get_controls(problem.trajectories)
    iter_start = get(problem.kwargs, :iter_start, 0)
    iter_stop = get(problem.kwargs, :iter_stop, 5000)
    iter = iter_start
    secs = 0
    tau_vals = Vector{ComplexF64}()
    guess_controls = [discretize(control, tlist) for control in controls]
    J_T = 0.0
    J_T_prev = 0.0
    optimized_controls = [copy(guess) for guess in guess_controls]
    states = [similar(traj.initial_state) for traj in problem.trajectories]
    start_local_time = now()
    end_local_time = now()
    records = Vector{Tuple}()
    converged = false
    message = "in progress"
    KrotovResult{eltype(states)}(
        tlist,
        iter_start,
        iter_stop,
        iter,
        secs,
        tau_vals,
        J_T,
        J_T_prev,
        guess_controls,
        optimized_controls,
        states,
        start_local_time,
        end_local_time,
        records,
        converged,
        message
    )
end

Base.show(io::IO, r::KrotovResult) = print(io, "KrotovResult<$(r.message)>")
Base.show(io::IO, ::MIME"text/plain", r::KrotovResult) = print(
    io,
    """
Krotov Optimization Result
--------------------------
- Started at $(r.start_local_time)
- Number of trajectories: $(length(r.states))
- Number of iterations: $(max(r.iter - r.iter_start, 0))
- Value of functional: $(@sprintf("%.5e", r.J_T))
- Reason for termination: $(r.message)
- Ended at $(r.end_local_time) ($(Dates.canonicalize(Dates.CompoundPeriod(r.end_local_time - r.start_local_time))))
"""
)
