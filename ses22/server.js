const mongoose = require("mongoose");

let mongoConnection = "mongodb+srv://admin:12345678910@cluster0.guvr6yk.mongodb.net/MyAppDB";

let db = mongoose.connection;

db.on("connecting", () =>
{
    console.log("Conectando...");
    console.log(db.readyState);
});

db.on("connected", () =>
{
    console.log("Connected successfully!!");
    console.log(db.readyState);
})

mongoose.connect(mongoConnection);

let userSchema = mongoose.Schema
({
    nombre: String,
    email: String,
    password: String,
    gender: String,
    url: String
})

let User = mongoose.model("Users", userSchema);

let new_user = {nombre: "Viridiana", email: "viri@iteso.mx", password: "1234", gender: "F", url: "https://iteso.mx"};

let user = User(new_user);

user.save().then((doc) => console.log("Usuario Creado!"));