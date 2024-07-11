const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoute = require("./routes/user")
const taskRoute = require("./routes/task")
const taskboardRoute = require("./routes/taskboard")
const {authenticate} = require("./middlewares/auth")

const app = express();

mongoose.connect('mongodb://localhost:27017/todo');

app.use(express.json());
app.use(cors());


app.use("/api/v1/user",userRoute)
app.use("/api/v1/task",authenticate,taskRoute)
app.use("/api/v1/taskboard",authenticate,taskboardRoute)


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Internal Server Error' });
  });

app.listen(3000,() => {
    console.log("Server running on 3000");
})