function doStuff()
{
    let lista = document.getElementById("lista");
    
    let p1 = document.createElement("p").innerText = "Párrafo 1";
    let p2 = document.createElement("p").innerText = "Párrafo 2";

    lista.before(p1);
    lista.after(p2);

    let l1 = document.createElement("li");
    l1.innerHTML = "1";
    let l2 = document.createElement("li");
    l2.innerHTML = "2";
    let l3 = document.createElement("li");
    l3.innerHTML = "3";

    lista.prepend(l1);
    lista.insertBefore(l2, lista.children[2]);
    lista.append(l3);

    let html_to_insert = "<mark>IMPORTANT</mark>";
    lista.insertAdjacentHTML("afterbegin", html_to_insert);
    
}