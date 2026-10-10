const express = require('express');
const router = require('./routes/api.js');
const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () =>
{
    console.log(`Práctica 3 corriendo en puerto ${port}!`);
})