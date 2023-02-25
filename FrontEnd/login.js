let tokenSession;

const logueur = document.querySelector('.connexionForm');

logueur.addEventListener("submit", (e) => {

    e.preventDefault();

    let id;
    let mdp;

    const identifiant = document.querySelector('#email');
    const motDePasse = document.getElementById('mdp');

    id = identifiant.value;
    mdp = motDePasse.value;

    connect(id, mdp);
})

async function connect(idForm, mdpForm){

    const reponse = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": idForm,
            "password": mdpForm
          })
    })

    const tok = await reponse.json();
    tokenSession = tok.token;
    sessionStorage.setItem('TokenAuth', tokenSession);
    console.log(tokenSession);

    const target = document.querySelector(".errorPlacement");

    if(reponse.status == 200){
        window.location = "./index.html?token";     
    } else if (reponse.status == 404){
        target.innerHTML = "";
        const elementTarget = document.createElement("h2");
        elementTarget.innerText = "User not found";
        target.appendChild(elementTarget);
    } else if (reponse.status == 401){
        target.innerHTML = "";
        const elementTarget = document.createElement("h2");
        elementTarget.innerText = "Unauthorized";
        target.appendChild(elementTarget);
    }   
}
