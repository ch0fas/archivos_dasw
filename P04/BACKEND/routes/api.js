const express = require('express');
const path = require('path');
const usersRoutes = require('./users');
const tasksRoutes = require('./tasks');
const tagsRoutes = require('./tags');

const routerApi = express.Router();

routerApi.use("/users", usersRoutes);
routerApi.use("/tasks", tasksRoutes);
routerApi.use("/tags", tagsRoutes);

routerApi.get("/", (req, res) => 
{
    if (req.get("x-auth"))
    {
        res.sendFile(path.resolve(__dirname+"/../../FRONTEND/views/home.html"))
    } else
    {
        res.sendFile(path.resolve(__dirname+"/../../FRONTEND/views/login.html"));
    }
});
routerApi.get("/login.html", (req, res) => res.sendFile(path.resolve(__dirname+"/../../FRONTEND/views/login.html")));

module.exports = routerApi;