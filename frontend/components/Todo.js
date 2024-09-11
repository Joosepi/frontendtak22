// src/components/Todo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchTodos = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/todo', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(response.data);
        } catch (error) {
            alert('Failed to fetch TODOs');
        }
    };

    const handleAddTodo = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/todo', {
                title,
                description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos([...todos, response.data]);
            setTitle('');
            setDescription('');
        } catch (error) {
            alert('Failed to add TODO');
        }
    };

    const handleDeleteTodo = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/todo/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            alert('Failed to delete TODO');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h2>TODO Management</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button onClick={handleAddTodo}>Add TODO</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.status}
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
