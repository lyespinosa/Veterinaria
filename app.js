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


/*Establecer rutas (era de prueba por eso la borrado,
                    hacia conflicto con con line: 85)
app.get('/', (req, res) =>{
    res.render('index');
})*/

app.get('/saldo', (req, res) => {
    if (req.session.loggedin) {

        name = req.session.name;

        console.log(req.session.saldo);
        res.render('saldo', {
            login: true,
            saldo: req.session.saldo,
            name: name
        });
    } else {
        res.redirect('/');
    }
})

app.get('/login', (req, res) => {
    res.render('login', );
})

app.get('/retiro', (req, res) => {
    if (req.session.loggedin) {
        name = req.session.name;
        console.log(req.session.saldo);
        res.render('retiro', {
            name: name
        });
    } else {
        res.redirect('/');
    }
})

app.post('/retirando', (req, res) => {

    console.log(req.session.rfc);
    const dineroRetirado = req.body.retirado;
    console.log(dineroRetirado);


    rfc = req.session.rfc;
    nip = req.session.nip;
    saldo = req.session.saldo;
    console.log(req.session.saldo);

    if (dineroRetirado > saldo) {
        res.render('retiro', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Saldo insuficiente",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2500,
            ruta: ''
        });
    } else if (dineroRetirado < 0) {
        res.render('retiro', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "No se permiten valores negativos",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2500,
            ruta: ''
        });
    } else if (dineroRetirado >= 200000) {
        res.render('retiro', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "El cajero no cuenta con la cantidad suficiente",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2500,
            ruta: ''
        });
    } else {
        connection.query('UPDATE usuario SET SALDO = SALDO - ? WHERE RFC = ?', [dineroRetirado, rfc], (error, results) => {
            connection.query('SELECT * FROM usuario WHERE NIP = ?', [nip], (error, results) => {

                req.session.saldo = results[0].SALDO;
                res.render('retiro', {
                    alert: true,
                    alertTitle: "Has retirado " + dineroRetirado,
                    alertMessage: "No olvides tomarlo, presiona aceptar para continuar",
                    alertIcon: "success",
                    showConfirmButton: true,
                    timer: false,
                    ruta: ''
                });

            })

        })
    }

})



app.get('/deposito', (req, res) => {
    if (req.session.loggedin) {
        name = req.session.name;
        console.log(req.session.saldo);
        res.render('deposito', {
            name: name
        });
    } else {
        res.redirect('/');
    }
})



app.post('/depositando', (req, res) => {

    console.log(req.session.rfc);
    const dineroDepositado = req.body.depositado;
    console.log(dineroDepositado);


    rfc = req.session.rfc;
    nip = req.session.nip;
    console.log(req.session.saldo);

    if (dineroDepositado > 25000) {
        res.render('retiro', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Puedes una cantidad maxima de 50 billetes (billete mas grande $500)",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2500,
            ruta: ''
        });
    } else {
        connection.query('UPDATE usuario SET SALDO = SALDO + ? WHERE RFC = ?', [dineroDepositado, rfc], (error, results) => {
            connection.query('SELECT * FROM usuario WHERE NIP = ?', [nip], (error, results) => {

                req.session.saldo = results[0].SALDO;
                res.render('deposito', {
                    alert: true,
                    alertTitle: "Ejecutando",
                    alertMessage: "Dinero depositado: " + dineroDepositado,
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });

            })

        })

    }
})


app.get('/transferencia', (req, res) => {
    if (req.session.loggedin) {
        name = req.session.name;
        console.log(req.session.saldo);
        res.render('transferencia', {
            name: name
        });
    } else {
        res.redirect('/');
    }
})

app.post('/transfiriendo', (req, res) => {

    console.log(req.session.rfc);
    const dineroDepositado = req.body.monto;
    const otraCuenta = req.body.tarjeta;
    console.log(dineroDepositado);


    rfc = req.session.rfc;
    nip = req.session.nip;
    console.log(req.session.saldo);

    connection.query('UPDATE usuario SET SALDO = SALDO - ? WHERE RFC = ?', [dineroDepositado, rfc], (error, results) => {
        connection.query('UPDATE usuario SET SALDO = SALDO + ? WHERE NOCUENTA = ?', [dineroDepositado, otraCuenta], (error, results) => {
            connection.query('SELECT * FROM usuario WHERE NIP = ?', [nip], (error, results) => {

                req.session.saldo = results[0].SALDO;
                res.render('transferencia', {
                    alert: true,
                    alertTitle: "Ejecutando",
                    alertMessage: "Dinero transferido: " + dineroDepositado,
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                });

            })

        })

    })

})



//Autentificacion
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

//autenticar paginas
app.get('/', (req, res) => {
  if (req.session.loggedin) {
      
      root = false;
      usuario = req.session.usuario;
      if(usuario == "root"){
          root =  true;
          console.log(root);
      }
      
        res.render('index', {
            login: true,
            root: root
        });
  }
    else{
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
