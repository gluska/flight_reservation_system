const express = require("express");
const path = require('path');
const bodyparser = require("body-parser");
const mongo = require('mongodb');
const favicon = require('serve-favicon');
const app = express();
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

//set that app must use hbs engine
app.set("view engine", 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


app.use(favicon(path.join(__dirname, 'assets/images', 'favicon.ico')))
//after enter on main page
app.get('/',(req,res) => {
    res.render('index',{
        
    })
});

app.get('/logout',(req,res) => {
  res.render('logout_page',{
     
  })
});

//-------------------------------------------------------------------------------------------------
//----- start Node server
app.listen(port, (err) => {
    if (err) {
        return console.log("coś poszło nie tak ...:", err)
    }
    console.log("serwer działa na porcie", port)
});

app.use('/assets', express.static(path.join(__dirname,"./assets")));
app.use('/js', express.static(path.join(__dirname, "./js")));


