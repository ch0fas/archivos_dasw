function loadScript(src)
{
    return new Promise(function(resolve, reject)
    {
        let script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error("Script load error: " + src))
        document.head.append(script)
    })
}

let promesa2 = loadScript("https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y");
promesa2.then
(
    script => alert(script.src + " cargada!"),
    error => alert("Error: " + error.message)
)
promesa2.then(script => alert("Algo extra sucede"))