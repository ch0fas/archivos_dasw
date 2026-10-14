function changeDeepestDiv(data)
{
    content = document.body;
    flag = true;

    for (;flag;)
    {
        if (content.firstElementChild == null)
        {
            flag = false;
            content.innerHTML = data;
        } else
        {
            content = content.firstElementChild;
        }
    }

    console.log("Texto cambiado");   
}

function changes(flag)
{
    for (let i = 0; i < 5; i++)
    {
        if (flag == "Par")
        {
            if ((i+1) % 2 == 0)
            {
                document.body.children[i].innerHTML = "Pares Activos";
            } else document.body.children[i].innerHTML = "Disabled";
        } else
        {
            if ((i+1) % 2 != 0)
            {
                document.body.children[i].innerHTML = "Nones Activos";
            } else document.body.children[i].innerHTML = "Disabled";
        }
    }
}