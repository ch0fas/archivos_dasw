const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

// Conexión con la BD y creación de modelo "Usuarios":
let mongoConnection = "redacted/"; // Lo cambié para que GitHub no me mande spam de correos de que filtré mis secretos en un repo público, pero se puede poner cualquier URL válida de Mongo y funcionará
let db = mongoose.connection;
db.on('connecting', () => { 
    console.log('Conectando...');
    console.log(mongoose.connection.readyState); //State 2: Connecting
});
db.on('connected', () => {
    console.log('¡Conectado exitosamente!');
    console.log(mongoose.connection.readyState); //State 1: Connected
});
mongoose.connect(mongoConnection);

// Definimos el esquema:
let userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        min: 0,
        max: 120,
        required: true
    },
    sexo: {
        type: String,
        enum: ['H', 'M', "X"],
        required: true
    }
});
// Creamos el modelo (nombre, esquema)
let User = mongoose.model('users', userSchema);

app.post('/api/users', (req, res) => {
    console.log("Guardando usuario...");
    // Información que va a tener nuestro nuevo registro
    let newUser = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        pass: req.body.pass,
        edad: req.body.edad,
        sexo: req.body.sexo
    };
    // A partir de la información y el modelo, hacemos un usuario
    let user = User(newUser);
    // Guardamos el usuario en la BD (OJO, es asíncrono)
    user.save().then((doc) => {
        console.log("Usuario creado: " + doc);
        res.send('Usuario creado exitosamente: ' + doc);
    });
});

app.listen(port, () => {
    console.log("Aplicación de ejemplo corriendo en puerto " + port);
});