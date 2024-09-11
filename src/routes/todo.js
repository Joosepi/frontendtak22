const express = require('express');
const auth = require('../../middlewares/auth');
const router = express.Router();

let todos = []; 

router.post('/', auth, (req, res) => {
    const { title, description } = req.body;
    const newTodo = {
        id: todos.length + 1,
        title,
        description,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

router.get('/', auth, (req, res) => {
    res.json(todos);
});

router.put('/:id', auth, (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    todo.status = status || todo.status;
    todo.updatedAt = new Date();

    res.json(todo);
});

router.delete('/:id', auth, (req, res) => {
    const { id } = req.params;
    todos = todos.filter(t => t.id !== parseInt(id));
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
