import {reservation, listenToChange, arrSeats, numAdt, numTeens, numKids, numInf, sumPas} from './functions.js';

// var arrSeats = [];

var selectedJet; //mapping destinations to an airplane
document.getElementById("destinations").addEventListener("change", () => {
var choiceDest = document.getElementById("destinations").value; //wybór destynacji
if (choiceDest === "GDN") {selectedJet="Bom"} 
else if (choiceDest === "CDG") {selectedJet="B737"} 
else if (choiceDest === "JFK") {selectedJet="B757"} 
});

// ==========================     support for destination select      =====================================================================
var depTime = "";
var destTime = "";
document.getElementById("destinations").addEventListener("change", function() {
    var choiceDest = document.getElementById("destinations").value; 
    var country = document.getElementById("Bombardier");
    var continental = document.getElementById("B737");
    var interContinental = document.getElementById("B757");
    
//----flight to Gdansk
    if (choiceDest === "GDN"){
        country.classList.remove("hidden");
        country.classList.add("visible");
        continental.classList.remove("visible");
        continental.classList.add("hidden");
        interContinental.classList.remove("visible");
        interContinental.classList.add("hidden");
        depTime = "09:25";
        destTime = "11:10";
        reservation('Bombardier');
    } 
    //----flight to Paris
    else if (choiceDest === "CDG"){
        country.classList.remove("visible");
        country.classList.add("hidden");
        continental.classList.remove("hidden");
        continental.classList.add("visible");
        interContinental.classList.remove("visible");
        interContinental.classList.add("hidden");
        depTime = "07:10";
        destTime = "11:15";
        reservation('B737');
    }
    //----flight to New York
    else if (choiceDest === "JFK"){
        country.classList.remove("visible");
        country.classList.add("hidden");
        continental.classList.remove("visible");
        continental.classList.add("hidden");
        interContinental.classList.remove("hidden");
        interContinental.classList.add("visible");
        depTime = "05:25";
        destTime = "20:30";
        reservation('B757');
    }
});
//=======================   event listeners =================

document.getElementById("adt_pas").addEventListener("change", ()=> {
        listenToChange();
})
document.getElementById("teen_pas").addEventListener("change", ()=> {
    listenToChange();
})
document.getElementById("kid_pas").addEventListener("change", ()=> {
    listenToChange();
})
document.getElementById("inf_pas").addEventListener("change", ()=> {
    listenToChange();
})


// ======================         preparing a summary    ======================================================================

var depDate;
document.getElementById("depDate").addEventListener("change", function() {
depDate = this.value;
});

var jet_prices;
var totalPrice = 0;
var totalPriceFix= 0;
var tarif = "";
var tarif_desc = "";
var standardPrice = 0;
var teensPrice = 0;
var kidPrice = 0;
var infPrice = 6.00;
var bag_prices;
var bagPrice = 0;

