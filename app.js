const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();
const passport = require('passport');
const cookieSession=require('cookie-session');

//Conexión a la BD
mongoose.connect('mongodb+srv://Feraldar1303:feraldar1303@cluster0.fpfcr.mongodb.net/usuarios?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{console.log("Conectado a MongoDB")})
.catch((err)=>{console.log("No se pudo conectar con MongoDB",err)});

mongoose.set('useFindAndModify', false);

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./passport-setup');

app.set("view engine", "ejs");

app.use(cookieSession({
    name: 'utsjr-session',
    keys:['key1', 'key2']
}));

function isLoggedIn(req, res, next){
    if(req.user){
        next();
        console.log("Auth done");
    }
    else {
        res.redirect('/');
    }
}
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/success', isLoggedIn, function(req, res){
    res.render('datos', {user:req.user});
});

app.get('/facebook', passport.authenticate('facebook', {scope:'email'}));

app.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect:    '/success',
    failureRedirect:    '/'
}));

app.get('/logout', function(req, res){
    req.session=null;
    req.logOut();
    req.redirect('/');
});

app.listen(3000,()=>{
    console.log("Aplicación en el puerto 3000")
})