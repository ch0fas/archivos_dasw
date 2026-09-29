import * as fs from 'node:fs';
import { json } from 'node:stream/consumers';

let read_users = function(error, data)
{
    if (error)
    {
        console.log(`Error: ${error}`);
    }
    console.table(JSON.parse(data).users);
}

let getAverage = function(error, data)
{
    if (error)
    {
        console.error(error);
    }

    let full_data = JSON.parse(data).users;
    let total_age = 0;
    for (let i = 0; i < full_data.length; i++)
    {
        total_age+= full_data[i].edad;
    }
    let res = total_age / full_data.length;
    console.log(`Edad promedio: ${res.toFixed(2)} años.`);
}

let getLongest = function(error, data)
{
    if (error)
    {
        console.error(error);
    }

    let full_data = JSON.parse(data).users;
    let longest = 0;
    for (let i = 0; i < full_data.length; i++)
    {
        if (full_data[i].name.length > full_data[longest].name.length)
        {
            longest = i;
        }
    }

    console.log(`Nombre más largo: ${full_data[longest].name}`);   
}

function deleteUser(id)
{
    fs.readFile("user_data.json", "utf-8", function (error, data)
    {
        if (error)
        {
            console.error(error);
        }

        let full_data = JSON.parse(data);

        full_data.users = full_data.users.filter(user => user.id != id);

        fs.writeFile("user_data.json", JSON.stringify(full_data), "utf-8", function(error)
        {
            if (error)
            {
                console.error(error);
            }

            console.log(`Usuario ${id} eliminado`);
        }
    )
    }
)
}

fs.readFile("user_data.json", "utf-8", read_users);
fs.readFile("user_data.json", "utf-8", getAverage);
fs.readFile("user_data.json", "utf-8", getLongest);
deleteUser(2);

