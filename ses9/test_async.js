/*

setTimeout(() =>
{
    console.log("Hola\nMundo");
    setTimeout(() =>
{
    console.log("Hola\nMundo");
    setTimeout(() =>
{
    console.log("Hola\nMundo");
    setTimeout(() =>
{
    console.log("Hola\nMundo");
    setTimeout(() =>
{
    console.log("Hola");
}, 1000)
}, 1000)
}, 1000)
}, 1000)
}, 1000)

*/
let amor_eterno = new Promise(function (resolve, reject)
{
    setTimeout(() =>
    {
        if (Math.random() < 0.5)
        {
            console.log("Procesando la promesa")
            resolve("Te amo eternamente")
        } else
        {
            reject(new Error("Ya no podemos estar juntes ;("))
        }
    }, 1000)
})

amor_eterno.then((result) =>
{
    console.log(result)
}, (error) =>
{
    console.log(error)
})

