const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/auth');

//listar tareas ya creadas
router.get('/', protect, async(req, res) => {
    try{
        const task = await Task.find({ user: req.user.id});
        res.json(tasks);
    } catch (error){
        res.status(500).json({ message: 'Error del servidor' });
    }
});

//crear tarea
router.post('/', protect, async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({
            title,
            description,
            user: req.user.id
        });
        res.status(201).json(task);
    } catch(error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
});

//actualizar tareas
router.put('/:id', protect, async(req, res) => {
    try {


    } catch (error) {

    }
});


//eliminar tareas

module.exports = router;