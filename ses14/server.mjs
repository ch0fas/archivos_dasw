import express from "express";
import chalk from "chalk";

const app = express();
const port = 3000;

app.get("/", (req, res) =>
{
    console.log(chalk.blueBright("Entró a la raiz"));
    res.send("<b>Foo</b>"); // el send siempre tiene que ser lo ULTIMO que se ejecuta
})

app.get("/home", (req, res) =>
{
    console.log(chalk.green.bold("Entró a Home"));
    res.send("<b><i>Home del sitio</i></b>");
})

app.listen(port, () =>
{
    console.log(`Aplicación de ejemplo corriendo en puerto: ${port}`);
})