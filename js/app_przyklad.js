const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

//tu wstawiamy co express ma serwować po wybraniu strony głównej "/" - jaki plik html
//metoda app.get  kieruje żądania HTTP GET do określonej ścieżki za pomocą określonych funkcji zwrotnych (callback) .
app.get("/", (req, respond) => {
    respond.sendFile(__dirname + "/index.html");
});

app.use(bodyparser.urlencoded({
    extended: true
}));

// scieżkę w app.post trzeba uzgodnić z atrybutem 'action' w formularzu html
app.post("/", (req, res) => {//ustalamy ścieżkę gdzie ma być wywołana funkcja oprogramowania pośredniego
    console.log("req.body:");
    console.log(req.body);
    
    res.end(`You have selected: ${req.body.inputName} ${req.body.inputSurName}`); //tu widać co zostało przekazane z inputa Html z atrybutem name='inputName'
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

//----------------INNY PRZYKŁAD-------------
// exports.signin = function(req, res) {

//     var user = req.body;
//     console.log('req.body: ' + JSON.stringify(user));
//     console.log('Signing In As User: ' + user.username);
//     console.log('Password: ' + user.password);
//     res.send('You just signed in!');

// }