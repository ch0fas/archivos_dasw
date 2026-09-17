console.log("=== Solución 2 - Promises ===\n");

function hola_promises(value)
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(() =>
        {
            console.log("Hola " + value);
            resolve(value + 1);
        }, 1000);
    });
}

function mundo_promises(value)
{
    return new Promise(function (resolve, reject)
    {
        setTimeout(() =>
        {
            console.log("Mundo " + value);
            resolve(value + 1);
        }, 2000);
    });
}

let pH = hola_promises(1).then(result => hola_promises(result)).then(result => hola_promises(result)).then(result => hola_promises(result)).then(result => hola_promises(result)).then(() => Promise.resolve());
let pM = mundo_promises(1).then(result => mundo_promises(result)).then(result => mundo_promises(result)).then(result => mundo_promises(result)).then(result => mundo_promises(result)).then(() => Promise.resolve());
pH.then(() => pM).then(() => console.log("FIN!"))