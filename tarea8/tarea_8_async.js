console.log("=== Solución 3 - Async/Await ===\n");

function delay(time)
{
    return new Promise(function (resolve)
    {
        setTimeout(() => resolve(), time);
    })
}

async function print_hola()
{
    for (let i = 0; i < 5; i++)
    {
        let response = await delay(1000);
        console.log("Hola " + (i + 1));
    }
    return Promise.resolve();
}

async function print_mundo()
{
    for (let i = 0; i < 5; i++)
    {
        let response = await delay(2000);
        console.log("Mundo " + (i + 1));
    }
    return Promise.resolve();
}

async function tareaFin()
{
    await Promise.all([print_hola(), print_mundo()]);
    console.log("FIN!");
};

tareaFin();