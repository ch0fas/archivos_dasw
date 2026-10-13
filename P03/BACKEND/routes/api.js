const express = require('express');
const path = require('path');
const usersRoutes = require('./users');

const routerApi = express.Router();

routerApi.use("/users", usersRoutes);

function auth_entry(req, res, next)
{
    if (req.get("x-auth"))
    {
        next();
    } else
    {
        res.sendStatus(401);
    }
}

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
routerApi.get("/home.html", auth_entry, (req, res) => 
{
    res.sendFile(path.resolve(__dirname + "/../../FRONTEND/views/home.html"));
    
});
routerApi.get("/login.html", (req, res) => res.sendFile(path.resolve(__dirname+"/../../FRONTEND/views/login.html")));
routerApi.get("/tasks.html", auth_entry, (req, res) => 
{
    res.sendFile(path.resolve(__dirname+"/../../FRONTEND/views/tasks.html"));
});

module.exports = routerApi;