function addTable()
{
    let users =
    [
        {
            name: "LeBron James",
            age: 41,
            email: "lebron23@76ers.org"
        },
        {
            name: "Jalen Brunson",
            age: 30,
            email: "j_brunson11@knicks.org"
        },
        {
            name: "Joel Embiid",
            age: 32,
            email: "j_embiid11@76ers.org"
        },
        {
            name: "OG Anunoby",
            age: 29,
            email: "og@knicks.org"
        },
        {
            name: "Jaylen Brown",
            age: 29,
            email: "j_brown@76ers.org"
        }
    ]

    let body = document.body;

    let new_table = document.createElement("table");
    new_table.style = "border: 1px solid; width: 80%; text-align: center; margin-left: auto; margin-right: auto";
    body.append(new_table);
    new_table.innerHTML = '<tr><th>Name</th><th>Age</th><th>Email</th>';

    for (const i of users)
    {
        let row = document.createElement("tr");
        let v1 = document.createElement("td"); let v2 = document.createElement("td"); let v3 = document.createElement("td");
        v1.innerHTML = `${i["name"]}`;
        v2.innerHTML = `${i["age"]}`;
        v3.innerHTML = `${i["email"]}`;
        row.appendChild(v1);
        row.appendChild(v2);
        row.appendChild(v3);
        new_table.appendChild(row);
    }
}