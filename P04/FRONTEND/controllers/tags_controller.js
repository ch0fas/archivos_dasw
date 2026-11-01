function createTagFront(event)
{
    event.preventDefault();

    let current_user = JSON.parse(sessionStorage.getItem('user'));
    let data = Object.fromEntries(new FormData(event.target).entries());

    fetch("/tags", 
    {
        method: "POST",
        headers:
        {
            "x-auth": current_user.password,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response =>
    {
        if (!response.ok) alert("Error al crear tag, verifica la información");
        return response.json();
    }).then(() =>
    {
        alert(`Etiqueta creada exitosamente!`);
        loadTags();
    }).catch(err => 
    {
        alert("Error al crear tag: ", err);
    })
}

function loadTags()
{
    let tags_list = document.getElementById("dropdownList");
    if (!tags_list) return;

    let current_user = JSON.parse(sessionStorage.getItem('user'));

    fetch('tags?page=1&limit=200',
    {
        method: "GET",
        headers:
        {
            "x-auth": current_user.password
        }
    }).then(response =>
    {
        if (!response.ok) alert("Error populating tag page!");
        return response.json();
    }).then(result =>
    {
        let tags_from_server = result.data;

        tags_list.replaceChildren();

        for (let i = 0; i < tags_from_server.length; i++)
        {
            let tag = tags_from_server[i], 
            tag_container = document.createElement('a'), 
            edit_tag_icon = document.createElement('i');

            tag_container.classList.add("dropdown-item");
            tag_container.innerText = tag.name;
            edit_tag_icon.classList.add("fa-solid", "fa-pen");
            tag_container.style.color = "grey";
            edit_tag_icon.addEventListener('click', () =>{editTag(tag)});
            tag_container.append(edit_tag_icon);

            tags_list.prepend(tag_container);
        }
    }).catch(err =>
    {
        alert("Error al poblar la lista de tags");
    })
}