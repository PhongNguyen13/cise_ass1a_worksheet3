const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
// Accessing the path module
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// routes
const books = require('./routes/api/books');
const { Mongoose } = require('mongoose');

const app = express();

// Connect Database
require("dotenv").config()
//connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

//import your models
require("./models/quote");

mongoose
    .connectDB(
        process.env.MONGODB_CONNECTION_STRING, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
    )
    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.log(err));


// Init Middleware
app.use(express.json({ extended: false }));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world!'));

//import routes
require("./routes/quoteRoute.js")(app);

// use Routes
app.use('/api/books', books);

const PORT = process.env.PORT || 5000;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${PORT}`));