const express = require('express');
const path = require('path');
const apiRoutes = require('./api'); // Import your new api.js

const app = express();
app.use(express.json()); // Allows your API to read JSON data

// Use the API routes for any path starting with /api
app.use('/api', apiRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Catch-all route to serve index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));