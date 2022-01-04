const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors())


const studentController = require("./controllers/student.controller")
const contestController = require("./controllers/contest.controller")

app.use("/student/create", studentController)
app.use("/contest", contestController);

module.exports = app;