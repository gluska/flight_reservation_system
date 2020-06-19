console.log('Client-side code running');
//const fromApp = require("./../app");

//console.log(fromApp.test1);

//document.getElementById('p10').innerHTML = fromApp.nameNode+' '+fromApp.surNameNode;

// var button = document.getElementById('submit');
// button.addEventListener('click', function(e) {
//   console.log('button was clicked');
//   var user = document.getElementById("user").value;
//   var pass = document.getElementById("password").value;
//   console.log ("user: " +user);
//   console.log ("pwd: "+pass);

//   fetch('http://localhost:3000/login', {method: "POST", body: { "user": user, "password": pass }})
//     .then(function(response) {
//       if(response.ok) {
//         console.log('user was recorded');
//         return;
//       }
//       throw new Error('Request failed.');
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// });


// fetch('/', {method: 'POST'})
// .then(response => {
//   console.log(response.json());
//   console.log(response.text());
// });


//wersja jQuery
// $(document).ready(function () {
//   var user, pass;
//   $("#submit").click(function () {
//     user = $("#user").val();
//     pass = $("#password").val();
//     $.post("http://localhost:3000/login", {
//       user: user,
//       password: pass
//     }, function (data) {
//       if (data === 'done') {
//         alert("login success");
//       }
//     });
//   });
// });





// fetch("localhost:3000/login",
// {method: "POST", body: { user: "user", password: "pass" }}
// );
// setInterval(function() {
//   fetch('/clicks', {method: 'GET'})
//     .then(function(response) {
//       if(response.ok) return response.json();
//       throw new Error('Request failed.');
//     })
//     .then(function(data) {
//       document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }, 1000

// fetch("test_data")
// .then((resp) => resp.json()) // Transform the data into json
// .then(function (data) {
// data.forEach(function (element) {
// console.log(element.name);
// document.getElementById(
// "output"
// ).innerHTML += `<div> ${element.name} </div>`;
// });
// });