const getSummary = () =>{
document.getElementById("comm_cart").innerText = "";    

fetch("https://raw.githubusercontent.com/gluska/flight_reservation_system/master/js/baggage.json")
        .then((resp) => resp.json()) // transform the data into json
        .then(function (data) {
            let inputBagQuan = document.getElementById("inputBag").value;
            console.log(inputBagQuan);
            bag_prices = data.filter(el => el.jet === selectedJet && el.bagQuan === inputBagQuan); 
            bagPrice = (inputBagQuan == "0") ? "0.00" : bag_prices[0].price;
            
            
            });
      
        fetch("https://raw.githubusercontent.com/gluska/flight_reservation_system/master/js/seats.json") 
        .then((resp) => resp.json()) // transform the data into json
        .then((data) =>  {
            jet_prices = data.filter(el => el.jet === selectedJet && arrSeats.includes(el.seat)); 
            tarif = jet_prices[0].code;
            if(tarif == "BC"){tarif_desc = "Business Class" }
            else if(tarif == "FC"){tarif_desc = "First Class" }
            else if(tarif == "EC"){tarif_desc = "Economy Class" }
            else if(tarif == "EP"){tarif_desc = "Economy Plus" };

            standardPrice = jet_prices[0].price;
            teensPrice = standardPrice * 0.8;
            kidPrice = standardPrice * 0.5;
            console.log(tarif);
            console.log(standardPrice);
            totalPrice = 0;
            })
        .then(()=> {
            let res_seat_output = arrSeats.join(", ");
            let numTickets = arrSeats.length;
            let adt_pas = document.getElementById('adt_pas').value;
            let teen_pas = document.getElementById('teen_pas').value;
            let kid_pas = document.getElementById('kid_pas').value;
            let inf_pas = document.getElementById('inf_pas').value;
            let visAdt = document.getElementById('sumAdt');
            let visTeens = document.getElementById('sumTeens');
            let visKid = document.getElementById('sumKid');
            let visInf = document.getElementById('sumInf');
            let inputBagQuan = document.getElementById("inputBag").value;
            // for (var i in jet_prices) {
            //     totalPrice += parseFloat(jet_prices[i].price); 
            // };
            
            totalPrice = parseInt(adt_pas) * standardPrice+parseInt(teen_pas)*teensPrice+parseInt(kid_pas)*kidPrice+parseInt(inf_pas)*infPrice+parseInt(bagPrice);
            totalPriceFix = totalPrice.toFixed(2); //roundeing to 2 decimal places


            if(adt_pas === "0") {visAdt.style.visibility = "hidden";} {visAdt.style.visibility="visible";};
            if(teen_pas === "0") {visTeens.style.visibility = "hidden";} else {visTeens.style.visibility = "visible";};
            if(kid_pas === "0") {visKid.style.visibility = "hidden";} else {visKid.style.visibility ="visible";};
            if(inf_pas === "0") {visInf.style.visibility = "hidden";} else {visInf.style.visibility ="visible";};
            if(inputBagQuan == "0") {document.getElementById('bag_info_line').style.visibility = "hidden";} {document.getElementById('bag_info_line').style.visibility = "visible";};
            let choiceDepPl = document.getElementById('dep_airport')[document.getElementById('dep_airport').selectedIndex].innerHTML;
            let choiceDest = document.getElementById('destinations')[document.getElementById('destinations').selectedIndex].innerHTML;
            console.log("to jest res_seat_output: "+res_seat_output);

            //outputting messages on the page- section sidebar
            document.getElementById("summary").classList.remove("hidden");
            document.getElementById("summary").classList.add("visible");
            document.getElementById("depDate_conf").innerHTML = depDate;
            document.getElementById("depPlace").innerHTML = choiceDepPl;
            document.getElementById("depTime").innerHTML = depTime;
            document.getElementById("destPlace").innerHTML = choiceDest;
            document.getElementById("destTime").innerHTML = destTime;
            document.getElementById("tarInfo").innerHTML = tarif;
            document.getElementById("tarInfo_desc").innerHTML = tarif_desc;
                        

            document.getElementById("numSeats").innerHTML = numTickets;
            document.getElementById("inputAdt").innerHTML = `${adt_pas} x Osoby Dorosłe`;
            document.getElementById("inputTeens").innerHTML = `${teen_pas} x Młodzież`;
            document.getElementById("inputKid").innerHTML = `${kid_pas} x Dzieci`;
            document.getElementById("inputInf").innerHTML = `${inf_pas} x Niemowlęta`;
            
            document.getElementById("costAdt").innerHTML = `${adt_pas} x ${standardPrice} PLN`;
            document.getElementById("costTeens").innerHTML = `${teen_pas} x ${teensPrice} PLN`;
            document.getElementById("costKid").innerHTML = `${kid_pas} x ${kidPrice} PLN`;
            document.getElementById("costInf").innerHTML = `${inf_pas} x ${infPrice} PLN`;

            document.getElementById("res_seats").innerHTML = res_seat_output;
            document.getElementById("bag_info").innerHTML = `${bagPrice} PLN (${inputBagQuan} szt)`;
            document.getElementById("totalPriceOutput").innerHTML = `${totalPriceFix} PLN`;


            });
};
//=====================    support for button  for summary  generator  ======================================
document.getElementById("btnConfirm").addEventListener("click", function() {
    var el1 = document.getElementById("dep_airport");
    var el2 = document.getElementById("destinations");
    var el3 = document.getElementById("depDate");
    var el4 = document.getElementById("pasDisplay").value;
    var el5 = arrSeats.length;

    //checking if departure has been selected
    if(el1 == null || el1.value === "blank"){
        var com1 = document.createElement("P");               
        com1.innerText = "Nie wybrano miejsca wylotu!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com1);
        setTimeout( function() {
        document.getElementById("comm_warning1").removeChild(com1);
        }, 2000);
    }
    //checking if the destination has been selected
    else if(el2 == null || el2.value === "blank"){
        var com2 = document.createElement("P");               
        com2.innerText = "Nie wybrano miejsca docelowego!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com2);
        setTimeout( function() {
        document.getElementById("comm_warning1").removeChild(com2);
        }, 2000);

    }
    //checking if the departure date has been provided
    else if(el3 == null || el3.value === ""){
        var com3 = document.createElement("P");               
        com3.innerText = "Nie wybrano daty wylotu!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com3);
        setTimeout( function() {
        document.getElementById("comm_warning1").removeChild(com3);
        }, 2000);
    }
    //validation whether max of passengers <= 9
    else if(el4 > 9){
        var com4 = document.createElement("P");               
        com4.innerText = "Skoryguj ilość pasażerów - max 9 osób!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com4);
        setTimeout(function() {
        document.getElementById("comm_warning1").removeChild(com4);
        }, 2000);
    }
 
    //validation whether min 1 place is indicated
    else if(arrSeats.length === 0){
        var com5 = document.createElement("P");               
        com5.innerText = "Nie wybrano żadnego miejsca!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com5);
        setTimeout(function() {
        document.getElementById("comm_warning1").removeChild(com5);
        }, 2000);
    }

    //validation whether the number of marked places is equal with the number of passengers
    else if(el4 != el5){
        var com5 = document.createElement("P");               
        com5.innerText = `Zaznacz ${el4} miejsc!`; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com5);
        setTimeout(function() {
        document.getElementById("comm_warning1").removeChild(com5);
        }, 2000);
    }


    //  lock => force logging in before being able to generate a summary
    // else if(document.getElementById("comInvitation").textContent === ""){//no successful login
    //     document.getElementById("comm_warning1").innerText="Najpierw musisz się zalogować!";
    //     document.getElementById("comm_warning1").style.color = "red";
    //     setTimeout( () => {
    //     document.getElementById("comm_warning1").innerText="";
    //     }, 2000);
    // } 
    
    // call for summary generator
    else {getSummary()}

   

});

