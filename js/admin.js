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
        <td>${tickets}</td>
        <td>
          <button id="${docID}" class="delete-btn"><i class="fas fa-trash-alt"></i>Supprimer</button>
        </td>
      </tr>` ;

    })
    document.getElementById('concert').insertAdjacentHTML('beforeend', evenements)


    // Supprimer un évenement
        
    document.getElementById('concert').addEventListener('click', (event)=>{
      const id = event.target.id;
      eventRef.doc(id).delete().then(() => {
        window.location.reload();
      })
    })
})

// ////////////////////////////////////////
//***** */ Gestionnaire du formulaire

document.getElementById('formulaire').addEventListener('submit', (event) => {
  event.preventDefault();

  // Récupération des valeurs du champ <input>
  const dateUS = document.getElementById('date').value;
  const date =  dateUS.split('-').reverse().join('/');

  // const pays = document.getElementById('pays').value;
  const ville = document.getElementById('ville').value;
  const salle = document.getElementById('salle').value;
  const tickets = document.getElementById('tickets').value;

  // Ajouter les données dans la base de donnée
  firebase.firestore().collection('event').add({
      date:date,
      ville:ville,
      lieu:salle,
      tickets:tickets
  });

  let inputs = document.querySelectorAll('input');

  inputs.forEach(input => input.value ="");

  alert("L'événement a été ajouté !");
});



//**** */ L'Authentification

const loginBtn = document.getElementById('login_form');
loginBtn.addEventListener('submit', connexion);

function connexion(event) {
  event.preventDefault();

  const email = document.getElementById('login').value;
  const password = document.getElementById('password').value;

  console.log(email, password);

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
          const user = result.user;

          document.getElementById('admin-off').style.display="none";
          document.getElementById('admin-on').style.display="block";

      })
      .catch(error => alert(error) );
}


// Ecouter les changements dans le DOM 
document.addEventListener("DOMContentLoaded", pageRefresh);
// Le maintien de la connexion 

function pageRefresh() {

  firebase.auth().onAuthStateChanged(user => {
      if (user !== null) {
          document.getElementById('admin-off').style.display="none";
          document.getElementById('admin-on').style.display="block";
      } else{
          document.getElementById('admin-on').style.display="none";
          document.getElementById('admin-off').style.display="flex";
      }
  });
}

// Déconnexion 
document.getElementById('logoutBtn').addEventListener('click', deconnexion);
function deconnexion() {
  firebase.auth().signOut().then(() => {
      document.getElementById('admin-off').style.display="flex";
      document.getElementById('logged-on').style.display="none";
  });
}

