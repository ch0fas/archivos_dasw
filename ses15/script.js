function readUsers(auth)
{
    let url = "http://localhost:3000/users";
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    if (auth)
    {
        xhr.setRequestHeader("x-auth", "PASS123");
    }

    xhr.send();    


    xhr.onload = function()
    {
        if (xhr.status != 200)
        {
            alert(`${xhr.status}`);
        } else
        {
            console.table(JSON.parse(xhr.response).users);
            console.log("Usuarios encontrados");
            alert("Usuarios ecnontrados");
        }
    }
}

function showAlbums(flag)
{
    let url = "http://localhost:3000/products";
    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.setRequestHeader("flag", flag);

    xhr.send();

    xhr.onload = function()
    {
        if (xhr.status != 200)
        {
            alert(`${xhr.status}`);
        } else
        {
            document.getElementById("hw_response").innerHTML = xhr.responseText;
        }
    }
}