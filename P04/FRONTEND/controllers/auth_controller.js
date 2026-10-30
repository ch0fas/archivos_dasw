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

function login(event)
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

function register(event)
{
    event.preventDefault();

    let data = Object.fromEntries(new FormData(event.target).entries());

    fetch ('/users', 
    {
        method: "POST",
        headers:
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>
    {
        if (!response.ok) alert("Error al crear usuario, verifica validez de datos y que las contraseñas sean iguales");
        return response.json();
    }).then(user =>
    {
        sessionStorage.setItem('user', JSON.stringify({...user, password: data.password}));
        window.location.href = local_url+'home.html';
    }).catch(err =>
    {
        console.error("Error en registro de ususario: ", err);
    })
}

function populateModal()
{
    document.getElementById('edit_name_field').value = JSON.parse(sessionStorage.user).name;
    document.getElementById('edit_email_field').value = JSON.parse(sessionStorage.user).email;
    document.getElementById('edit_password_field').value = JSON.parse(sessionStorage.user).password;
}

function changeUserData(event)
{
    event.preventDefault();
    let current_user = JSON.parse(sessionStorage.getItem('user'));
    let data = Object.fromEntries(new FormData(event.target).entries());

    fetch(`/users/${current_user.id}`,
    {
        method: "PATCH",
        headers:
        {
            'Content-Type': 'application/json',
            'x-auth': current_user.password
        },
        body: JSON.stringify(data)
    }).then(response =>
    {
        if (!response.ok) alert("Error al actualizar usuario, verifica validez de datos");
        return response.json();
    }).then(result =>
    {
        sessionStorage.setItem('user', JSON.stringify({...result.user, password: data.password.trim()}));
        alert("Usuario actualizado!");
    }).catch(err =>
    {
        console.error("Error al actualizar usuario: ", err);
    })
}

function deleteUserFront(event)
{
    event.preventDefault();
    let current_user = JSON.parse(sessionStorage.getItem('user'));

    fetch(`/users/${current_user.id}`, 
    {
        method: "DELETE",
        headers:
        {
            'x-auth': current_user.password
        },
    }).then(response =>
    {
        if (!response.ok) alert("Error al eliminar usuario");
        return response.json();
    }).then(() =>
    {
        sessionStorage.clear();
        window.location.href = local_url;
    }).catch(err => 
    {
        console.error("Error al eliminar usuarioo: ", err);
    })
}

function logout()
{
    sessionStorage.clear();
    window.location.href = local_url;
}

function init()
{
    document.addEventListener("DOMContentLoaded", () =>
    {
        let name_widget = document.getElementById("userNameWidget");
        if (name_widget)
        {
            let current_user = JSON.parse(sessionStorage.getItem('user'));
            name_widget.innerText = current_user.name;
        }
    });
}


// estas piezas de código hacen que solo se creen estas variables (form, out, etc) si el elemento con dicho ID si existe en el documento. Es así porque el auth_controller se carga en los 3 archivos HTML pero no todos tienen los mismos elementos, evidentemente. Para evitar problemas

document.addEventListener("DOMContentLoaded", () =>
{
    let form = document.getElementById("formLogin");
    if (form)
    {
        form.addEventListener('submit', login);
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    let out = document.getElementById("confirmed_logout");
    if (out)
    {
        out.addEventListener('click', logout);
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    let register_form = document.getElementById("formRegister");
    if (register_form)
    {
        register_form.addEventListener('submit', register);
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    let edit_modal = document.getElementById("myModal3");
    if (edit_modal)
    {
        edit_modal.addEventListener('shown.bs.modal', populateModal);
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    let edit_form = document.getElementById("formEditUser");
    if (edit_form)
    {
        edit_form.addEventListener('submit', changeUserData);
    }
});

document.addEventListener("DOMContentLoaded", () =>
{
    let delete_button = document.getElementById("confirmed_delete");
    if (delete_button)
    {
        delete_button.addEventListener('click', deleteUserFront);
    }
});

init();