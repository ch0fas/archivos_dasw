function toggleForms()
{
    let form_login = document.getElementById("formLogin"), form_register = document.getElementById("formRegister");
    if (form_register.style.display == "none")
    {
        form_login.style.display = "none";
        form_register.style.display = "block";
    } else
    {
        form_login.style.display = "block";
        form_register.style.display = "none";
    }
}

function login()
{
    event.preventDefault();

    let data = Object.fromEntries(new FormData(event.target).entries());

    fetch('/login',
    {
        method: "POST",
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>
    {
        if (!response.ok) alert("Correo y/o contraseña incorrectos");
        return response.json();
    }).then(user =>
    {
        sessionStorage.setItem('user', JSON.stringify({...user, password: data.password}));
        window.location.href = local_url+"home.html";
    }).catch(err =>
    {
        console.error("Error en login: ", err);
    })
}

function logout()
{
    sessionStorage.clear();
    window.location.href = local_url;
}

document.addEventListener("DOMContentLoaded", () =>
{
    let form = document.getElementById("formLogin");
    if (form)
    {
        form.addEventListener('submit', login);
    }
})

document.addEventListener("DOMContentLoaded", () =>
{
    let out = document.getElementById("confirmed_logout");
    if (out)
    {
        out.addEventListener('click', logout);
    }
})