const reponse = fetch("http://localhost:5678/api/works").then((travaux) => travaux.json());


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
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = article.title;

        //attachement au DOM
        sectionGallery.appendChild(travauxElement);
        travauxElement.appendChild(imgElement);
        travauxElement.appendChild(titreElement);
    }
}

genererTravaux(travaux);