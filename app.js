//require("dotenv").config({path: "./config.env"});
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
const bodyParser = require("body-parser");

// routes
const books = require('./routes/api/books');
const { Mongoose } = require("mongoose");
const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

//import your models
require("./models/book");

// Connect Database
//connectDB();
require("dotenv").config()

Mongoose
    .connectDB(
        "mongodb+srv://dbtest:dbtestpass@herokutest.7dl4r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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

//import routes
require("./routes/api/books")(app);

//app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
//app.use('/api/books', books);

/*if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/my-app/build')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'my-app', 'build', 'index.html'));
    })
} else {
    app.get('/', (req,res) => {
        res.send('API Running');
    });
}*/

// Step 1:
app.use(express.static(path.resolve(__dirname, "./my-app/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));