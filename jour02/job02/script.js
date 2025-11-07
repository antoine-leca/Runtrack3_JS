let nouvelArt = document.createElement("article");
nouvelArt.textContent = "L'important n'est pas la chute, mais l'atterrissage";
nouvelArt.setAttribute("id", "citation");
nouvelArt.style.display = "none";
document.body.appendChild(nouvelArt);

let nouveauBtn = document.createElement("button");
nouveauBtn.setAttribute("id", "button");
nouveauBtn.textContent = "Afficher/Masquer la citation"; 
document.body.appendChild(nouveauBtn);

let artText = document.getElementById("citation");
let artBtn = document.getElementById("button");

function showhide() {
    if (artText.style.display === "none") {
        artText.style.display = "block"; 
    } else {
        artText.style.display = "none"; 
    }
}

artBtn.addEventListener("click", showhide); 