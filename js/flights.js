import {reservation, listenToChange, arrSeats} from './functions.js';


var selectedJet; //mapping destinations to an airplane
document.getElementById("destinations").addEventListener("change", () => {
const choiceDest = document.getElementById("destinations").value; //destination choose
if (choiceDest === "GDN") {selectedJet="Bom"} 
else if (choiceDest === "CDG") {selectedJet="B737"} 
else if (choiceDest === "JFK") {selectedJet="B757"} 
});

// ==========================     support for destination select   ==========================================
var depTime = "";
var destTime = "";
document.getElementById("destinations").addEventListener("change", function() {
    const choiceDest = document.getElementById("destinations").value; 
    const country = document.getElementById("Bombardier");
    const continental = document.getElementById("B737");
    const interContinental = document.getElementById("B757");
    
//----flight to Gdansk
    if (choiceDest === "GDN"){
        country.classList.remove("hidden_plane");
        country.classList.add("visible_plane");
        continental.classList.remove("visible_plane");
        continental.classList.add("hidden_plane");
        interContinental.classList.remove("visible_plane");
        interContinental.classList.add("hidden_plane");
        depTime = "09:25";
        destTime = "11:10";
        reservation('Bombardier');
    } 
    //----flight to Paris
    else if (choiceDest === "CDG"){
        country.classList.remove("visible_plane");
        country.classList.add("hidden_plane");
        continental.classList.remove("hidden_plane");
        continental.classList.add("visible_plane");
        interContinental.classList.remove("visible_plane");
        interContinental.classList.add("hidden_plane");
        depTime = "07:10";
        destTime = "11:15";
        reservation('B737');
    }
    //----flight to New York
    else if (choiceDest === "JFK"){
        country.classList.remove("visible_plane");
        country.classList.add("hidden_plane");
        continental.classList.remove("visible_plane");
        continental.classList.add("hidden_plane");
        interContinental.classList.remove("hidden_plane");
        interContinental.classList.add("visible_plane");
        depTime = "05:25";
        destTime = "20:30";
        reservation('B757');
    }
    else if (choiceDest === "blank"){
        country.classList.remove("visible_plane");
        country.classList.add("hidden_plane");
        continental.classList.remove("visible_plane");
        continental.classList.add("hidden_plane");
        interContinental.classList.remove("visible_plane");
        interContinental.classList.add("hidden_plane");
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
            const inputBagQuan = document.getElementById("inputBag").value;
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
            const res_seat_output = arrSeats.join(", ");
            const numTickets = arrSeats.length;
            const adt_pas = document.getElementById('adt_pas').value;
            const teen_pas = document.getElementById('teen_pas').value;
            const kid_pas = document.getElementById('kid_pas').value;
            const inf_pas = document.getElementById('inf_pas').value;
            const visAdt = document.getElementById('sumAdt');
            const visTeens = document.getElementById('sumTeens');
            const visKid = document.getElementById('sumKid');
            const visInf = document.getElementById('sumInf');
            const inputBagQuan = document.getElementById("inputBag").value;
     
            //.toFixed(2) -> rounding to 2 decimal places; '+' changes string into number
            totalPrice = (+(parseInt(adt_pas) * standardPrice).toFixed(2))+(+(parseInt(teen_pas) *teensPrice).toFixed(2))+(+(parseInt(kid_pas)*kidPrice).toFixed(2))+(+(parseInt(inf_pas)*infPrice).toFixed(2))+parseFloat(bagPrice);
            totalPriceFix = totalPrice.toFixed(2); 

            if(adt_pas === "0") {visAdt.style.visibility = "hidden";} {visAdt.style.visibility="visible";};
            if(teen_pas === "0") {visTeens.style.visibility = "hidden";} else {visTeens.style.visibility = "visible";};
            if(kid_pas === "0") {visKid.style.visibility = "hidden";} else {visKid.style.visibility ="visible";};
            if(inf_pas === "0") {visInf.style.visibility = "hidden";} else {visInf.style.visibility ="visible";};
            if(inputBagQuan == "0") {document.getElementById('bag_info_line').style.visibility = "hidden";} {document.getElementById('bag_info_line').style.visibility = "visible";};
            const choiceDepPl = document.getElementById('dep_airport')[document.getElementById('dep_airport').selectedIndex].innerHTML;
            const choiceDest = document.getElementById('destinations')[document.getElementById('destinations').selectedIndex].innerHTML;
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
            // document.getElementById("inputAdt").innerHTML = `${adt_pas} x Osoby Dorosłe`;
            // document.getElementById("inputTeens").innerHTML = `${teen_pas} x Młodzież`;
            // document.getElementById("inputKid").innerHTML = `${kid_pas} x Dzieci`;
            // document.getElementById("inputInf").innerHTML = `${inf_pas} x Niemowlęta`;

            document.getElementById("inputAdt").innerHTML = `Osoby Dorosłe`;
            document.getElementById("inputTeens").innerHTML = `Młodzież`;
            document.getElementById("inputKid").innerHTML = `Dzieci`;
            document.getElementById("inputInf").innerHTML = `Niemowlęta`;
            
            document.getElementById("costAdt").innerHTML = `${adt_pas} x ${standardPrice.toFixed(2)} PLN`;
            document.getElementById("costTeens").innerHTML = `${teen_pas} x ${teensPrice.toFixed(2)} PLN`;
            document.getElementById("costKid").innerHTML = `${kid_pas} x ${kidPrice.toFixed(2)} PLN`;
            document.getElementById("costInf").innerHTML = `${inf_pas} x ${infPrice.toFixed(2)} PLN`;

            document.getElementById("res_seats").innerHTML = res_seat_output;
            document.getElementById("bag_info").innerHTML = `${bagPrice} PLN (${inputBagQuan} szt)`;
            document.getElementById("totalPriceOutput").innerHTML = `${totalPriceFix} PLN`;


            });
};
//=====================    support for button  for summary  generator  ======================================
document.getElementById("btnConfirm").addEventListener("click", function() {
    const el1 = document.getElementById("dep_airport");
    const el2 = document.getElementById("destinations");
    const el3 = document.getElementById("depDate");
    const el4 = document.getElementById("pasDisplay").value;
    const el5 = arrSeats.length;

    //checking if departure has been selected
    if(el1 == null || el1.value === "blank"){
        const com1 = document.createElement("P");               
        com1.innerText = "Nie wybrano miejsca wylotu!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com1);
        setTimeout( function() {
        document.getElementById("comm_warning1").removeChild(com1);
        }, 2000);
    }
    //checking if the destination has been selected
    else if(el2 == null || el2.value === "blank"){
        const com2 = document.createElement("P");               
        com2.innerText = "Nie wybrano miejsca docelowego!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com2);
        setTimeout( function() {
        document.getElementById("comm_warning1").removeChild(com2);
        }, 2000);

    }
    //checking if the departure date has been provided
    else if(el3 == null || el3.value === ""){
        const com3 = document.createElement("P");               
        com3.innerText = "Nie wybrano daty wylotu!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com3);
        setTimeout( function() {
        document.getElementById("comm_warning1").removeChild(com3);
        }, 2000);
    }
    //validation whether max of passengers <= 9
    else if(el4 > 9){
        const com4 = document.createElement("P");               
        com4.innerText = "Skoryguj ilość pasażerów - max 9 osób!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com4);
        setTimeout(function() {
        document.getElementById("comm_warning1").removeChild(com4);
        }, 2000);
    }
 
    //validation whether min 1 place is indicated
    else if(arrSeats.length === 0){
        const com5 = document.createElement("P");               
        com5.innerText = "Nie wybrano żadnego miejsca!"; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com5);
        setTimeout(function() {
        document.getElementById("comm_warning1").removeChild(com5);
        }, 2000);
    }

    //validation whether the number of marked places is equal with the number of passengers
    else if(el4 != el5){
        const com5 = document.createElement("P");               
        com5.innerText = `Zaznacz ${el4} miejsc!`; 
        document.getElementById("comm_warning1").style.color = "red";
        document.getElementById("comm_warning1").appendChild(com5);
        setTimeout(function() {
        document.getElementById("comm_warning1").removeChild(com5);
        }, 2000);
    }


    //  lock => force logging in before being able to generate a summary
    else if(document.getElementById("comInvitation").textContent === ""){//no successful login
        document.getElementById("comm_warning1").innerText="Najpierw musisz się zalogować!";
        document.getElementById("comm_warning1").style.color = "red";
        setTimeout( () => {
        document.getElementById("comm_warning1").innerText="";
        }, 2000);
    } 
    
    // call for summary generator
    else {getSummary()}

   

});

