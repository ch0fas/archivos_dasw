const bcrypt = require("bcrypt");

let hash = bcrypt.hashSync("Password123", 1);
console.log("Contraseña cifrada", hash);

let correct_pass = bcrypt.compareSync("Password123", hash);

console.log("Contraseña correcta? ", correct_pass);