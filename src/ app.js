const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const weatherRoutes = require('./routes/weather');

app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);
app.use('/weather', weatherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
