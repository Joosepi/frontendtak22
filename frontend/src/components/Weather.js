// src/components/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const fetchWeather = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:5000/weather/${city}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWeather(response.data);
        } catch (error) {
            alert('Failed to fetch weather data');
        }
    };

    return (
        <div>
            <h2>Weather</h2>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
            />
            <button onClick={fetchWeather}>Get Weather</button>
            {weather && (
                <div>
                    <h3>{weather.name}</h3>
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp}°C</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
