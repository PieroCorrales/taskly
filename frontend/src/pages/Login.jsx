import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('name', res.data.name)
            navigate('/tasks')
        } catch (err) {
            setError('Email o contraseña incorrectos')
        }
    }

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Iniciar sesión</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="btn-primary">Entrar</button>
                </form>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </div>
    )
}

export default Login