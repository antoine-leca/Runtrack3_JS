let nouveauCom = document.createElement("p");
nouveauCom.textContent = 0;
nouveauCom.setAttribute("id", "compteur");
document.body.appendChild(nouveauCom);

let nouveauBtn = document.createElement("button");
nouveauBtn.setAttribute("id", "button");
nouveauBtn.textContent = "ajouter 1"; 
document.body.appendChild(nouveauBtn);

let comText = document.getElementById("compteur");
let comBtn = document.getElementById("button");

function addOne() {
    comBtn.addEventListener("click", function() {
        let nouvVal = parseInt(comText.textContent);
        comText.textContent = nouvVal+1;
    });
}

addOne(); 