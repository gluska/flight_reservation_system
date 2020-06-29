import {logout} from './functions.js';

//===================   set defaults for calendar  =============================

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //eg.January is 0!
var yyyy = today.getFullYear();
var nextYear = today.getFullYear() + 1;
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
const maxDate = nextYear+'-'+mm+'-'+dd;
document.getElementById("depDate").setAttribute("min", today);
document.getElementById("depDate").setAttribute("max", maxDate);

//======================  Log in  ===============================================
let testLogin = 0;
let testPW = false;
let userNameJson = "";

const loggingIn = () =>{
  //checking if we have user registered in the database
  fetch("https://raw.githubusercontent.com/gluska/flight_reservation_system/master/js/personal_data.json")
  .then((resp) => resp.json()) // transform the data into json
  .then(function (data) {
    const personal_data = data; 
    const inputLogin = document.getElementById("inputLogin").value;
    const inputPW = document.getElementById("inputPW").value;
    for (let i = 0; i < Object.keys(personal_data).length; i++) {
      if ((personal_data[i].login === inputLogin) && (personal_data[i].pwd === inputPW) ) { //validation = OK
  
        testLogin +=1; //entered login and password found in the json database
        userNameJson = personal_data[i].name;  //assigning a name read from the json file
 
        };
      };
    
        if(testLogin===1){//validation ok
          document.getElementById("comValidation").innerText="Logowanie prawidłowe";
          document.getElementById("comValidation").style.color = "green";
          setTimeout(function(){
            document.getElementById("Popup_form").classList.remove("show");
            document.getElementById("Popup_form").classList.add("hide_form");
            
            document.getElementById("comInvitation").innerText = `Witaj, ${userNameJson}!`;

            },1000);
            
            document.getElementById("btnLogin").classList.add("hidden");
            document.getElementById("btnLogout").style.visibility = "visible";
            // document.getElementById("btnLogout").style.justifyContent = "center";
            document.getElementById("counter_label").classList.add("show_2");
            document.getElementById("counter").classList.add("show_2");
            logout();

        }
        else {//validation = error
          document.getElementById("comValidation").innerText="Błędny login lub hasło. Spróbuj ponownie.";
          document.getElementById("comValidation").style.color = "red";
          setTimeout(function(){
            document.getElementById("comValidation").innerText="";
            }, 2000);//after 2s statement disappears
          };
    });

   
 }; //end of the function 'loggingIn'


//===================================================================================
const clickLogin = () => {
  document.getElementById("inputLogin").value = "";
  document.getElementById("inputPW").value = "";
  document.getElementById("comValidation").innerText="";
  document.getElementById("Popup_form").classList.toggle("show");//making visible logging form
  document.getElementById('inputPW').onkeydown = function(){
    if(event.keyCode == 13){    //enter after entering the password
      loggingIn()
      }
    };
};
//====================================================================
//support button 'Passengers' which redirects to 'passengers' form
document.getElementById("btnPas").addEventListener("click", () =>{
    document.getElementById("camera").classList.toggle("cameraUp");
    document.getElementById("camera").classList.toggle("cameraDown");
    document.getElementById("form_pas").classList.toggle("show");//making visible 'passengers' form
}); 
//====================================================================
//support button 'Logowanie' which redirects to logging form
document.getElementById("btnLogin").addEventListener("click", clickLogin);    
//support button 'Zaloguj się' on logging form
document.getElementById("btn2").addEventListener("click", loggingIn); //btn "Zaloguj się"

//support button 'Wyloguj' on main page
document.getElementById("btnLogout").addEventListener("click", () => {
  location.href='/logout';
}); 

//support button 'Anuluj' on login form
document.getElementById("btnCan1").addEventListener("click", () => {
  document.getElementById("Popup_form").classList.toggle("show");//making invisible logging form
}); 


