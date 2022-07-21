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

/*app.get('/agregar-dueno', (req,res)=>{
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
})*/

/*app.post('/addclient',(req,res)=>{
    const nombre = req.body.nombre
    const id_mascota = req.session.id_mascota
    const id_cliente = req.session.id_cliente
    const telefono = req.body.telefono
    const direccion = req.body.direccion
    if(telefono && direccion){
        connection.query('INSERT INTO clientes (id_cliente, nombre, telefono, direccion, id_mascota) VALUES (?,?,?,?,?)',
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
*/
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

app.post('/addpet', (req, res) => {
    console.log('entro')
    const especie = req.body.especie
    const raza = req.body.raza
    const mnombre = req.body.mnombre
    const edad = req.body.edad
    const adicional = req.body.adicional
    var entrada = new Date (req.body.entrada)
    var salida = new Date(req.body.salida)
    const fecha_entrada = req.body.entrada
    const fecha_salida = req.body.salida
    var fechas = entrada.getTime() - salida.getTime();
    var dias_estancia = Math.round(fechas/(1000*60*60*24))
    dias_estancia = dias_estancia * -1
    var costo = 250 * dias_estancia;
    const dnombre = req.body.dnombre
    const telefono = req.body.telefono
    const direccion = req.body.direccion

    if (dnombre) {
        connection.query('INSERT INTO clientes (nombre, telefono, direccion) VALUES (?, ?, ?);', [dnombre, telefono, direccion], (err, results) => {
            console.log('cliente')
            connection.query('Select * FROM clientes ORDER BY id_cliente DESC;', (err, results) => {
                id_cliente = results[0].id_cliente;
                console.log(id_cliente)

                console.log('** datos **')
                console.log(especie)
                console.log(raza)
                console.log(edad)
                console.log(mnombre)
                console.log(adicional)
                console.log(id_cliente)
                console.log(dias_estancia)
                console.log(dnombre)
                console.log(fecha_entrada)
                console.log(costo)
                console.log(fecha_salida)

                connection.query('INSERT INTO mascotas (especie, raza, edad, nombre, informacion_adicional, nombre_cliente, id_cliente, fecha_entrada, fecha_salida, costo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
                [especie, raza, edad, mnombre, adicional, dnombre, id_cliente, fecha_entrada, fecha_salida, costo], (err, results) => {
                        res.render('agregar', {
                            alert: true,
                            alertTitle: "Agregado",
                            alertMessage: "Mascota agregada correctamente",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                            ruta: 'agregar'
                        })
                    })
            })
        })
    }
})

app.get('/ver', (req, res) => {
    if (req.session.loggedin) {
        connection.query('SELECT * FROM mascotas;', (err,results)=>{
            res.render('ver', {
            login: true,
            mascotas: results,
            insession: req.session.usuario
        });
        })
    }
    else {
        res.render('login', {
            login: false
        })
    }
})

app.get('/eliminar', (req, res) => {
    if (req.session.loggedin) {
        connection.query('SELECT * FROM mascotas;', (err,results)=>{
            res.render('eliminar', {
            login: true,
            mascotas: results,
            insession: req.session.usuario
        });
        })
    }
    else {
        res.render('login', {
            login: false
        })
    }
})

app.get('/eliminar', (req, res) => {
    if (req.session.loggedin) {
        connection.query('SELECT * FROM mascotas;', (err,results)=>{
            res.render('eliminar', {
            login: true,
            mascotas: results,
            insession: req.session.usuario
        });
        })
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
