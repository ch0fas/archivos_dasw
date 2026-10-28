const local_url = "http://localhost:3000/";

function validateLogin()
{
    let logged_in = sessionStorage.getItem('user');
    let path = window.location.pathname;
    let on_login_page = path === '/' || path.endsWith("/login.html");
    
    if (!logged_in && !on_login_page)
    {
        alert("Favor de iniciar sesión");
        window.location.replace("/login.html");
    } else if (logged_in && on_login_page)
    {
        window.location.replace("/home.html");
    }
}

validateLogin();

