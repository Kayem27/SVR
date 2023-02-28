import config from "../config.js";

// Initialisation de Firebase
firebase.initializeApp(config);


//****** */ Récupérer les données de la base
// Affichage des cartes

const eventRef = firebase.firestore().collection('event');

eventRef.onSnapshot(querysnapshot => {
  
  let evenements = "";

     querysnapshot.forEach(doc => {
        let {date, lieu, tickets, ville} = doc.data();
        let docID = doc.id;
 
        evenements +=`
          <tr>
            <td class="date">${date}</td>
            <td class="ville">${ville}</td>
            <td class="lieu">${lieu}</td>
            <td></td>
            <td><button class="reserveBtn"><a href="#">RÉSERVER</a></button></td>
          </tr> ` ;

    })
    document.getElementById('concert').insertAdjacentHTML('beforeend', evenements)

});

// Le svg épuisé
function soldOut(param){
  if(param){
    document.getElementById('sold').classList.add('tickets');
  }
}