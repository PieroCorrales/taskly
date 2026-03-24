import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Tasks() {
    const [tasks, setTasks] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchTasks()
    }, [])

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', config)
            setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/tasks', {
                title,
                description
            }, config)
            setTasks([...tasks, res.data])
            setTitle('')
            setDescription('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleToggle = async (task) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/tasks/${task._id}`,
                { completed: !task.completed },
                config
            )
            setTasks(tasks.map(t => t._id === task._id ? res.data : t))
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, config)
            setTasks(tasks.filter(t => t._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        navigate('/login')
    }

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Hola, {name}</h2>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>

            <form onSubmit={handleCreate} style={{ marginBottom: '2rem' }}>
                <h3>Nueva tarea</h3>
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }}
                />
                <input
                    type="text"
                    placeholder="Descripción (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ display: 'block', width: '100%', marginBottom: '0.5rem' }}
                />
                <button type="submit">Añadir tarea</button>
            </form>

            <h3>Mis tareas</h3>
            {tasks.length === 0 && <p>No tienes tareas todavía.</p>}
            {tasks.map(task => (
                <div key={task._id} style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    borderRadius: '4px',
                    opacity: task.completed ? 0.5 : 1
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.title}
                            </strong>
                            {task.description && <p style={{ margin: '0.25rem 0 0' }}>{task.description}</p>}
                        </div>
                        <div>
                            <button onClick={() => handleToggle(task)} style={{ marginRight: '0.5rem' }}>
                                {task.completed ? '↩ Reabrir' : '✓ Completar'}
                            </button>
                            <button onClick={() => handleDelete(task._id)} style={{ color: 'red' }}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Tasks