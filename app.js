"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan")
const fs = require("fs") //FILES
const path = require("path") //PATHS


require("dotenv").config({ path: __dirname + "/config/.env" });

//Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, "backend-server-logs.log"), {flags: "a"})

//Routing
const litableRoute = require("./routes/litableRoutes");
const clientRoute = require("./routes/clientRoutes")

//Middlewares
app.use(bodyParser.json())

// Logging
app.use(logger("dev", {stream: accessLogStream}))


//Middleware for cors error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, PATCH');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});  

//Middleware routing
app.use("/litable", litableRoute);
app.use("/client",clientRoute)


//Handle Route Not found
app.use((req, res, next) => {
  res.status(404).json({
    Ressource: "Route Not found",
  });
});



//Handle Error thrown
app.use((error, req, res, next) => {
  res.status(422).json({
    message: error.message
  });
});

//Connect to mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e);
  });
