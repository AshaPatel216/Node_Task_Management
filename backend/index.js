const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db'); // database connection

app.use(express.json()); // to parse the request body
app.use(cors()); // to allow requests from different origins

// Routes
app.use('/', (req, res, next) => {
    res.send('Hello World');
});


// Server is running on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
