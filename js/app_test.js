const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));


// start the express web server listening on 3000
app.listen(3000, () => {
    console.log('listening on port 3000')
});

//---------test - dane przekazane ze strony
const inputUserName = 'zygmunt';
const inputUserPwd = '23458';
//const inputUserPwd = '2345889';
console.log('wprowadzono: ');
console.log(inputUserName);
console.log(inputUserPwd);

//połączenie z bazą Mongo
let db;
const dbname = 'db_university';
const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoClient.connect(url, {useUnifiedTopology: true},(err, client) => {
    if(err) { console.log("error", err) }
    //odpytanie db o userów
    const db = client.db(dbname);
    db.collection('users').find({$and: [{name: inputUserName}, {password: inputUserPwd}]}).toArray((err, result) => {
    if (err) { 
     console.log('coś poszło nie tak - nie sprawdzono bazy');
    }
    if (result && result.length) {
        console.log('mamy takiego użytkownika');
        console.log(result); // print out what it sends back
    }
    else { // if it does not 
    console.log("błędna nazwa użytkownika lub hasło");
    console.log(result);
    }
    });
    console.log('połączono z bazą MongoDb');
  });





// const checkUserName = () => {
//     // var self = this;
//     //const db = client.db(dbname);
//     return new Promise((resolve, reject) => {
//         mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//             if (err) {
//                 console.log("error", err)
//             }
//             const db = client.db(dbname);
//             console.log('połączono z bazą MongoDb');
//         });    
//         db.collection("users").find({name: inputUserName}, {$exists: true})
//                 .toArray((err, result) => {
//                         if (result && result.length) {
//                               console.log(result); // print out what it sends back
//                              resolve("Found user");
//                             }
//                          else { // if it does not 
//                             console.log("Not in docs");
//                             reject("Not found continue logic!");
//                         }
//                 });
//     });
// };
// checkUserName();
  
// // serve the homepage
//   app.get('/',function(req,res){
//     res.sendfile("index.html");
//   });