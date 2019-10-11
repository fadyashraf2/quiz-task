const mongoose = require("mongoose");
const express = require("express");
const app = new express();
const server = require("http").createServer(app);
require('./dbConnection/db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require('./middlewares/auth');
var path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");


require("./models/quizModel");
require("./models/teacherModel");
const quizRouter = require('./routers/quizRouters')
const teacherRouter = require('./routers/teacherRouters')

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.text({ type: "text/html" }));
app.use(cors());

app.use(quizRouter);
app.use(teacherRouter);


/* app.post("/insert", (req, res) => {
  quizController.createNewQuiz
  console.log(req.body)
  
});
*/





//var distDir = __dirname + "/dist/";

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(express.static( __dirname + "/dist/assignment1/"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname ,'/dist/assignment1/index.html'));
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname ,'/dist/assignment1/index.html'));
});



app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
