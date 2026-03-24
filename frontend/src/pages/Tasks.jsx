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
    <div className="tasks-container">
      <div className="navbar">
        <h2>Hola, {name} 👋</h2>
        <button className="btn-secondary" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3>Nueva tarea</h3>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="btn-primary">Añadir tarea</button>
        </form>
      </div>

      <h3>Mis tareas</h3>
      {tasks.length === 0 && <p>No tienes tareas todavía.</p>}
      {tasks.map(task => (
        <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div>
            <p className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
          </div>
          <div className="task-actions">
            <button className="btn-success" onClick={() => handleToggle(task)}>
              {task.completed ? '↩ Reabrir' : '✓ Completar'}
            </button>
            <button className="btn-danger" onClick={() => handleDelete(task._id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tasks