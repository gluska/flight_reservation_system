const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'my_password';
const someOtherPlaintextPassword = 'not_bacon';


//opis: ----------  https://www.npmjs.com/package/bcrypt
//----------synchronicznie

//To hash a password:
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
console.log('pierwotne brzmienie hasła:'+myPlaintextPassword);
console.log('salt: '+salt);
console.log('hash:' +hash);


//To check a password:
// Load hash from your password DB.
const test1 = bcrypt.compareSync(myPlaintextPassword, hash); // true
const test2 = bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
console.log('test1: '+test1);
console.log('test2:' +test2);


//---------------asynchronicznie
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//         console.log('pierwotne brzmienie hasła:'+myPlaintextPassword);
//         console.log('salt: '+salt);
//         console.log('hash:' +hash);

//     });
// });



