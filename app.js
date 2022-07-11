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

app.get('/register', (req,res)=>{
    res.render('register')
})

app.post('/registro', async (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    console.log(cuenta);
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

app.post('/eliminar',(req,res)=>{
    const usuario = req.body.usuario;
    console.log(nombre)
    if(nombre){
        connection.query('DELETE FROM administradores WHERE usuario = ?', [usuario],(req,results)=>{
            res.render('administrador', {
                alert: true,
                alertTitle: "Eliminar usuario",
                alertMessage: "Elmininacion de usuario exitosa",
                alertIcon: "success",
                showConfirmButton: true,
                timer: false,
                ruta: 'administrador'
            })
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
