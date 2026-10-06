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

function create_table(data)
{
    let html = "<table border='1'>";

    html += "<tr>";
    for (let i in data[0])
    {
        html += `<th>${i}</th>`;
    }
    html += "</tr>";

    for (let i of data)
    {
        html += "<tr>";

        for (let j in i)
        {
            html += `<td>${i[j]}</td>`;
        }

        html += "<tr>";
    }

    html += "</table>";

    return html;
}

app.get("/products", (req, res) =>
{    
    let get_most_expensive = function(error, data)
    {
        if (error)
        {
            console.error(error);
            return res.sendStatus(500);
        }

        let user_data = JSON.parse(data).albums;
        let biggest_price = -1;
        let most_item;

        for (let i = 0; i < user_data.length; i++)
        {
            if (user_data[i]["price"] > biggest_price)
            {
                most_item = user_data[i];
                biggest_price = user_data[i]["price"];
            }
        }

        res.send(`<b>Most Expensive Album: ${most_item["price"]} for ${most_item["name"]} by ${most_item["artist"]} (${most_item["release_year"]})</b>`);
    }

    let get_average = function(error, data)
    {
        if (error)
        {
            console.error(error);
            return res.sendStatus(500);
        }

        let user_data = JSON.parse(data).albums;

        let total_price = 0;
        let counter = user_data.length;
        for (let i = 0; i < counter; i++)
        {
            total_price += user_data[i]["price"];
        }

        res.send(`<b>Average price for an album: ${(total_price / counter).toFixed(2)}</b>`);
    }

    let get_full_table = function(error, data)
    {
        if (error)
        {
            console.error(error);
            return res.sendStatus(500);
        }

        let user_data = JSON.parse(data).albums;

        res.send(create_table(user_data));
    }

    if (req.get("flag") == "full")
    {
        console.log(chalk.greenBright("Getting Full Product Table"));
        fs.readFile("products.json", "utf-8", get_full_table);
    } else if (req.get("flag") == "expensive")
    {
        console.log(chalk.greenBright("Getting Most Expensive Album"));
        fs.readFile("products.json", "utf-8", get_most_expensive);
    } else
    {
        console.log(chalk.greenBright("Getting average album price"));
        fs.readFile("products.json", "utf-8", get_average);
    }
})


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

