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
    var check = req.body.check;
    if (check == undefined) {
        check = "no";
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

app.post('/deleteuser', (req, res) => {
    const deleteuser = req.body.deleteuser;

    connection.query('DELETE FROM administradores WHERE administradores.id = ?;', [deleteuser], (error, results) => {
        connection.query('Select * from administradores ORDER BY administradores.id ASC;', (error, results) => {
            res.render('administrador', {
                alert: true,
                alertTitle: "Correcto",
                alertMessage: "Usuario eliminado",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 2000,
                ruta: 'administrador',
                usuarios: results,
                insession: req.session.usuario
            });
        })
    })
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

app.post('/addpet', (req, res) => {
    const especie = req.body.especie
    const raza = req.body.raza
    const mnombre = req.body.mnombre
    const edad = req.body.edad
    const adicional = req.body.adicional
    var entrada = new Date(req.body.entrada)
    var salida = new Date(req.body.salida)
    const fecha_entrada = req.body.entrada
    const fecha_salida = req.body.salida
    var fechas = entrada.getTime() - salida.getTime();
    var dias_estancia = Math.round(fechas / (1000 * 60 * 60 * 24))
    dias_estancia = dias_estancia * -1
    var costo = 250 * dias_estancia;
    if (dias_estancia == 0) {
        costo = 250;
    }
    const dnombre = req.body.dnombre
    const telefono = req.body.telefono
    const direccion = req.body.direccion

    if (dnombre) {
        connection.query('INSERT INTO clientes (nombre, telefono, direccion) VALUES (?, ?, ?);', [dnombre, telefono, direccion], (err, results) => {
            connection.query('Select * FROM clientes ORDER BY id_cliente DESC;', (err, results) => {
                id_cliente = results[0].id_cliente;

                connection.query('INSERT INTO mascotas (especie, raza, edad, nombre, informacion_adicional, nombre_cliente, id_cliente, fecha_entrada, fecha_salida, costo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [especie, raza, edad, mnombre, adicional, dnombre, id_cliente, fecha_entrada, fecha_salida, costo], (err, results) => {


                    res.render('agregar', {
                        alert: true,
                        alertTitle: "Agregado",
                        alertMessage: "Mascota agregada correctamente",
                        alertIcon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                        ruta: 'ticket',
                    })
                })

            })
        })
    }
})

app.get('/ticket', (req, res) => {
    if (req.session.loggedin) {
        connection.query('Select * FROM mascotas ORDER BY id_cliente DESC;', (err, results) => {
            res.render('ticket', {
                login: true,
                mascota: results[0]
            });
        })
    }
    else {
        res.render('login', {
            login: false
        })
    }
})


class Tree {
    constructor() {
        this.value = null;
        this.left = null;
        this.right = null;
    }
    set(value) {

        if (this.value) {

            if (value.id_mascota < this.value.id_mascota) {
                this.setLeft(value);
            } else {
                this.setRight(value);
            }
        }
        else {
            this.value = value;
        }
    }
    setLeft(value) {
        if (this.left) {
            this.left.set(value);
        } else {
            this.left = new Tree();
            this.left.set(value);
        }
    }
    setRight(value) {
        if (this.right) {
            this.right.set(value);
        } else {
            this.right = new Tree();
            this.right.set(value);
        }
    }
}

function Inorder(tree) { //raiz, luego izquierdo y al ultimo derecho
    if (tree.left) {
        Inorder(tree.left);
    }
    if (tree.right) {
        Inorder(tree.right);
    }
}

app.get('/ver', (req, res) => {
    if (req.session.loggedin) {
        connection.query('SELECT * FROM mascotas ORDER BY mascotas.nombre ASC;', (err, results) => {

            req.session.tree = new Tree();

            for (i = 0; i < results.length; i++) {
                req.session.tree.set(results[i]);
            }

            res.render('ver', {
                login: true,
                tree: req.session.tree,
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

app.post('/busqueda', (req, res) => {

    var tree = req.session.tree;

    var busquedaId = req.body.busqueda_id;

    function Busqueda(tree, value) {

        if (value < tree.value.id_mascota) {
            if (tree.left) {
                Busqueda(tree.left, value)
            }
            else {
                tree = null;
                req.session.busqueda = tree;
            }
        }

        else if (value > tree.value.id_mascota) {
            if (tree.right) {
                Busqueda(tree.right, value)
            }
            else {
                tree = null;
                req.session.busqueda = tree;
            }
        }

        else if (value == tree.value.id_mascota) {
            req.session.busqueda = tree;
        }
    }

    Busqueda(tree, busquedaId)

    res.render('busqueda', {
        login: true,
        tree: req.session.busqueda,
        insession: req.session.usuario
    });



})

app.get('/eliminar', (req, res) => {
    if (req.session.loggedin) {
        connection.query('SELECT * FROM mascotas WHERE fecha_salida <= ? ORDER BY mascotas.fecha_salida ASC;', [new Date()], (err, results) => {
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

app.post('/deletepet', (req, res) => {
    const id_mascota = req.body.id_mascota;

    const nombre_cliente = req.body.nombre_cliente;
    const nombre = req.body.nombre;
    const fecha_salida = req.body.fecha_salida;

    const costo = req.body.costo;
    const dias_extras = req.body.dias_extras;
    const total = parseInt(costo) + parseInt((250 * dias_extras));

    connection.query('DELETE FROM mascotas WHERE mascotas.id_mascota = ?;', [id_mascota], (error, results) => {
        res.render('ticketeliminado', {
            nombre_cliente: nombre_cliente,
            nombre: nombre,
            fecha_salida: fecha_salida,
            costo: costo,
            dias_extras: dias_extras,
            total: total,
            insession: req.session.usuario
        });
    })
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
