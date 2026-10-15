const express = require('express');
const app = express();
const userRouter = require("./src/routers/userRouter");
const homeRouter = require("./src/routers/homeRouter");
const authRouter = require("./src/routers/authRouter");
const adminRouter = require("./src/routers/adminRouter");
require('dotenv').config(); //ucita .env
const session=require('express-session');
const FileStore=require("session-file-store")(session);
const path=require("path");
const expressLayout=require("express-ejs-layouts");

// kad se salju podaci putem POST  da se drse u vidu forme
app.use(express.urlencoded({ extended: true }));
// /proizvodi->middleware?->app.get('/proizvodi')
app.use(express.json());//bilo koji podaci koji dolaze do nas se pretvore u json
app.use(express.static(path.join(__dirname,"public"))); //sve sto je u public folderu(staticki fajlovi) moze da se koristi na sajtu
app.set("view engine", "ejs"); //aplikacija koristi ejs
app.set("views",path.join(__dirname,"views"));

app.use(expressLayout);
app.set("layout", "index") // sve se ucitava unutar index.ejs

// app.use(session({
//     secret: '123456789',  //kljuc za kriptovanje
//     resave: false,        //dali da snima prazne sesije
//     saveUninitialized: false,   //dali da cuva prazne sesije na pocetku
//     cookie: {
//         httpOnly: true,
//         secure: false,         //dal koristimo https
//         maxAge: 60000 * 60
//     }
// }));
app.use(session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET,  //kljuc za kriptovanje
    resave: false,        //dali da snima prazne sesije
    saveUninitialized: false,   //dali da cuva prazne sesije na pocetku
    cookie: {
        httpOnly: true,
        secure: false,         //dal koristimo https
        maxAge: 60000 * 60
    }
}));
app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/admin',adminRouter);
app.use('/',homeRouter); // sve stranice na sajtu moraju da koriste router

app.listen(process.env.APP_PORT,()=>{
    console.log("Server started on port 3000");
})
