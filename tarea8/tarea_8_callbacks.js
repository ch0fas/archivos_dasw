// Tarea 8 - Sofia Maldonado García

console.log("=== Solución 1 - Callback Hell ===\n");

let hola_flag = false;
let mundo_flag = false;

function callback_hola()
{
    setTimeout(() =>
    {
        console.log("hola 1");
        setTimeout(() =>
    {
        console.log("hola 2");
        setTimeout(() =>
    {
        console.log("hola 3");
        setTimeout(() =>
    {
        console.log("hola 4");
        setTimeout(() =>
    {
        console.log("hola 5");
        hola_flag = true;

    }, 1000)
    }, 1000)
    }, 1000)
    }, 1000)
    }, 1000)
}

function callback_mundo()
{
    setTimeout(() =>
    {
        console.log("mundo 1");
        setTimeout(() =>
    {
        console.log("mundo 2");
        setTimeout(() =>
    {
        console.log("mundo 3");
        setTimeout(() =>
    {
        console.log("mundo 4");
        setTimeout(() =>
    {
        console.log("mundo 5");
        mundo_flag = true;

    }, 2000)
    }, 2000)
    }, 2000)
    }, 2000)
    }, 2000)
}

function ifEnd()
{
    if (hola_flag && mundo_flag)
    {
        console.log("FIN!")
    } else
    {
        setTimeout(ifEnd, 1000);
    }
}

callback_hola();
callback_mundo();
ifEnd();

