let listCategory;

//recup de tous les travaux
(async function fetchWorks () {
    await fetch ('http://localhost:5678/api/works')
        .then(works => works.json())
        .then(async (data) => {
            genererTravaux(data);
    })
    .catch(error => console.error(error));
})();

//recup des catégories de chaque travaux
(async function fetchCat () {
    await fetch ('http://localhost:5678/api/works')
        .then(works => works.json())
        .then(async (data) => {
            listCategory = data.map(data => data.category);
            buttonFactory(data);
    })
    .catch(error => console.error(error));
})();

//recup des catégories définies (3 catégories en tout)
(async function fetchWorksCategory() {
    await fetch ('http://localhost:5678/api/categories')
        .then(cat => cat.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
})();

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

function buttonFactory(listeCategories) {
    
    //création du bouton 'tous'
    const conteneurBtns = document.querySelector('#filtres');
    const btnTous = document.createElement('button');
    btnTous.innerText = "Tous";
    conteneurBtns.appendChild(btnTous);

    const catId = new Set(listCategory.map(idCategorie => idCategorie.name));
    console.log(catId);

}


buttonFactory();



