//google.maps.event.addDomListener(window, 'load', initialize);
var liste = []

var localisation_poste = [];

var formulaire_saisie_coordonnees = document.getElementById("saisie");

formulaire_saisie_coordonnees.addEventListener("submit", function(event){
    event.preventDefault();
    setLocalisation();
})

var default_location = new google.maps.LatLng(-18.98598956902495, 47.53280214294123);

var mapOptions = { 
    center: default_location,
    zoom: 30, 
    mapTypeId:google.maps.MapTypeId.SATELLITE, 
};
var carte = new google.maps.Map(document.getElementById("carteId"), 
mapOptions); 

function modifier_option(new_location){
    let new_option = {
        center: new_location,
        zoom: 100, 
        mapTypeId:google.maps.MapTypeId.SATELLITE
    }
    carte = new google.maps.Map(document.getElementById("carteId"), 
    new_option); 
}

function setLocalisation(){
    let latitude = formulaire_saisie_coordonnees.elements["latitude"].value;
    let longitude = formulaire_saisie_coordonnees.elements["longitude"].value;
    console.log(latitude + " " +longitude);
    sendPointToPhp(latitude, longitude);
}

function getLocalisation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          sendPointToPhp(latitude, longitude);
          // Utilisez les coordonnées ici
        });
    } else {
    // La géolocalisation n'est pas prise en charge par le navigateur
    }
}

function maj_informations(jsonData){
    let nom = document.getElementById("nom");
    nom.textContent = jsonData.nom;

    let numero = document.getElementById("numero");
    numero.textContent = jsonData.numero;

    let latitude = document.getElementById("latitude");
    latitude.textContent = jsonData.latitude;

    let longitude = document.getElementById("longitude");
    longitude.textContent = jsonData.longitude;

    let distance = document.getElementById("distance");
    distance.textContent = jsonData.distance ;
}

function sendPointToPhp(latitude, longitude) {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    xhr.addEventListener("load", function(event) {
      const responseText = event.target.responseText;
      if (responseText !== "") {
        const poste = JSON.parse(responseText);
        modifier_option(new google.maps.LatLng((poste[0].latitude), (poste[0].longitude)));
        createMarker(new google.maps.LatLng((poste[0].latitude), (poste[0].longitude)),"Poste de" + poste[0]["nom"]);
        createMarker(new google.maps.LatLng(latitude, longitude), "VOUS");
        tracerLigne([
            new google.maps.LatLng(latitude, longitude),
            new google.maps.LatLng((poste[0].latitude), (poste[0].longitude))
        ]);
        poste[0].distance = distanceEntreCoordonnees(latitude, longitude, (poste[0].latitude), (poste[0].longitude))
        maj_informations(poste[0]);
      } else {
        console.log('OK');
      }
    });
  
    xhr.addEventListener("error", function(event) {
      console.error('Une erreur s\'est produite :', event);
    });
  
    xhr.open("POST", "../traitement/traitement.php");
    xhr.send(formData);
}

//creer le marker
function createMarker(location, titre) {
    const marker = new google.maps.Marker({
        position: location,
        draggable: true,
        label: {
            text: titre,
            fontWeight: "bold",
            fontSize: "14px",
            color: "white",
            background: "#3366FF", // Couleur de fond du label (par exemple : bleu)
            padding: "6px 12px",
            borderRadius: "6px"
        },
        icon: {
            path: google.maps.SymbolPath.CIRCLE, // Forme de l'icône (cercle)
            scale: 10, // Taille de l'icône
            fillColor: "#3366FF", // Couleur de remplissage de l'icône (par exemple : bleu)
            fillOpacity: 1, // Opacité de remplissage de l'icône (valeur entre 0 et 1)
            strokeWeight: 1, // Épaisseur de la bordure de l'icône
            strokeColor: "#3366FF" // Couleur de la bordure de l'icône (par exemple : bleu)
        },
        map: carte
    });
}
function tracerLigne(liste) {
    const traceLigne = new google.maps.Polyline({
        path: liste, // Chemin du tracé
        geodesic: true, // Tracé géodésique pour suivre les courbures de la Terre
        strokeColor: "#3366FF", // Couleur du tracé (par exemple : bleu)
        strokeOpacity: 0.8, // Opacité du tracé (valeur entre 0 et 1)
        strokeWeight: 4, // Épaisseur du tracé (en pixels)
        icons: [{
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Symbole utilisé pour les extrémités de la ligne (flèche fermée)
                scale: 4, // Taille du symbole
                strokeWeight: 2, // Épaisseur de la ligne du symbole
                fillColor: "#3366FF", // Couleur de remplissage du symbole
                fillOpacity: 0.8 // Opacité du remplissage du symbole
            },
            offset: "100%", // Position de l'icône (100% pour la fin de la ligne)
            repeat: "50px" // Espacement entre les icônes de la ligne
        }]
    });
    traceLigne.setMap(carte);
}

function distanceEntreCoordonnees(lat1, lon1, lat2, lon2) {
    var rayonTerre = 6371; // Rayon moyen de la Terre en kilomètres

    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var distance = rayonTerre * c;
    return distance;
}
 // charge la fonction initialize lorsque la fenêtre a fini de charger