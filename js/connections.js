const mongo = require('mongodb');
const mongoClient = mongo.MongoClient;
const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority";
const dbname = "db_university";

mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
  if(error){console.log("error", err)}
  const db = client.db(dbname);
  db.collection("users").insertOne({
      name: "Grzegorz",
      surname: "Godula"
  }, (error, result) => {
      if (error) {console.log("error when inserting", error)}
      console.log("Pomyślnie zarejestrowano użytkownika")
      client.close();
  })

  });

  mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
    if(error){console.log("error", err)}
    const db = client.db(dbname);
    
    db.collection("users").find({name: "Grzegorz"}).toArray((error, result) => {
        console.log(result);
        client.close();
    })
  
    });
  
 