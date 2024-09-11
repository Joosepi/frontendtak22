// src/App.js
import React from 'react';
import Login from './components/Login';
import Todo from './components/Todo';
import Weather from './components/Weather';

function App() {
    return (
        <div className="App">
            <Login />
            <Todo />
            <Weather />
        </div>
    );
}

export default App;
