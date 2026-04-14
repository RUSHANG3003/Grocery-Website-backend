const express = require('express');
const cors = require('cors');
const app = require('./app');



// Define the port
const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 9001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });