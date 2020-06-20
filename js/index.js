
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
var maxDate = nextYear+'-'+mm+'-'+dd;
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
    let personal_data = data; 
    let inputLogin = document.getElementById("inputLogin").value;
    let inputPW = document.getElementById("inputPW").value;
    for (let i = 0; i < Object.keys(personal_data).length; i++) {
      if ((personal_data[i].login === inputLogin) && (personal_data[i].pwd === inputPW) ) { //validation = OK
        // console.log(`${i} = ${personal_data[i].login} : ${personal_data[i].pwd} `);
        // console.log(`${i} = ${inputLogin} : ${inputPW} `);
    
        testLogin +=1; //entered login and password found in the json database
        userNameJson = personal_data[i].name;  //assigning a name read from the json file
        };
      };
    
        if(testLogin===1){//validation ok
          // console.log(inputLogin);
          // console.log(inputPW);
          // console.log(testLogin);
          document.getElementById("comValidation").innerText="Logowanie prawidłowe";
          document.getElementById("comValidation").style.color = "green";
          setTimeout(function(){
            document.getElementById("Popup_form").classList.remove("show");
            document.getElementById("Popup_form").classList.add("hide_form");
            document.getElementById("btnLogin").classList.add("hidden");
            document.getElementById("comInvitation").innerText = `Witaj, ${userNameJson}!`;
            },1000);
        }
        else {//validation = error
          // console.log(inputLogin);
          // console.log(inputPW);
          // console.log(testLogin);
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
  document.getElementById("form_pas").classList.toggle("show");//making visible 'passengers' form
}); 
//====================================================================
//support button 'Logowanie' which redirects to logging form
document.getElementById("btnLogin").addEventListener("click", clickLogin);    
//support button 'Zaloguj się' on logging form
document.getElementById("btn2").addEventListener("click", loggingIn); //btn "Zaloguj się"


// ======================   automatic log out  =========================
var logoutTime = 180000;//initial counter value 3 min

function logout(){
  if(logoutTime>0)
  {
    logoutTime = logoutTime-1000;//descend 1 sec
    document.getElementById("counter").innerHTML = logoutTime/1000+' sec';
  }
  else
  {
    clearInterval(countdown);//moment t=0, stopping the countdown
    location.href='/logout';
    document.getElementById("counter").innerHTML = logoutTime;
  }
}; 

function resetLogOutTime()
{
        logoutTime = 180000;
}

var countdown = setInterval(logout,1000);//execute function every 1 sec
document.onmousemove = resetLogOutTime;
document.onkeydown   = resetLogOutTime;







// ============= kontrola ilości pasażerów =========
// setInterval(function(){ 
//   var el4 = document.getElementById("pasDisplay").value;
//   if(el4 > 9){
//     document.getElementById("pasDisplay").classList.toggle("warn");
//   }

// }, 1000);

// ========== kliknięcie poza formularzem zamyka formularz ==============

      // document.getElementById('form_pas').classList.toggle('hide_form');

  // document.getElementById('outer-container').onclick = function(e) {
  //   if(e.target != document.getElementById('form_pas')) {
  //       console.log('You clicked outside');
  //   } else {
  //       console.log('You clicked inside');
  //   }
  // }


  

   