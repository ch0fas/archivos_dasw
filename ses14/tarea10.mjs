import express from "express";
import chalk from "chalk";
import * as fs from "node:fs";

const app = express();
const port = 3000;



app.get("/", (req, res) =>
{
    console.log(chalk.blueBright("Entró a la raiz"));
    res.send("<b>Raiz</b>"); // el send siempre tiene que ser lo ULTIMO que se ejecuta
})

app.get("/users", (req, res) =>
{
    let read_users = function(error, data)
{
    if (error)
    {
        console.log(`Error: ${error}`);
    }
    console.table(JSON.parse(data).users);
    console.log(chalk.greenBright("Usuarios encontrados"));
    res.send("Usuarios encontrados");
}
    
    console.log(chalk.yellowBright("Consultando usuarios"));
    fs.readFile("users.json", "utf-8", read_users);
})

app.listen(port, () =>
{
    console.log(`Aplicación de ejemplo corriendo en ${port}`);
})
