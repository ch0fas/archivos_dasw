const express = require('express');
const path = require('path');
const router = require('./routes/api.js');
const app = express();
const port = 3000;

const FRONTEND = path.join(__dirname, "..",'FRONTEND');

app.use(express.json());
app.use("/controllers", express.static(path.join(FRONTEND, "controllers")));
app.use("/views", express.static(path.join(FRONTEND, "views")));
app.use("/assets", express.static(path.join(FRONTEND, "assets")));

app.use('/', router);

app.listen(port, () =>
{
    console.log(`Práctica 4 corriendo en puerto ${port}!`);
})