import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching todos:', error));
    }, []);

    const addTodo = () => {
        if (text.trim() === '') return; // Prevent adding empty todo
        axios.post('http://localhost:5000/todos', { text })
            .then(response => {
                setTodos([...todos, { ...response.data, color: getRandomColor() }]);
                setText('');
            })
            .catch(error => console.error('Error adding todo:', error));
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== id));
            })
            .catch(error => console.error('Error deleting todo:', error));
    };

    const getRandomColor = () => {
        const colors = ['#e74c3c', '#8e44ad', '#3498db', '#f1c40f', '#2ecc71', '#e67e22'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="App">
            <div className="smoke"></div> {/* Smoke background */}
            <h1>To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} style={{ backgroundColor: todo.color || getRandomColor() }}>
                        {todo.text} <button className='del' onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
