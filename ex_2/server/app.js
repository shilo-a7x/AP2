const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('mongoose');
const app = express();
const cors = require('cors');
const routes = require('./routes/Routes');
const { Counter } = require('./models/Counter');
const path = require('path');

require('dotenv').config();
// Middleware
app.use(bodyParser.json());
app.use(cors());


const startCounter = async () => {
    try {
        // Check if counter exists
        const counter = await Counter.findById('chatCounter');

        // If not, create it
        if (!counter) {
            const chatCounter = new Counter({ _id: 'chatCounter' });
            await chatCounter.save();
            console.log("Chat counter has been initialized.");
        } else {
            console.log("Chat counter already exists.");
        }
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        startCounter();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use("/api", routes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../AP2_EX2/build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../AP2_EX2/build', 'index.html'));
});

// Server runs on port 5000
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

