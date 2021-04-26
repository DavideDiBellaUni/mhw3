
let c;
const qb = document.querySelector('#quote h3');
let section = document.querySelector('#quote');
qb.addEventListener('click',quoteDay);
let div = document.createElement('div');
    div.classList.add('motivational');
    div.classList.add('hidden');
    section.appendChild(div);

function quoteDay(event){
        let m = document.querySelector('.motivational');
        m.classList.remove('hidden');
        if(m !== null){
            m.innerHTML = '';
        }
    fetch('https://api.quotable.io/random').then(onResponse).then(onJson);
}
function onJson(json){

	c= encodeURIComponent(json.content);
    let hf= document.createElement('h1');
    hf.textContent = decodeURI(json.author);
    div.appendChild(hf);
    fetch('https://api.mymemory.translated.net/get?q=' + c + '&langpair=en|it&de=dibbi27@outlook.it').then(onResponse).then(onJsonTradotto);

}

function onResponse(response){
    return response.json();
}



function onJsonTradotto(json){
	console.log(json);
    let hf= document.createElement('h2');
    encodeURIComponent(json.responseData.translatedText);
    hf.textContent = decodeURI(json.responseData.translatedText);
    div.appendChild(hf);

}


// OAuth credentials --- NON SICURO!
const client_id= 'e6f75db7e0f5474fa2dc65fb7c1b54d1';
const client_secret = 'c33aeb4cf3c945cea830af9144b23e35';
// Dichiara variabile token
let token;

//Recupero token
fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: 'grant_type=client_credentials',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}).then(onTokenResponse).then(onTokenJson);



function onTokenResponse(response) {
    return response.json();
}

function onTokenJson(json) {
    // Imposta il token global
    token = json.access_token;
    console.log(token);
}


const bottone = document.querySelector("#cerca");
bottone.addEventListener('click', search);

//funzione ricerca
function search(event) {
    event.preventDefault();

    //mi prendo il nome della traccia
    const track = encodeURIComponent(document.getElementById("track").value);
    console.log("Cerco: " + track);

    //adesso mi ricavo l'api di ricerca
    rest_url = "https://api.spotify.com/v1/search?q=";
    console.log("Cerco in: " + rest_url + track /*+ "&type=track&market=IT"*/ );
    fetch(rest_url + track + "&type=track&market=IT", {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(onResponse).then(onJsonSpotify);

}


function onResponse(response) {
    console.log("l'API ha tornato un responso positivo");
    return response.json();
}

const ContenitoreTrack = document.getElementById("MusicContainer");
function onJsonSpotify(json) {
    console.log(json);

    //azzero la lista 
    ContenitoreTrack.innerHTML = "";
    const risultati = json.tracks.items;
    if (risultati == null) {
        console.log(risultati);
    }
    let numeroRis = json.tracks.total;
    console.log("ho trovato " + numeroRis + " risultati");

    if (numeroRis > 10) {
        numeroRis = 10;
    }
    for (let i = 0; i < numeroRis; i++) {


       let frame = document.createElement('iframe');
       console.log(risultati[i].id);
       frame.setAttribute('src',"https://open.spotify.com/embed/track/"+ risultati[i].id);
       frame.setAttribute('width',"300");
       frame.setAttribute('height',"380");
       frame.setAttribute('frameborder',"0");
       frame.setAttribute('allowtransparency',"true");
       frame.setAttribute('allow',"encrypted-media");
       ContenitoreTrack.appendChild(frame);
     


    }
}