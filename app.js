const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const otpRoutes = require('./Routes/otpRoutes');
const userRoutes = require('./Routes/userRoutes');
const addressRoutes = require('./Routes/addressRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const productsRoutes = require('./Routes/productsRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');






// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// START CORS Policy: needed for accessing APIs from frontend
app.use(cors());
// Define your CORS options
const corsOptions = {
    methods: 'GET, POST,PUT,DELETE', // Allow only these methods
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200,
};
const path = require('path');


app.use(cors(corsOptions));
// END CORS Policy:

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// API routes
app.use('/api', otpRoutes);
app.use('/api', userRoutes);
app.use('/api', addressRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productsRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);


// Serve static files correctly
app.use('/static', express.static(path.join(__dirname, 'static')));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    res.status(500).json({ status: false, error: { message: err.message, code: 500 } });
});

module.exports = app;
