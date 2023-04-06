// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Require and initialze dotenv
require('dotenv').config();

// PORT Configuration
const port = process.env.PORT;

// Initailze Express
const app = express();

// Initialize Cors
const cors = require("cors");

// Mount Cors
app.use(cors());

// Imported Routes
const imageRoute = require('./routes/image');

// Mounted Routes
app.use('/', imageRoute);

// Database
mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.mongoDBURL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`MongoDB Connected Successfully`))
    .catch(err=>console.log(err))

// Listen to Port for Requests
app.listen(port, () => {
    console.log(`Cloudinary App is running on ${port}`);
})