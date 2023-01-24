(async function fetchWorks () {
    await fetch ('http://localhost:5678/api/works')
        .then(works => works.json())
        .then(async (data) => {
            genererTravaux(data);
            const rep = await (await fetch ('http://localhost:5678/api/categories')).json();
            console.log(rep);
    }).catch(error => console.error(error));
})();

async function fetchWorksCategory() {
    const rep = await fetch ('http://localhost:5678/api/categories');
    const liste = await rep.json();

    const listeCategory = liste.map(cat => cat.category);
    console.log(listeCategory);
    return listeCategory;
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



const boutonObjet = document.querySelector(".objet") 

boutonObjet.addEventListener("click", function(event){

    event.preventDefault();

    const setCat = new Set();
    fetchWorksCategory().then(cat => cat.id === 1 ? setCat.add(cat.id) : "");
    console.log(setCat);
});

fetchWorksCategory();


