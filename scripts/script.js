/*
    API Meteo utilisation de fetch
*/

/* La méthode fetch() c'est then then  => https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

fetch('https://jsonplaceholder.typicode.com/todos/1'), {method: "GET"}
    .then(response => response.json())
    .then(json => console.log(json))
*/

/*Premier contact avec l'API */

/* 1.Connection avec l'application via une clef PERSONNELLE
home.openweathermap.org/api_keys call API Ange... API Keys*/
const apiKey = "6f0d59dfcb080cd8495827d107606a39";

/* 2.Coordonnées de Liège cf.Google
Latitude: 50.6333, Longitude: 5.56667 50° 37′ 60″ Nord, 5° 34′ 0″ Est
*/
const latLiege = 50.6333;
const lonLiege = 5.56667;
const lang = "fr";
const counter = 40; // Les données météo de 7 appel à l'API



/* Connexion avec l'API via son URL : 
https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=50.6333&lon=5.56667&appid=6f0d59dfcb080cd8495827d107606a39&lang=fr&cnt=7
*/

// 3.API Call Remplacement des valeurs par leurs constantes attachées
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latLiege}&lon=${lonLiege}&appid=${apiKey}&lang=${lang}&cnt=${counter}`;
console.log(weatherUrl);

// 4.fetch

// fetch(weatherUrl)
//     .then((response) => response.json())
//     .then((response) => {
//     });

/*
Console.log(response);     retourne :
    Object
    city: {id: 2792414, name: 'Liège', coord: {…}, country: 'BE', population: 0, …}
    cnt:  7
    cod:  "200"   
    list: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}  
    message:  0
    [[Prototype]]:  Object  
*/

// --------
/* ----- Exemple avec Weather ------ */
// function fetchingDatas(){}

//function fetchingDatas then then
function fetchingDatas() {

    return fetch(weatherUrl).then((response) => {

        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json().then((error) => {
                console.log(error);
                throw new Error("Something went wrong - server-side");
            });
        }

    });
}

// async function 
async function displayDatas() {

    const calls = (await fetchingDatas()) || [];

    console.log(calls); // va me donner l'objet ► Object et je dois regarder dans la ► list puis dans l'élément ► 0 et là je trouverai le jour, la temp et les autres paramètres demandés

    const callList = calls.list; // pour avoir la list et boucler sur celle-ci
    console.log(callList); // pour 7 appels on aura bien  ► (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}] un tableau d'objet

    // pour chaque demande à l'API, call est la demande
    callList.forEach((call) => {
        const templateElement = document.importNode(document.querySelector('template').content, true);

    /* Le template en HTML
    <template>
        <div class="index">
            <p id="date">Date</p>
            <img src="" alt="">
            <p id="maxTemp">Max temp</p>
            <p id="minTemp">Min temp</p>
            <p id="winSpeed">Wind Speed</p>
            <p id="description">Description</p>
        </div>
    </template>
   */

        // Affichage : je vais récupérer les id de mon templateElement 
        //  dans  l' ▼ Object je prends  ▼ list:0:  ce qui correspond au  call
        
        templateElement.getElementById("date").textContent          = `Date : ${call.dt_txt}`;
        templateElement.getElementById("image").src = `https://openweathermap.org/img/wn/${call.weather[0].icon}@2x.png`; // voir sur le site
        templateElement.getElementById("maxTemp").textContent       = `MAX t°: ${Math.round(call.main.temp_max)}`;
        templateElement.getElementById("minTemp").textContent       = `Min t°: ${Math.round(call.main.temp_min)}`;
        templateElement.getElementById("winSpeed").textContent      = `Vitesse du vent : ${Math.round(call.wind.speed*3.6)} km/h`; // transformation m/s en km/h
        templateElement.getElementById("description").textContent   = call.weather[0].description; // ► weather:[{… }] est un TABLEAU


        const div = templateElement.getElementById("date").parentElement;
        div.setAttribute("id", `${index}`);

        // je crée l'objet dynamiquement 
        const listItemCreation = `<li id="${index}">${call.dt_txt.substring(5,7)}</li>`;

        // pour ne pas ECRASER je vais incrémenter
        list.innerHTML += listItemCreation;
        const listItem = document.getElementById
        listItem.innerText = "⚾";

        // on va ajouter un ad event listener sur la div qu'on veut montrer 
        
       

        
        document.addEventListener("click", (e) =>{
             console.log(e.target.id);
        });

       if (listItem.id != div.id) {
        return;
       }
       // list.appendChild(listItem);
        main.appendChild(templateElement);
    });

}
// Appel de la fonction
displayDatas();

next.addEventListener("click", () => {
    main.scrollLeft += main.clientWidth;
});

previous.addEventListener("click", () => {
    main.scrollLeft -= main.clientWidth;
});

// comparaison de la liste et de la div pour les class = "5"
console.log(list.children);


/* Mise en place d'un SLIDER */
// Evènement sur les boutons en fonctions de nombre de vue de carte
document.getElementById("previous").addEventListener("click", () => {

    // je vois autant de carte
    document.querySelector('main').scrollLeft -= 720;

})

document.getElementById("next").addEventListener("click", () => {

    // je retourne d'autant de carte
    document.querySelector('main').scrollLeft += 720;

});

document.addEventListener("click", (e) => {
    const buttonClickedId = e.target.id;
    console.log(buttonClickedId);
});



