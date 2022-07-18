//invocar express 
const express = require('express');
const app = express();

//setear urlencoded para datos de formulario
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

//invocar dotenv
const dotenv = require('dotenv');
dotenv.config({
    path: './env/.env'
});


//directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//establecer motor de plantillas
app.set('view engine', 'ejs');

//invocar bcryptjs
const bcryptjs = require('bcryptjs');



//var de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialzed: true
}));



//Invocar modulo de base de datos
const connection = require('./database/db');




app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/auth', (req, res) => {
    const contrasena = req.body.contrasena;
    const usuario = req.body.usuario;

    if (usuario && contrasena) {
        connection.query('SELECT * FROM administradores WHERE usuario = ? AND contrasena = ?', [usuario, contrasena], (error, results) => {

            if (results.length == 0) {
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "La cuenta no existe",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            } else {
                req.session.loggedin = true;
                req.session.usuario = results[0].usuario;
                req.session.administrador = results[0].administrador;
                res.render('login', {
                    alert: true,
                    alertTitle: "Ingresando...",
                    alertMessage: "Entrando a la cuenta",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });
            }

        })
    }

})

app.post('/adduser', (req, res) => {
    const usuario = req.body.nombre;
    const contrasena = req.body.contrasena;
    const check = req.body.check;
    if (check != 'si') {
        const check = "no";
    }

    if (usuario && contrasena) {
        connection.query('INSERT INTO administradores (usuario, contrasena, administrador) VALUES (?, ?, ?);', [usuario, contrasena, check], (error, results) => {

            connection.query('Select * from administradores ORDER BY administradores.id ASC;', (error, results) => {

            res.render('administrador', {
                alert: true,
                alertTitle: "Correcto",
                alertMessage: "Usuario agregado",
                alertIcon: "success",
                showConfirmButton: true,
                timer: false,
                ruta: 'administrador',
                usuarios: results,
                insession: req.session.usuario
            });
            })
        })
    }
})

app.get('/agregar-dueno', (req,res)=>{
    if (req.session.loggedin) {
        res.render('agregar-dueno', {
            login: true
        });
    }
    else {
        res.render('login', {
            login: false
        })
    }
})

app.post('/addclient',(req,res)=>{
    const nombre = req.body.nombre
    const id_mascota = req.session.id_mascota
    const id_cliente = req.session.id_cliente
    const telefono = req.body.telefono
    const direccion = req.body.direccion
    if(telefono && direccion){
        connection.query('INSERT INTO clientes (id_clientes, nombre, telefono, direccion, id_mascota) VALUES (?,?,?,?,?)',
        [id_cliente,nombre,telefono,direccion,id_mascota],(err,results)=>{
            res.render('agregar-dueno',{
                alert: true,
                    alertTitle: "Agregado",
                    alertMessage: "Dueño agregado correctamente",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 2500,
                    ruta: 'agregar'
            })
        })
    }
})

app.get('/agregar', (req, res) => {
    if (req.session.loggedin) {
        res.render('agregar', {
            login: true
        });
    }
    else {
        res.render('login', {
            login: false
        })
    }
})

app.post('/addpet', (req,res)=> {
    console.log('entro')
    const id_mascota = req.body.id_mascota
    const tipo = req.body.tipo
    const raza = req.body.raza
    const edad = req.body.edad
    const nombre = req.body.nombre
    const informacion_adicional = req.body.informacion_adicional
    const nombre_cliente = req.body.nombre_cliente
    const id_cliente = req.body.id_cliente
    const hora_ingreso = req.body.hora_ingreso
    const dias_estancia = req.body.dias_estancia
    const hora_salida = req.body.hora_salida
    if(id_mascota && tipo && raza && edad && nombre && nombre_cliente && id_cliente && hora_ingreso && dias_estancia && hora_salida){
        connection.query('INSERT INTO mascotas (id_mascotas, tipo, raza, edad, nombre, informacion,adicional, nombre_cliente, id_cliente, hora_ingreso, dias_estancia, hora_salida) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
        [id_mascota,tipo,raza,edad,nombre,informacion_adicional,nombre_cliente,id_cliente,hora_ingreso,dias_estancia,hora_salida], (err,results)=>{
            console.log('envio datos')
            req.session.nombre_cliente = nombre
            req.session.id_cliente = id_cliente
            req.session.id_mascota = id_mascota
            res.render('agregar',{
                alert: true,
                    alertTitle: "Agregado",
                    alertMessage: "Mascota agregada correctamente, verifique los datos",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 2500,
                    ruta: 'agregar-dueno'
            })
        })
    }
})

app.get('/ver', (req, res) => {
    if (req.session.loggedin) {
        res.render('ver', {
            login: true
        });
    }
    else {
        res.render('login', {
            login: false
        })
    }
})

app.post('/eliminar', (req, res) => {
    if (req.session.loggedin) {
        res.render('eliminar', {
            login: true
        });
    }
    else {
        res.render('login', {
            login: false
        })
    }
})

app.get('/administrador', (req, res) => {
    if (req.session.loggedin) {
        if (req.session.administrador == 'si') {

            connection.query('Select * from administradores ORDER BY administradores.id ASC;', (error, results) => {
                res.render('administrador', {
                    usuarios: results,
                    insession: req.session.usuario
                })
            })


        }
        else {
            res.render('index', {
                alertadmin: 'true',
                alertMessage: 'Se necesitan permisos de admin',
                ruta: ''
            })
        }
    }
    else {
        res.render('login', {
            login: false
        })
    }
})


app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/registro', async (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    if (nombre && contrasena) {
        connection.query('INSERT INTO administradores (usuario,contrasena) VALUES (?,?)', [usuario, contrasena], (req, results) => {
            res.render('administrador', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro exitoso",
                alertIcon: "success",
                showConfirmButton: true,
                timer: false,
                ruta: 'administrador'
            })
        })
    }
    else {
        res.render('registro', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Por favor, ingrese datos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: 'administrador'
        })
    }
})



//autenticar paginas
app.get('/', (req, res) => {



    if (req.session.loggedin) {

        root = req.session.administrador;
        if (root == "si") {
            root = true;
        }

        res.render('index', {
            login: true,
            root: root
        });
    }
    else {
        res.render('login', {
            login: false

        })
    }

})

//salir de la cuenta (logout)
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.listen(3000, (req, res) => {
    console.log('--Server running in port 3000--');
})
