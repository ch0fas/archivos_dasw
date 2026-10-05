import cors from "cors";
import express from "express";
import chalk from "chalk";
import * as fs from "node:fs";
import asciiCats from "ascii-cats";

const app = express();
const port = 3000;

// Esto se pone antes de los gets
app.use(cors
(
    {
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
    }
));


app.use("/users", (req, res, next) =>
{
    console.log(chalk.blueBright("Method: ") + chalk.greenBright(req.method));
    console.log(chalk.blueBright("URL: ") + chalk.greenBright(req.originalUrl));
    console.log(chalk.blueBright("Date: ") + chalk.greenBright(new Date(Date.now()).toString()));
    console.log(chalk.blueBright("Content-Type: ") + chalk.greenBright(req.get("content-type")));
    if (req.get("x-auth"))
    {
        asciiCats();
        next();
    } else
    {
        res.sendStatus(401);
        console.log(chalk.redBright("=== No Autorizado ==="));
    }
})

app.get("/users", (req, res) =>
{
    
    let send_json = function(error, data)
        {
            if (error)
            {
                console.error(error);
            } 
            let user_data = JSON.parse(data).users;
            console.log(chalk.greenBright("Usuarios encontrados"));
            console.table(user_data);
            res.send(data);
        }
        console.log(chalk.yellow("Consultando Usuarios"));
        fs.readFile("users.json", "utf-8", send_json);
})

app.listen(port, () =>
{
    console.log(`Aplicación corriendo en PORT ${port}`, port);
})

