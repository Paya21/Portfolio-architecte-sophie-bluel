let listCategory;
let listWork;

(async function listing() {
    //appel Api recup liste travauxj
    await fetch('http://localhost:5678/api/works')
        .then(reponse => reponse.json())
        //tranfert de la reponse dans la variable global
        .then(data => {
            listWork = data;
        })
        //apppel et transfer de la liste des catégories
        .then(async (cat) => {
            await fetch('http://localhost:5678/api/categories')
                .then(reponse1 => reponse1.json())
                .then(data1 => {
                    listCategory = data1;
                    buttonFactory(listCategory, listWork);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));

    //appel fonction génération des travaux

    genererTravaux(listWork);
})();

//ajout du listener pour modal ajout travaux et verif sur click bouton
document.addEventListener('click', (e) => {
    if (e.target.id === "ajout") {
        modalAjout();
    }
})

function galeryModalHome() {
    //création du header
    const headerTarget = document.querySelector('.header-modal');
    const headerTitle = document.createElement('p');
    headerTitle.innerText = "Galerie Photo";

    //création du btn ajout travaux et suppr galerie
    //ciblage
    const methodTarget = document.querySelector('.method-modal');
    //style method modal
    methodTarget.style.display = "flex";
    methodTarget.style.flexDirection = "column";
    methodTarget.style.alignItems = "center";
    methodTarget.style.borderTop = "1px solid #b3b3b3";
    methodTarget.style.marginTop = "60px";
    methodTarget.style.paddingTop = "50px";
    //bouton ajout
    const btnAjout = document.createElement('button');
    btnAjout.id = "ajout";
    btnAjout.classList.add('ajout');
    btnAjout.innerText = "Ajouter une photo";
    //bouton suppr
    const btnSuppr = document.createElement('button');
    btnSuppr.classList.add('suppression');
    btnSuppr.innerText = "Supprimer la galerie";
    //ajout de la méthode de suppression
    btnSuppr.addEventListener('click', async function () {
        document.querySelector(".gallery").innerHTML = "";
        document.querySelector(".picturesPlacement").innerHTML = "";
    })


    //ajou au DOM
    headerTarget.appendChild(headerTitle);
    methodTarget.appendChild(btnAjout);
    methodTarget.appendChild(btnSuppr);
};



function galeryModalItem(article) {

    //création contenu modal
    const targetItem = document.querySelector('.picturesPlacement');
    const modalElement = document.createElement('figure');
    const divBtnImage = document.createElement('div');
    divBtnImage.classList.add('div-image');
    const modalImg = document.createElement('img');
    modalImg.classList.add('imgModal1');
    modalImg.src = article.imageUrl;
    const modalFullScreenUnit = document.createElement('button');
    modalFullScreenUnit.classList.add('btn-full-screen');
    const modalFullScreenIcon = document.createElement('i');
    modalFullScreenIcon.classList.add('fa-solid');
    modalFullScreenIcon.classList.add('fa-arrows-up-down-left-right');
    modalSupprUnit = document.createElement('button');
    modalSupprUnit.classList.add('bouton-trash');
    modalSupprIcon = document.createElement('i');
    modalSupprIcon.classList.add('fa-solid');
    modalSupprIcon.classList.add('fa-trash-can');
    modalImg.setAttribute("crossorigin", "anonymous");
    const modalTxt = document.createElement("figcaption");
    modalTxt.innerText = "éditer";
    modalSupprUnit.addEventListener('click', async (e) => {
        //fetch pour suppr une item
        await fetch(`http://localhost:5678/api/works/${article.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem('TokenAuth')
            },
            body: article.id
        }).then(() => {
            const modalReload = document.querySelector('.modal-wrapper');
            modalReload.innerHTML='';
            const IconReload = document.createElement('div');
            IconReload.classList.add('icons-modal');
            
            const backBtn = document.createElement('button');
            backBtn.classList.add('modal-back')
            backBtn.style.visibility = "hidden"
            const backIcon = document.createElement('i')
            backIcon.classList.add('fa-solid')
            backIcon.classList.add('fa-arrow-left')
            backBtn.appendChild(backIcon)
            IconReload.appendChild(backBtn)

            const closeBtn = document.createElement('button');
            closeBtn.addEventListener('click', () => {
                modal.style.display = "none";
                modal.setAttribute('aria-hidden', 'true');
                modal.removeAttribute('aria-modal');
            })
            closeBtn.classList.add('modal-close')
            const closeIcon = document.createElement('i')
            closeIcon.classList.add('fa-solid')
            closeIcon.classList.add('fa-xmark')
            closeBtn.appendChild(closeIcon)
            IconReload.appendChild(closeBtn)

            const headerReload = document.createElement('div')
            headerReload.classList.add('header-modal')

            const formReload = document.createElement('div')
            formReload.classList.add('formModal')
            const picReload = document.createElement('div')
            picReload.classList.add('picturesPlacement')
            const methodReload = document.createElement('div')
            methodReload.classList.add('method-modal')
            formReload.appendChild(picReload)
            formReload.appendChild(methodReload)

            modalReload.appendChild(IconReload);
            modalReload.appendChild(headerReload);
            modalReload.appendChild(formReload);


        fetch('http://localhost:5678/api/works')
        .then(reponse => reponse.json())
        //tranfert de la reponse dans la variable global
        .then(data => {
            genererTravaux(data)
        })
        });

        // location.reload();
    })
    modalSupprUnit.appendChild(modalSupprIcon);
    modalFullScreenUnit.appendChild(modalFullScreenIcon);
    divBtnImage.appendChild(modalFullScreenUnit);
    divBtnImage.appendChild(modalSupprUnit);
    divBtnImage.appendChild(modalImg);
    modalElement.appendChild(divBtnImage)
    modalElement.appendChild(modalTxt);
    targetItem.appendChild(modalElement);
}

function genererTravaux(travaux) {

    galeryModalHome();

    document.querySelector('.gallery').innerHTML='';

    for (let i = 0; i < travaux.length; i++) {

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

        if (sessionStorage.getItem('TokenAuth')){
            galeryModalItem(article)
        }
    }

    
}


function buttonFactory(listeCategories, listeTravaux) {

    //création du bouton 'tous'
    if (!sessionStorage.getItem('TokenAuth')) {
        const conteneurBtns = document.querySelector('#filtres');
        const btnTous = document.createElement('button');
        btnTous.id = "resetButton";
        btnTous.type = "button";
        btnTous.innerText = "Tous";
        conteneurBtns.appendChild(btnTous);


        conteneurBtns.addEventListener("click", (e) => {

            const idButton = e.target.id;

            if (idButton === "1") {
                const listeObjets = listeTravaux.filter(objet => objet.categoryId === 1);
                document.querySelector('.gallery').innerHTML = "";
                genererTravaux(listeObjets);
            } else if (idButton === "2") {
                const listeAppart = listeTravaux.filter(appart => appart.categoryId === 2);
                document.querySelector('.gallery').innerHTML = "";
                genererTravaux(listeAppart);
            } else if (idButton === "3") {
                const listeHotels = listeTravaux.filter(hotel => hotel.categoryId === 3);
                document.querySelector('.gallery').innerHTML = "";
                genererTravaux(listeHotels);
            } else if (idButton === "resetButton") {
                document.querySelector('.gallery').innerHTML = "";
                genererTravaux(listeTravaux);
            }
        });


        for (i = 0; i <= listeCategories.length; i++) {
            const btnCat = document.createElement('button');
            btnCat.innerText = listeCategories[i].name;
            btnCat.type = "button";
            btnCat.id = listeCategories[i].id;
            conteneurBtns.appendChild(btnCat);
        }
    }
}

//génération page une fois connecté
if (sessionStorage.getItem('TokenAuth')) {

    elementSimuLogOut = document.querySelector('.logOutIfIn');
    elementSimuLogOut.innerText = "logout";

    const modifArchitect = document.querySelector('.sophie');
    const divModifArchi = document.createElement('div');
    divModifArchi.classList.add('modif-archi');
    const logoModifArchi = document.createElement('i');
    logoModifArchi.classList.add('fa-regular');
    logoModifArchi.classList.add('fa-pen-to-square');
    const txtModifArchi = document.createElement('p');
    txtModifArchi.innerText = "Modifier";
    divModifArchi.appendChild(logoModifArchi);
    divModifArchi.appendChild(txtModifArchi);
    modifArchitect.appendChild(divModifArchi);

    const bandeNoir = document.querySelector('.bandeNoir');
    bandeNoir.style.display = "";
    bandeNoir.style.backgroundColor = "black";
    const txtBandeNoir = document.createElement('p');
    txtBandeNoir.innerText = "Mode édition";
    const divBandeNoir = document.createElement('button');
    divBandeNoir.innerText = "Publier les changements";
    const logoBandeNoir = document.createElement('i');
    logoBandeNoir.classList.add('fa-regular');
    logoBandeNoir.classList.add('fa-pen-to-square');
    logoBandeNoir.style.color = "white";
    logoBandeNoir.style.marginRight = "10px"
    bandeNoir.appendChild(logoBandeNoir);
    bandeNoir.appendChild(txtBandeNoir);
    bandeNoir.appendChild(divBandeNoir);

    const modifBouton = document.querySelector('.titrePorto');
    boutonModif = document.createElement("a");
    boutonModif.innerText = "Modifier";
    boutonModif.href = "#modal";
    boutonModif.classList.add('bouton-modif');
    const logoBoutonModif = document.createElement('i');
    logoBoutonModif.classList.add('fa-regular');
    logoBoutonModif.classList.add('fa-pen-to-square');
    logoBoutonModif.classList.add('logo-bouton-modif');
    const divBoutonModif = document.createElement('div');
    divBoutonModif.classList.add('div-bouton-modif');
    divBoutonModif.appendChild(logoBoutonModif);
    divBoutonModif.appendChild(boutonModif);
    modifBouton.appendChild(divBoutonModif);

    let modal = null;

    boutonModif.addEventListener('click', e => {

        e.preventDefault();
        //ouverture
        const target = document.querySelector(e.target.getAttribute('href'));
        target.style.display = null;
        target.setAttribute('aria-hidden', 'false');
        target.setAttribute('aria-modal', 'true');
        //fermeture
        modal = target;

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
    })

    document.addEventListener('click', (e) => {
        if (e.target.id === "modal") {
            closeModal();
        }
    })

    const closeModal = function () {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
    }
}



// const btnAjout = document.querySelector('.ajout');
async function modalAjout() {

    const targetModalSuppr1 = document.querySelector('.header-modal');
    const targetModalSuppr2 = document.querySelector('.picturesPlacement');
    const targetModalSuppr3 = document.querySelector('.method-modal');
    targetModalSuppr1.innerHTML = '';
    targetModalSuppr2.innerHTML = '';
    targetModalSuppr3.innerHTML = '';

    const retourGalleryModal = document.querySelector('.fa-arrow-left')

    retourGalleryModal.style.visibility = "visible";
    retourGalleryModal.addEventListener('click', async (e) => {

        e.stopImmediatePropagation();

        const headerClean = document.querySelector('.header-modal');
        headerClean.innerHTML = "";
        document.querySelector('.method-modal').innerText = "";
        document.querySelector('.picturesPlacement').innerHTML = "";
        retourGalleryModal.style.visibility = "hidden";

        const items = await fetch('http://localhost:5678/api/works');
        const repItems = await items.json();
        for (let i = 0; i < repItems.length; i++) {
            const article = repItems[i]
            //création contenu modal
            const targetItem = document.querySelector('.picturesPlacement');
            const modalElement = document.createElement('figure');
            const divBtnImage = document.createElement('div');
            divBtnImage.classList.add('div-image');
            const modalImg = document.createElement('img');
            modalImg.classList.add('imgModal1');
            modalImg.src = article.imageUrl;
            const modalFullScreenUnit = document.createElement('button');
            modalFullScreenUnit.classList.add('btn-full-screen');
            const modalFullScreenIcon = document.createElement('i');
            modalFullScreenIcon.classList.add('fa-solid');
            modalFullScreenIcon.classList.add('fa-arrows-up-down-left-right');
            modalSupprUnit = document.createElement('button');
            modalSupprUnit.classList.add('bouton-trash');
            modalSupprIcon = document.createElement('i');
            modalSupprIcon.classList.add('fa-solid');
            modalSupprIcon.classList.add('fa-trash-can');
            modalImg.setAttribute("crossorigin", "anonymous");
            const modalTxt = document.createElement("figcaption");
            modalTxt.innerText = "éditer";
            modalSupprUnit.addEventListener('click', async (e) => {
                //fetch pour suppr une item
                await fetch(`http://localhost:5678/api/works/${repItems[i].id}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem('TokenAuth')
                    },
                    // body: travaux[i].id
                }).then((res) => console.log(res));

                location.reload();
            })
            modalSupprUnit.appendChild(modalSupprIcon);
            modalFullScreenUnit.appendChild(modalFullScreenIcon);
            divBtnImage.appendChild(modalFullScreenUnit);
            divBtnImage.appendChild(modalSupprUnit);
            divBtnImage.appendChild(modalImg);
            modalElement.appendChild(divBtnImage)
            modalElement.appendChild(modalTxt);
            targetItem.appendChild(modalElement);
        }
        galeryModalHome();

    })

    const targetTitreModal = document.querySelector('.header-modal');
    const titreModal = document.createElement('p');
    titreModal.innerText = "Ajout photo";
    targetTitreModal.appendChild(titreModal);

    const formModalTarget = document.querySelector('.method-modal');
    document.querySelector('.method-modal').style.display = null;
    document.querySelector('.method-modal').style.borderTop = "";
    formModalTarget.style.marginTop = "";
    formModalTarget.style.paddingTop = "";
    const formModal = document.createElement('form');
    formModal.classList.add('form-modal');
    formModal.id = "formModal";
    formModalTarget.appendChild(formModal);

    const ajoutTravauxTarget = document.querySelector('.form-modal');

    const divInputPhoto = document.createElement('div');
    divInputPhoto.classList.add('div-input-photo');

    const btnChoixPhoto = document.createElement('input');
    btnChoixPhoto.classList.add('inputPhoto');
    btnChoixPhoto.type = 'file';
    btnChoixPhoto.name = 'image';
    btnChoixPhoto.accept = "image/png, image/jpeg";
    btnChoixPhoto.id = "btnChoixPhoto";
    btnChoixPhoto.style.visibility = "hidden";
    btnChoixPhoto.style.height = "1px";

    btnChoixPhoto.addEventListener('change', (e) => {
        const target = document.querySelector('.div-input-photo');
        target.innerHTML = "";
        const imgPreview = document.createElement('img');
        target.appendChild(imgPreview);
        const file = e.target.files[0];
        console.log(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            imgPreview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    })

    const fileInputTarget = document.querySelector('#btnChoixPhoto');
    const btnChoixPhoto2 = document.createElement('button');
    btnChoixPhoto2.innerText = "+ Ajouter photo";
    btnChoixPhoto2.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#btnChoixPhoto').click();
    })


    const tailleMax = document.createElement('p');
    tailleMax.innerText = "jpg,png: 4Mo max";

    const logoPreview = document.createElement('i');
    logoPreview.classList.add('fa-regular');
    logoPreview.classList.add('fa-image');

    const titrePhoto = document.createElement('input');
    titrePhoto.type = 'text';
    titrePhoto.name = 'title';

    const menuCategories = document.createElement('select');
    menuCategories.name = 'category'
    await fetch('http://localhost:5678/api/categories')
        .then(rep1 => rep1.json())
        .then(rep2 => {
            for (i = 0; i < rep2.length; i++) {
                const cat = document.createElement('option');
                cat.innerText = rep2[i].name;
                cat.value = rep2[i].id;
                menuCategories.appendChild(cat);
            }
        })
        .catch(error => console.log(error));

    const divSubmitForm = document.createElement('div');
    divSubmitForm.classList.add('div-submit-form');
    const btnValider = document.createElement('button');
    btnValider.classList.add('form-submit');
    btnValider.innerText = "Valider";

    const divTitreCat = document.createElement('div');
    divTitreCat.classList.add('divTitreCategory');
    const titreSectionTitre = document.createElement('p');
    const titreSectionCat = document.createElement('p');
    titreSectionTitre.innerText = "Titre";
    titreSectionCat.innerText = "Catégorie";

    // const divError = document.createElement;
    // divError.id = "ErrorForm";
    // document.querySelector('.modal-wrapper').appendChild(divError);

    formModal.appendChild(btnChoixPhoto);
    divInputPhoto.appendChild(logoPreview);
    divInputPhoto.appendChild(btnChoixPhoto2);
    divInputPhoto.appendChild(tailleMax);
    ajoutTravauxTarget.appendChild(divInputPhoto);
    divTitreCat.appendChild(titreSectionTitre);
    divTitreCat.appendChild(titrePhoto);
    divTitreCat.appendChild(titreSectionCat);
    divTitreCat.appendChild(menuCategories);
    ajoutTravauxTarget.appendChild(divTitreCat);
    divSubmitForm.appendChild(btnValider);
    ajoutTravauxTarget.appendChild(divSubmitForm);


    formModal.addEventListener('submit', async (e) => {
        e.preventDefault();
        const targetErrorMsg = document.querySelector('.div-submit-form');
        const titleCheck = formModal.elements.item(1);
        const divErrorMsg = document.createElement('div');
        divErrorMsg.classList.add("div-error");
        targetErrorMsg.appendChild(divErrorMsg);
        const imageCheck = formModal.elements.item(0);
        const errorMsg = document.createElement('p');
        errorMsg.classList.add('error-msg');
        errorMsg.innerText = "";

        console.log(titleCheck.value);
        console.log(imageCheck.value);
        console.log(formModal.elements)
        var formData = new FormData(formModal);
        // console.log(formData);

        if (imageCheck.value === "") {
            errorMsg.innerText = "Selectionner une image";
            errorMsg.style.color = "red";
            divErrorMsg.appendChild(errorMsg);
        }

        if (imageCheck.value) {
            const titleCheck = formModal.elements.item(1);
            if (titleCheck.value === "") {
                if (document.querySelector('.error-msg')) {
                    document.querySelector('.div-error').removeChild(document.querySelector('.error-msg'));
                    const errorMsg = document.createElement('p');
                    errorMsg.innerText = "Titre nécessaire";
                    errorMsg.style.color = "red";
                    divErrorMsg.appendChild(errorMsg);
                } else {
                    const errorMsg = document.createElement('p');
                    errorMsg.innerText = "Titre nécessaire";
                    errorMsg.style.color = "red";
                    divErrorMsg.appendChild(errorMsg);
                }
            }
        }

        if (titleCheck.value && imageCheck.value) {

            await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + sessionStorage.getItem('TokenAuth')
                },
                body: formData,
            }).then((res) => {
                if (res.ok === true) {
                    if (document.querySelector('.error-msg')) {
                        document.querySelector('.div-error').removeChild(document.querySelector('.error-msg'));
                        const errorMsg = document.createElement('p');
                        errorMsg.innerText = "Télécharger avec succès";
                        errorMsg.style.color = "green";
                        divErrorMsg.appendChild(errorMsg);
                    } else {
                        const errorMsg = document.createElement('p');
                        errorMsg.innerText = "Télécharger avec succès";
                        errorMsg.style.color = "green";
                        divErrorMsg.appendChild(errorMsg); 
                    }
                   
                    document.querySelector('.gallery').innerHTML='';
                    fetch('http://localhost:5678/api/works')
                    .then(reponse => reponse.json())
                    //tranfert de la reponse dans la variable global
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {

                            //recup du travaux en cour de traitement par la boucle
                            const article = data[i];
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
                    })
                
                }
            })
        }
    })
}



