# Optimization of a State-to-State Transfer in a Lambda System in the RWA

# This example is illustrates the use of complex-valued control fields. This is
# accomplished by rewriting the Hamiltonian as the sum of two independent
# controls (real and imaginary parts). We consider a 3-level system in a
# $\Lamba$ configuration.

const σ̂_z = ComplexF64[1 0; 0 -1]
const σ̂_x = ComplexF64[0 1; 1  0]


"""Two-level-system Hamiltonian."""
function hamiltonian(Ω=1.0, E0=0.2)

    Ĥ₀ = -0.5 * Ω * σ̂_z
    Ĥ₁ = σ̂_x

    return [Ĥ₀, Ĥ₁]

end
