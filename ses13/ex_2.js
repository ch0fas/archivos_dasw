let url_2 = "https://jsonplaceholder.typicode.com/users";

// Ejercicio 1, Pagina 6 de la presentación
function getFromPlaceholder(url)
{
    let xhr = new XMLHttpRequest();

    // Ahora es GET
    xhr.open("GET", url);

    // No se ocupa header

    // Tampoco es necesario definir un body porque es una request de info, no estás mandando nada
    xhr.send();

    xhr.onload = function()
    {
        if (xhr.status != 200)
        {
            alert(xhr.status + ": " + xhr.statusText);
        } else
        {
            console.table(JSON.parse(xhr.responseText));
            return xhr.responseText;
        }
    }
}

// Ejercicio 2, Página 6 de la presentación
function getSpecificUser(id)
{
    let test_url = "https://jsonplaceholder.typicode.com/users/" + id;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", test_url);

    xhr.send();

    xhr.onload = function()
    {
        if (xhr.status != 200)
        {
            alert("Usuario " + id + " no encontrado");
        } else
        {
            let info_usuario = JSON.parse(xhr.responseText);
            let string_info = "<b>Usuario: </b>" + info_usuario.name + "<br><b>Correo: </b>" + info_usuario.email;

            document.getElementById("user_div").innerHTML = string_info;
        }
    }
}