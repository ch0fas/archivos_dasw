// Intenté probarlo en Node pero me dió error de que no encontraba XMLHTTPRequest, creo que esto si se tiene que probar en navegador a fuerzas rip

// Url de un JSON generado

let url = "https://api.npoint.io/740f8cd6f1b0592c7601";
let datos = {var1: "Hola", var_2: "Mundo"};

function guardarEnJSON(datos, urlJSON)
{
    // Creando XMLHTTPRequest
    let xhr = new XMLHttpRequest();
    // Configurando
    // NOTA: npoint.io solamente permite trabajar con POST en vez de con PUT
    xhr.open("POST", urlJSON);
    // Indicar tipo de dato JSON
    xhr.setRequestHeader("Content-Type", "application/json");
    // Enviando solicitud al servidor
    xhr.send([JSON.stringify(datos)]); // Esto hace que "datos" se convierta en un JSON
    // Una vez recibida la respuesta del server...
    xhr.onload = function()
    {
        if (xhr.status != 200)
        {
            // Hubo un tipo de error
            alert(xhr.status + ": " + xhr.statusText);
        } else
        {
            console.log("Guardado: " + xhr.responseText);
        }
    } 
}