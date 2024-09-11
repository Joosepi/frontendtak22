const express = require('express');
const axios = require('axios');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/:city', auth, async (req, res) => {
    const { city } = req.params;
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

module.exports = router;
