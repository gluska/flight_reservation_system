const express = require("express");
const path = require('path');
const bodyparser = require("body-parser");
const mongo = require('mongodb');
const favicon = require('serve-favicon');
const app = express();
const fetch = require('node-fetch');
const port = 3000;
const mongoClient = mongo.MongoClient;
const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority";

//ustawienie że moja aplikacja musi korzystać z silnika hbs
app.set("view engine", 'hbs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


app.use(favicon(path.join(__dirname, 'assets/images', 'favicon.ico')))
//po wejściu na stronę główną aplikacji:
app.get('/',(req,res) => {
    res.render('index',{
        
    })
});

app.get('/logout',(req,res) => {
  res.render('logout_page',{
     
  })
});

// -------------------- ODPYTANIE BAZY - sprawdzenie czy użytkownik figuruje w bazie
var nameNode='';
var surNameNode='';
var checkUser = 1;
function one(){return Promise.resolve(
app.post("/", (req, res) => {
    /////POŁĄCZENIE DO BAZY DANYCH
    // nameNode = req.body.inputName;
    // surNameNode = req.body.inputSurName;
    // console.log(nameNode);
    // console.log(surNameNode);
    console.log(req.body);
    const dbname = 'db_university';
    mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) {
        console.log("error", err);
      }
      
      const db = client.db(dbname);
    ////////  ODPYTANIE BAZY 
                db.collection('users').find({$and: [{name: req.body.inputName}, {surname: req.body.inputSurName}]}).toArray((err, result) => {
              if (err) { 
              console.log('coś poszło nie tak - nie sprawdzono bazy');
              }
              if (result && result.length) {
                  console.log('mamy takiego użytkownika');
                  console.log(result); // print out what it sends back
                  checkUser = 1;
                  //zwrotka na stronę dla informacji użytkownika
                  //res.send('<p>some html</p>')
                  //res.send('<p>'+`Wprowadziłeś: ${req.body.inputName} ${req.body.inputSurName} - mamy takiego użytkownika`+'</p>');
                  //res.end(`You have selected: ${req.body.inputName} ${req.body.inputSurName} - mamy takiego użytkownika`);
                  //res.send({userData: nameNode})
              }
              else { // if it does not 
              console.log("błędna nazwa użytkownika lub hasło");
              //res.end(`You have selected: ${nameNode} ${surNameNode} - błędna nazwa użytkownika lub hasło`);
              console.log(result);
              checkUser = 0;
              }
              });
      
      
      console.log("połączenie udane");
   
    });
     
  })
  );
}

function two(){
  return Promise.resolve(console.log("checkUser: "+checkUser));
}

one().then(two);

//-------------przekazanie zmiennej z frontendu na backend
app.post('/userCheck',(req, res) => {
  return checkUser;
})

//------------------------------odpytanie bazy o  zarezerwowane miejsca
var reservedOutput
const resFirstStep = () => {
  return Promise.resolve(
    
    app.post("/reservated", (req, res) => {
      /////POŁĄCZENIE DO BAZY DANYCH
      const jetInput = req.body.jet;
      console.log(jetInput);
      const dbname = 'db_university';
      mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            if (err) throw err;
            const db = client.db(dbname);
            const filter = {jet: jetInput, free: false};
            db.collection("seats").find(filter).toArray((error, result) => {
              if (err) throw err;
              
              reservedOutput = result;
              console.log(reservedOutput);
              //client.close();
              
            });
            console.log("udane połączenie z bazą");
          });
      
    }));
  }

       
  

const resSecondStep = () => {
  return Promise.resolve(console.log(reservedOutput));
  } 
  resFirstStep().then(resSecondStep);
//------------------------------------aktualizacja zarezerwowanych miejsc
//testowo - po naciśnięciu buttona na stronie
app.post("/updateReservated", (req, res) => {
    /////POŁĄCZENIE DO BAZY DANYCH
    const seatInput = req.body.seat;
    const jetInput = req.body.jet;
    console.log('input z frontendu:')
    console.log(req.body);
    // console.log(seatInput);
    // console.log(jetInput);
    
    
    const dbname = 'db_university';
    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
            if (err) throw err;
            const db = client.db(dbname);
            const filter = {seat: seatInput, jet: jetInput};
            //const update = { $set: {price: 57} };
            const update = { $set: {free: false} };
            db.collection("seats").updateOne(filter, update, function(err, res) {
              if (err) throw err;
              console.log("Zaktualizano dane w bazie Mongo");
              console.log(filter);
              client.close();
            });
          });
     
  });

//-------------------------------------------------------------------------------------------------
//----- start serwera Node
app.listen(port, (err) => {
    if (err) {
        return console.log("coś poszło nie tak ...:", err)
    }
    console.log("serwer działa na porcie", port)
});

app.use('/assets', express.static(path.join(__dirname,"./assets")));
app.use('/js', express.static(path.join(__dirname, "./js")));




// const mongoose = require("mongoose");
// const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority/db_university";
// mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
// module.exports = app;
// const test1 = 'zmienna z app_js';
// app.get('/checkUser', function (req, res) {
//   res.send(test1)
// })

// fetch("./seats.json")
// .then((resp) => resp.json())
// .then(function(data){
//   console.log(data);
// });

