const express = require("express");
const apiMethods = require("./routes/post")
const cors = require("cors")
var bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

//All routes will reside in this file

//get method 2 argument 1.path, 2.callback function 

app.use('/', apiMethods);

//app.use('/', encodeFn);

app.listen(4000)
