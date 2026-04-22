const express = require('express');
const router = express.Router();

// Get all restaurants
router.get('/restaurants', (req, res) => {
    // Eventually, this will fetch from MongoDB
    res.json({ message: "List of restaurants from the API" });
});

// Submit a table booking
router.post('/book-table', (req, res) => {
    const bookingData = req.body;
    console.log("New Booking:", bookingData);
    res.status(201).json({ status: "Success", message: "Table Reserved!" });
});

module.exports = router;