// =====================  temporary shopping cart =============
// 

const getShoppingCart = () => {
    fetch("https://raw.githubusercontent.com/gluska/flight_reservation_system/master/js/baggage.json")
    .then((resp) => resp.json()) // transform the data into json
    .then(function (data) {
        const inputBagQuan = document.getElementById("inputBag").value;
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

        const adt_pas = document.getElementById('adt_pas').value;
        const teen_pas = document.getElementById('teen_pas').value;
        const kid_pas = document.getElementById('kid_pas').value;
        const inf_pas = document.getElementById('inf_pas').value;

        // console.log("OK")
        //.toFixed(2) -> rounding to 2 decimal places; '+' changes string into number
        totalPrice = (+(parseInt(adt_pas) * standardPrice).toFixed(2))+(+(parseInt(teen_pas) *teensPrice).toFixed(2))+(+(parseInt(kid_pas)*kidPrice).toFixed(2))+(+(parseInt(inf_pas)*infPrice).toFixed(2))+parseFloat(bagPrice);
        totalPriceFix = totalPrice.toFixed(2); 

        console.log(totalPrice);
        document.getElementById("comm_cart").innerText = "";
        document.getElementById("comm_cart").innerText = `Aktualna wartość koszyka: ${totalPriceFix} PLN`;
        });
    };
// ============================ listening on events - click on seat or change additional baggage ===========
    const list_tarif = document.querySelectorAll('.freeFC_BOM,.freeEP_BOM,.freeE_BOM, .freeEP,.freeFC,.btn_economy,.freeBC_757,.freeEP_757,.btn_economy_757');
    
    for(var i=0;i<list_tarif.length;i++){
        list_tarif[i].addEventListener("click", function() {
            // console.log("kliknieto");
            getShoppingCart();
        });
    };

    document.getElementById("inputBag").addEventListener("change", function() {
        getShoppingCart();
    });

    document.getElementById("adt_pas").addEventListener("change", function() {
        getShoppingCart();
    });
    document.getElementById("teen_pas").addEventListener("change", function() {
        getShoppingCart();
    });
    document.getElementById("kid_pas").addEventListener("change", function() {
        getShoppingCart();
    });
    document.getElementById("inf_pas").addEventListener("change", function() {
        getShoppingCart();
    });