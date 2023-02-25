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
            console.log(data1);
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

        if(sessionStorage.getItem('TokenAuth')){
            const targetModal = document.querySelector('.picturesPlacement');
            const modalElement = document.createElement('figure');
            const modalImg = document.createElement('img');
            modalImg.src = article.imageUrl;
            modalImg.setAttribute("crossorigin", "anonymous");
            const modalTxt =  document.createElement("figcaption");
            modalTxt.innerText = "éditer";
            modalElement.appendChild(modalImg);
            modalElement.appendChild(modalTxt);
            targetModal.appendChild(modalElement);
        }

        const btnSuppr = document.querySelector('.suppression');
        btnSuppr.addEventListener('click', async function(){
            console.log("oui ?");
            document.querySelector(".gallery").innerHTML = "";
        })
    }
}

function buttonFactory(listeCategories, listeTravaux) {

    console.log(listeCategories);
    console.log(listeTravaux);
    
    //création du bouton 'tous'
    if (!sessionStorage.getItem('TokenAuth')){
    const conteneurBtns = document.querySelector('#filtres');
    const btnTous = document.createElement('button');
    btnTous.id = "resetButton";
    btnTous.type = "button";
    btnTous.innerText = "Tous";
    conteneurBtns.appendChild(btnTous);
    

    conteneurBtns.addEventListener("click", (e) => {

        const idButton = e.target.id;
        
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
        btnCat.type = "button";
        btnCat.id = listeCategories[i].id;
        conteneurBtns.appendChild(btnCat);
    }  
  }
}

if(sessionStorage.getItem('TokenAuth')){
    console.log("allleyyy");
    elementSimuLogOut = document.querySelector('.logOutIfIn');
    elementSimuLogOut.innerText = "logout";
    
    const bandeNoir = document.querySelector('.bandeNoir');
    bandeNoir.style.backgroundColor = "black";
    const txtBandeNoir = document.createElement('p');
    txtBandeNoir.innerText = "Mode édition";
    const divBandeNoir = document.createElement('button');
    divBandeNoir.innerText = "Publier les changements";
    bandeNoir.appendChild(txtBandeNoir);
    bandeNoir.appendChild(divBandeNoir);

    const modifBouton = document.querySelector('.titrePorto');
    boutonModif = document.createElement("a");
    boutonModif.innerText ="Modifier";
    boutonModif.href = "#modal";
    modifBouton.appendChild(boutonModif);

    let modal = null;

    boutonModif.addEventListener('click', e => {
        console.log('ha bah oui dis donc');
        e.preventDefault();
        //ouverture
        const target = document.querySelector(e.target.getAttribute('href'));
        console.log(target);
        target.style.display = null;
        target.setAttribute('aria-hidden', 'false');
        target.setAttribute('aria-modal', 'true');
        //fermeture
        modal = target;
        console.log(modal);
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        
    })

    const closeModal = function (){
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
    }
} 

(function ajoutPhoto(){
    const btnAjout = document.querySelector('.ajout');
    btnAjout.addEventListener('click', async function modalAjout(){

        const targetModalSuppr1 = document.querySelector('.header-modal');
        const targetModalSuppr2 = document.querySelector('.picturesPlacement');
        const targetModalSuppr3 = document.querySelector('.method-modal');
        targetModalSuppr1.innerHTML = '';
        targetModalSuppr2.innerHTML = '';
        targetModalSuppr3.innerHTML = '';

        

        document.querySelector('.fa-arrow-left').style.visibility = "visible";


        // const targetFormModal = document.querySelector('.icons-modal');
        // const divFormModal = documment.createElement('div');
        // const formModal = document.createElement('form');
        // formModal.innerText = "yoyoyoyo";
        // divFormModal.appendChild(formModal);
        // targetFormModal.appendChild(divFormModal);

        const targetTitreModal = document.querySelector('.header-modal');
        const titreModal = document.createElement('p');
        titreModal.innerText = "Ajout photo";
        targetTitreModal.appendChild(titreModal);

        const formModalTarget = document.querySelector('.method-modal');
        const formModal = document.createElement('form');
        formModal.classList.add('form-modal');
        formModal.id = "formModal";
        formModalTarget.appendChild(formModal);

        const ajoutTravauxTarget = document.querySelector('.form-modal');
        const btnChoixPhoto = document.createElement('input');
        btnChoixPhoto.type = 'file';
        btnChoixPhoto.name = 'photo';
        const titrePhoto = document.createElement('input');
        titrePhoto.type = 'text';
        titrePhoto.name = 'titre';

        const menuCategories = document.createElement('select');
        menuCategories.name = 'categorie'
        await fetch ('http://localhost:5678/api/categories')
            .then (rep1 => rep1.json())
            .then (rep2 => {
                for(i = 0; i < rep2.length; i++){
                    const cat = document.createElement('option');
                    cat.innerText = rep2[i].name;
                    cat.id = rep2[i].id;
                    menuCategories.appendChild(cat);
                }
            })
            .catch(error => console.log(error));

        const btnValider = document.createElement('button');
        btnValider.innerText = "Valider";

        ajoutTravauxTarget.appendChild(btnChoixPhoto);
        ajoutTravauxTarget.appendChild(titrePhoto);
        ajoutTravauxTarget.appendChild(menuCategories);
        ajoutTravauxTarget.appendChild(btnValider);
        
        formModal.addEventListener('submit', async (e) => {
            e.preventDefault();
            var formData = new FormData(formModal);
            
            let catNum;
            if (formData.get('categorie') == 'Objets'){
                catNum = 1;
            } else if(formData.get('categorie') == 'Appartements'){
                catNum = 2;
            } else if(formData.get('categorie') == 'Hotels & restaurants'){
                catNum = 3;
            }

            await fetch('http://localhost:5678/api/works'), {
                method: 'POST',
                headers: {
                    "Accept": "multipart/form-data",
                    "Content-Type": "multipart/form-data",
                    "Authorization": sessionStorage.getItem('TokenAuth')
                },
                body: JSON.stringify({
                   "image": formData.get('photo'),
                   "title": formData.get('titre'),
                   "category": catNum
                })
            }
            
        })
    })
})();

