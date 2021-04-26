
let contenitore=document.querySelector(' section .contenitore');
let sezioni=['sezione1','sezione2','sezione3','sezione4'];
const ricerca = document.getElementById('searchTab');
let immagini=[];
let titoli=[];
let classe=[];
let favourites= [];


for(let content of contents){
    immagini.push(content.immagine);
    titoli.push(content.titolo_sezione);
    classe.push(content.classe);
}

let i=0;
for (sezione of sezioni){
        sezione=document.createElement('div');
        sezione.classList.add('sezione');
        sezione.setAttribute('id',classe[i]);
        let interno=document.createElement('div');
        interno.classList.add('interno');
        interno.setAttribute('data-index',i+1);
        let immagine=document.createElement('img');
        let preferiti= document.createElement('img');
        preferiti.classList.add('favourites');
        preferiti.src='add_favourite.png';
        preferiti.setAttribute('data-switch','off');
        let titolo=document.createElement('h3');
        immagine.src=immagini[i];
        contenitore.appendChild(sezione);
       
        sezione.appendChild(interno);
        interno.appendChild(immagine);
        interno.appendChild(preferiti);
        titolo.textContent=titoli[i];
        interno.appendChild(titolo);
        let paragrafo=document.createElement('p');
        paragrafo.textContent='mostra dettagli';
        paragrafo.addEventListener("click",mostraDettagli);
        preferiti.addEventListener("click",Favourites);
        interno.appendChild(paragrafo);


        i=i+1;
}

const contenitorep= document.querySelector('#searchTab .contenitore');
let k=0;
for (sezione of sezioni){
    
    sezione=document.createElement('div');
    sezione.classList.add('sezione');
    sezione.setAttribute('id',classe[k]);
    let interno=document.createElement('div');
    interno.classList.add('interno');
    interno.setAttribute('data-index',k+1);
    let immagine=document.createElement('img');
    
    preferiti.setAttribute('data-switch','off');
    let titolo=document.createElement('h3');
    immagine.src=immagini[k];
    
    contenitorep.appendChild(sezione);
   
    sezione.appendChild(interno);
    interno.appendChild(immagine);
   
    titolo.textContent=titoli[k];
    interno.appendChild(titolo);
    let paragrafo=document.createElement('p');
    paragrafo.textContent='mostra dettagli';
    paragrafo.addEventListener("click",mostraDettagli);
    
    interno.appendChild(paragrafo);


    k=k+1;
}

function mostraDettagli(event){
    const p =event.currentTarget;
    const pn = p.parentNode;
    
    const nsezione=pn.dataset.index;
    if(p.textContent==='mostra dettagli'){
       
        p.textContent='mostra meno dettagli';
        const descrizione=document.createElement('p');
        pn.appendChild(descrizione);
        descrizione.textContent=contents[nsezione-1].descrizione;

        if(nsezione==="3"){
            let quote = document.querySelector('.hidden1');
            quote.classList.remove('hidden1');
            quote.classList.add('ArtContainer');
        }
        if(nsezione==="4"){
            let quote = document.querySelector('.hidden2');
            quote.classList.remove('hidden2');
            quote.classList.add('SpotifAPI');
        }

    }else{
       
        p.textContent='mostra dettagli';
        pn.lastChild.remove();
        if(nsezione==="3"){
            let quote = document.querySelector('.ArtContainer');
            quote.classList.add('hidden1');
            quote.classList.remove('ArtContainer');
        }

       if(nsezione==="4"){
            let quote = document.querySelector('.SpotifAPI');
            quote.classList.add('hidden2');
            quote.classList.remove('SpotifAPI');
        }
    }
}

function Favourites(event){
    const p= event.currentTarget;
    const pn = p.parentNode;
    const nsezione = pn.dataset.index;
    
    if( p.dataset.switch === 'off'){
        p.dataset.switch = "on" ;

    favourites.push(pn);

        
    let conte = document.querySelector('#preferiti .contenitore');

    let sezione = document.createElement('div');
    sezione.classList.add('sezione');
    sezione.setAttribute('id',contents[nsezione-1].classe);

    let interno = document.createElement('div');
    let txt = document.createElement('h3');
    txt.textContent = contents[nsezione-1].titolo_sezione;
    interno.classList.add('interno');
    interno.setAttribute("data-index",nsezione);
    conte.appendChild(sezione);
    sezione.appendChild(interno);

    let immagine=document.createElement('img');
    immagine.src=immagini[nsezione -1];
    interno.appendChild(immagine);

    let preferiti= document.createElement('img');
    preferiti.classList.add('favourites');
    preferiti.src='x.png';
    interno.appendChild(preferiti);
    
   preferiti.addEventListener('click',removeContent);

    interno.appendChild(txt);
    p.src= 'positive tic.png';
    
    if(favourites.length>0){
        console.log(favourites.length);
        let pref = document.getElementById('preferiti');
        pref.classList.remove("hidden");
    }
    } else{
        p.dataset.switch = 'off';
        let con = document.querySelector('#preferiti .contenitore');
        let interno = con.querySelector('#'+ pn.parentNode.id);
        interno.remove();
        favourites.pop();
       if(favourites.length===0){
            console.log(favourites.length);
            let pref = document.getElementById('preferiti');
            pref.classList.add("hidden");
        }
        
        p.src='add_favourite.png';
    }




}

function removeContent(event){
    const p= event.currentTarget;
    const pn = p.parentNode;
    const sec = document.querySelector('section .contenitore');
   let sic = sec.querySelector('#'+ pn.parentNode.id);
   let interno2 = sic.firstChild; 
   let logo = interno2.querySelector('.favourites');
   logo.src = 'add_favourite.png';
    logo.dataset.switch = "off";
    let contenitore = document.querySelector('#preferiti .contenitore');
    let interno = contenitore.querySelector('#'+ pn.parentNode.id);
    console.log(interno);
    interno.remove();
    favourites.pop();
   if(favourites.length===0){
        console.log(favourites.length);
        let pref = document.getElementById('preferiti');
        pref.classList.add("hidden");
    }

    
    
}


const searchBar = document.getElementById('search');
searchBar.addEventListener('keyup',search);

function search(e){
    const str = e.currentTarget.value;
    const contenitorep = ricerca.querySelector('.contenitore');
    const section = document.querySelector('section');
 
    if(str === ''){
        ricerca.classList.add('hidden');
        section.classList.remove('hidden');
    }else{
        ricerca.classList.remove('hidden');
        contenitorep.classList.add('show');
        section.classList.add('hidden');
    }
    
    const box = document.querySelectorAll('#searchTab .sezione');
        for(b of box){
            let interno = b.querySelector('.interno');
            let h3 = interno.querySelector('h3');
            let titolo = h3.textContent;
            if(titolo.toLowerCase().indexOf(str.toLowerCase()) === -1){
                b.classList.add('hidden');
                
            } else{
                b.classList.remove('hidden');
            }
    }

}









