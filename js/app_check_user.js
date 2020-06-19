const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

/////////////
const mongo = require("mongodb");
const mongoClient = mongo.MongoClient;
//const url = "mongodb://127.0.0.1:27018";
const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority";

///////////////////

app.get("/", (req, respond) => {
  respond.sendFile(__dirname + "/index.html");
});

app.use(bodyparser.urlencoded({ extended: true }));
app.post("/", (req, res) => {
  /////POŁĄCZENIE DO BAZY DANYCH
  
  const dbname = 'db_university';
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
      console.log("error", err);
    }
    console.log(req.body.inputName);
    console.log(req.body.inputSurName);
    const db = client.db(dbname);
  ////////  ODPYTANIE BAZY 
              db.collection('users').find({$and: [{name: req.body.inputName}, {surname: req.body.inputSurName}]}).toArray((err, result) => {
            if (err) { 
            console.log('coś poszło nie tak - nie sprawdzono bazy');
            }
            if (result && result.length) {
                //console.log('mamy takiego użytkownika');
                //console.log(result); // print out what it sends back

                //zwrotka na stronę dla informacji użytkownika
                //res.send('<p>some html</p>')
                //res.send('<p>'+`Wprowadziłeś: ${req.body.inputName} ${req.body.inputSurName} - mamy takiego użytkownika`+'</p>');
                //res.end(`You have selected: ${req.body.inputName} ${req.body.inputSurName} - mamy takiego użytkownika`);
            }
            else { // if it does not 
            console.log("błędna nazwa użytkownika lub hasło");
            res.end(`You have selected: ${req.body.inputName} ${req.body.inputSurName} - błędna nazwa użytkownika lub hasło`);
            console.log(result);
            }
            });
    
    
    console.log("połączenie udane");
 
  });

  console.log(req.body);
  
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