// =====================  temporary shopping cart =============
// 

var getShoppingCart = () => {
    fetch("https://raw.githubusercontent.com/gluska/flight_reservation_system/master/js/baggage.json")
    .then((resp) => resp.json()) // transform the data into json
    .then(function (data) {
        let inputBagQuan = document.getElementById("inputBag").value;
        console.log(inputBagQuan);
        bag_prices = data.filter(el => el.jet === selectedJet && el.bagQuan === inputBagQuan); 
        bagPrice = (inputBagQuan == "0") ? "0.00" : bag_prices[0].price;
        
        
        });
    
    fetch("https://raw.githubusercontent.com/gluska/flight_reservation_system/master/js/seats.json") 
    .then((resp) => resp.json()) //transform the data into json
    .then((data) =>  {
        jet_prices = data.filter(el => el.jet === selectedJet && arrSeats.includes(el.seat)); 
        tarif = jet_prices[0].code;
        if(tarif == "BC"){tarif_desc = "Business Class" }
        else if(tarif == "FC"){tarif_desc = "First Class" }
        else if(tarif == "EC"){tarif_desc = "Economy Class" }
        else if(tarif == "EP"){tarif_desc = "Economy Plus" };

        standardPrice = jet_prices[0].price;
        teensPrice = standardPrice * 0.8;
        kidPrice = standardPrice * 0.5;

        totalPrice = 0;
        let res_seat_output = arrSeats.join(", ");
        let numTickets = arrSeats.length;
        let adt_pas = document.getElementById('adt_pas').value;
        let teen_pas = document.getElementById('teen_pas').value;
        let kid_pas = document.getElementById('kid_pas').value;
        let inf_pas = document.getElementById('inf_pas').value;
        let visAdt = document.getElementById('sumAdt');
        let visTeens = document.getElementById('sumTeens');
        let visKid = document.getElementById('sumKid');
        let visInf = document.getElementById('sumInf');
        let inputBagQuan = document.getElementById("inputBag").value;
        // console.log("OK")
        totalPrice = parseInt(adt_pas) * standardPrice+parseInt(teen_pas)*teensPrice+parseInt(kid_pas)*kidPrice+parseInt(inf_pas)*infPrice+parseInt(bagPrice);
        console.log(totalPrice);
        totalPriceFix = totalPrice.toFixed(2); //roundeing to 2 decimal places
        document.getElementById("comm_cart").innerText = "";
        document.getElementById("comm_cart").innerText = `Aktualna wartość koszyka: ${totalPriceFix} PLN`;
        });
    };
// ============================ listening on events - click on seat or change additional baggage ===========
    var list_tarif = document.querySelectorAll('.freeFC_BOM,.freeEP_BOM,.freeE_BOM, .freeEP,.freeFC,.btn_economy,.freeBC_757,.freeEP_757,.btn_economy_757');
    
    for(var i=0;i<list_tarif.length;i++){
        list_tarif[i].addEventListener("click", function() {
            // console.log("kliknieto");
            getShoppingCart();
        });
    };

    document.getElementById("inputBag").addEventListener("change", function() {
        getShoppingCart();
    });
