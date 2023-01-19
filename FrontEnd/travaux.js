async function fetchWorks () {
    const reponse = await fetch ('http://localhost:5678/api/works');
    if (reponse.ok === true) {
        return reponse.json();
    }
    throw new Error ('Connnexion impossible..')
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

fetchWorks().then(works => genererTravaux(works));