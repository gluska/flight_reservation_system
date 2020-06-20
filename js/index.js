
//set defaults for calendar

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
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

//pobranie danych zarejestrowanych użytkowników z pliku JSON
var personal_data = JSON.parse(personal_data); //metoda JSON.parse przetwarza ciąg tekstowy zawierajacy dane JSON - konwersja danych na postać obiektu Javascript

var testLogin = 0;
var testPW = false;
var userNameJson = "";

//===========================================================
const logowanie = () =>{
  //sprawdzenie czy mamy takiego użytkownika zarejestrowanego w bazie
var inputLogin = document.getElementById("inputLogin").value;
var inputPW = document.getElementById("inputPW").value;
console.log(personal_data);
for (let i = 0; i < Object.keys(personal_data).length; i++) {
  if ((personal_data[i].login === inputLogin) && (personal_data[i].pwd === inputPW) ) { //validation = OK
    console.log(`${i} = ${personal_data[i].login} : ${personal_data[i].pwd} `);
    console.log(`${i} = ${inputLogin} : ${inputPW} `);

    testLogin +=1; //wprowadzony login i hasło odnalezione w bazie json
    userNameJson = personal_data[i].name;  //przypisanie imienia odczytanego z bazy json
    };
  };

    if(testLogin===1){//validation ok
      console.log(inputLogin);
      console.log(inputPW);
      console.log(testLogin);
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
      console.log(inputLogin);
      console.log(inputPW);
      console.log(testLogin);
      document.getElementById("comValidation").innerText="Błędny login lub hasło. Spróbuj ponownie.";
      document.getElementById("comValidation").style.color = "red";
      setTimeout(function(){
        
        document.getElementById("comValidation").innerText="";
        }, 2000);//po 2s napis znika
      };
    //  return;
 };


//===================================================================================
const clickLogin = () => {
  document.getElementById("inputLogin").value = "";
  document.getElementById("inputPW").value = "";
  document.getElementById("Popup_form").classList.toggle("show");//odsłonięcie formularza logowania
  document.getElementById("comValidation").innerText="";
  document.getElementById('inputPW').onkeydown = function(){
    if(event.keyCode == 13){    //enter po wprowadzeniu hasła
      logowanie()
      }
    };
};
//====================================================================
//obsługa przycisku 'Passengers' kierującego do formularza wypełniania ilości pasażerów
document.getElementById("btnPas").addEventListener("click", () =>{
  document.getElementById("form_pas").classList.toggle("show");//odsłonięcie formularza logowania
}); 
//====================================================================
//obsługa przycisku 'Log in' kierującego do formularza logowania
document.getElementById("btnLogin").addEventListener("click", clickLogin);    
//obsługa przycisku 'Zaloguj się' na formularzu logowania
document.getElementById("btn2").addEventListener("click", logowanie); //btn "Zaloguj się"


//--------------automatyczne wylogowywanie  ------------------

var logoutTime = 180000;//pierwotny stan licznika 3 min
var countdown = setInterval('logout()',1000);//wykonaj funkcję co 1 sec

document.onmousemove = resetLogOutTime;
document.onkeydown   = resetLogOutTime;

function resetLogOutTime()
{
        logoutTime = 180000;
}

function logout(){
    if(logoutTime>0)
    {
      logoutTime = logoutTime-1000;//schodzimy o 1 sec
      document.getElementById("counter").innerHTML = logoutTime/1000+' sec';
    }
    else
    {
      clearInterval(countdown);//moment t=0, zatrzymanie odliczania czasu
      location.href='/logout';
      document.getElementById("counter").innerHTML = logoutTime;
    }
} 



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


  

   