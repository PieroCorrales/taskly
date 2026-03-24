import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            })
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('name', res.data.name)
            navigate('/tasks')
        } catch (err) {
            setError('Error al registrarse, prueba con otro email')
        }
    }

    return (
        <div className='auth-container'>
            <div className="card">
                <h2>Crear cuenta</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder='Contraseña'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='btn-primary'>Registrarse</button>
                </form>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        </div>
    )
}

export default Register