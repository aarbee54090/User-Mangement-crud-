// Import dependencies
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors')

// Import Routes
const userRoutes = require('./routes/userRoutes');

// Define Port
const PORT = 5000;

// Initialize Express App
const app = express();

app.use(cors())
// Connect to Database
connectDB();


// Middleware to parse JSON request body
app.use(express.json());

// Use Routes
app.use('/api/users', userRoutes);

// GET request for server
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
