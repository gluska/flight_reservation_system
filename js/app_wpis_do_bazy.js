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
  /////////////////// ZAPIS DO BAZY DANYCH
  //const dbname = "mongo-study1405";
  const dbname = 'db_university';
  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
      console.log("error", err);
    }
    console.log(req.body.inputName);
    console.log(req.body.inputSurName);
    const db = client.db(dbname);

    db.collection("users").insertOne(
      {
        name: req.body.inputName,
        surname: req.body.inputSurName,
      },
      (error, result) => {
        if (error) {
          console.log("error when inserting", error);
        }
        console.log(result);
        
      }
    );
    console.log("połączenie udane");
  });

  console.log(req.body);
  res.end(`You have selected: ${req.body.inputName} ${req.body.inputSurName}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
