let listCategory;
let listWork;

(async function listing() {
    //appel Api recup liste travauxj
    await fetch ('http://localhost:5678/api/works')
        .then(reponse => reponse.json())
        //tranfert de la reponse dans la variable global
        .then(data => {
            listWork = data; 
        })
        //apppel et transfer de la liste des catégories
        .then(async(cat) => {
            await fetch ('http://localhost:5678/api/categories')
        .then(reponse1 => reponse1.json())
        .then(data1 => {
            listCategory = data1;
            buttonFactory(listCategory, listWork);
        })
        .catch(error => console.log(error));
        })
        .catch(error => console.log(error));  
        
        //appel fonction test et génération des travaux
        afficheTest(listWork, listCategory);
        genererTravaux(listWork);        
})();



function afficheTest(work, cat){
    console.log(work);
    console.log(cat);
}

function genererTravaux(travaux){
    
    for(let i=0; i<=travaux.length; i++){

        //recup du travaux en cour de traitement par la boucle
        const article = travaux[i];
        //recup de l'emplacement des travaux
        const sectionGallery = document.querySelector(".gallery");
        //création du conteneur général des travaux
        const travauxElement = document.createElement("figure");
        //création des balises et attribution des valeurs associés
        const imgElement = document.createElement("img");
        imgElement.src = article.imageUrl;
        imgElement.setAttribute("crossorigin", "anonymous");
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = article.title;

        //attachement au DOM
        sectionGallery.appendChild(travauxElement);
        travauxElement.appendChild(imgElement);
        travauxElement.appendChild(titreElement);
    }
}

function buttonFactory(listeCategories, listeTravaux) {

    console.log(listeCategories);
    console.log(listeTravaux);
    
    //création du bouton 'tous'
    const conteneurBtns = document.querySelector('#filtres');
    const btnTous = document.createElement('button');
    btnTous.id = "resetButton";
    btnTous.innerText = "Tous";
    conteneurBtns.appendChild(btnTous);

    conteneurBtns.addEventListener("click", (e) => {

        console.log("yo ma biche !");
        const idButton = e.target.id;
        console.log(idButton);

        if (idButton === "1") {
            console.log("Bon ça va les log un peu ??!")
            const listeObjets = listeTravaux.filter(objet => objet.categoryId === 1);
            console.log(listeObjets);
            document.querySelector('.gallery').innerHTML = "";
            genererTravaux(listeObjets);
        } else if (idButton === "2") {
            const listeAppart = listeTravaux.filter(appart => appart.categoryId === 2);
            document.querySelector('.gallery').innerHTML = "";
            genererTravaux(listeAppart);
        } else if (idButton === "3"){
            const listeHotels = listeTravaux.filter(hotel => hotel.categoryId === 3);
            console.log(listeHotels);
            document.querySelector('.gallery').innerHTML = "";
            genererTravaux(listeHotels);
        } else if (idButton === "resetButton"){
            document.querySelector('.gallery').innerHTML = "";
            genererTravaux(listeTravaux);
        }
    });
    
    for (i = 0; i <= listeCategories.length; i++){

        const btnCat = document.createElement('button');
        btnCat.innerText = listeCategories[i].name;
        btnCat.id = listeCategories[i].id;
        conteneurBtns.appendChild(btnCat);
    }    
}



