// =====================  support for reservation seats  ================
var arrSeats = [];
export const reservation = (jet) => {
    var list="";
    if (jet === "Bombardier" ){
        list = document.querySelectorAll('.freeFC_BOM,.freeEP_BOM,.freeE_BOM');
    }
    else if(jet === "B737"){
        list = document.querySelectorAll('.freeEP,.freeFC,.btn_economy');
    }
    else if(jet === "B757"){
        list = document.querySelectorAll('.freeBC_757,.freeEP_757,.btn_economy_757');
    }

    arrSeats = []; //reset of selected seats after the plane becomes visible
        //listening for events for all elements with the class name 'freeBC_757' or 'freeEP_757' or 'btn_economy_757'
        //after clicking, it reads the value of the 'id' attribute from the clicked element and adds the id to the array
    console.log(jet);
    console.log(list);


    for(var i=0;i<list.length;i++){
    list[i].addEventListener("click", function() {
        var numPer = document.getElementById("pasDisplay").value;
        var seatNum = this.getAttribute('id');
        var btnChecked = document.getElementById(seatNum);
        
        if (!arrSeats.includes(seatNum) && arrSeats.length<numPer && arrSeats.length<9) {
            arrSeats.push(seatNum);
            btnChecked.classList.toggle("prebook");
        } 
        else if (arrSeats.includes(seatNum)) {
            arrSeats.splice(arrSeats.indexOf(seatNum), 1); //removes 1 item from the specified index
            btnChecked.classList.toggle("prebook");
        } 
        else if (arrSeats.length>=numPer){
            document.getElementById("comm_warning1").innerText= `Maksymalna ilość miejsc do wybrania to ${numPer} !`;
            document.getElementById("comm_warning1").style.color = "red";
            setTimeout( () => {
            document.getElementById("comm_warning1").innerText="";
            }, 2000);
        }
        else if (arrSeats.length>=9){
            document.getElementById("comm_warning1").innerText="Maksymalna ilość miejsc do wybrania to 9! Zmień ilość pasażerów.";
            document.getElementById("comm_warning1").style.color = "red";
            setTimeout(function(){
            document.getElementById("comm_warning1").innerText="";
            }, 2000);
        }
        else {console.log("Coś poszło nie tak");}
        }
        )};

};
//===================  listening to change  data  ===================================

var numAdt = 0;
var numTeens = 0;
var numKids = 0;
var numInf = 0;
var sumPas = numAdt + numTeens + numKids + numInf;

export const listenToChange = () =>{
    numAdt = parseInt(document.getElementById("adt_pas").value);
    numTeens = parseInt(document.getElementById("teen_pas").value);
    numKids = parseInt(document.getElementById("kid_pas").value);
    numInf = parseInt(document.getElementById("inf_pas").value);
    sumPas = numAdt + numTeens + numKids + numInf;
    document.getElementById("pasDisplay").value= sumPas;
    if(sumPas > 9){
       document.getElementById("commPas").innerText="Maksymalna ilość pasażerów to 9 osób!";
       document.getElementById("commPas").style.color = "red";
       document.getElementById("pasDisplay").style.color = "red";
       document.getElementById("pasDisplay").style.backgroundColor = "#F08080";
       } else {
          document.getElementById("commPas").innerText="";
          document.getElementById("pasDisplay").style.color = "black";
          document.getElementById("pasDisplay").style.backgroundColor = "white";
       }

}

export {arrSeats, numAdt, numTeens, numKids, numInf, sumPas};