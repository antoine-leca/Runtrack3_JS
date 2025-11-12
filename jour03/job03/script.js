let plateau = document.createElement("section");
plateau.setAttribute("class", "grid grid-cols-3 w-fit");
document.body.appendChild(plateau);

for (i=1; i<=8; i++) {
    let nouvelleImg = document.createElement("img");
    nouvelleImg.setAttribute("id", `img${i}`);
    nouvelleImg.setAttribute("src", `${i}.PNG`);
    nouvelleImg.setAttribute("draggable", "false");
    nouvelleImg.style.width = "150px";
    nouvelleImg.style.height = "150px";
    nouvelleImg.style.userSelect = "none";
    nouvelleImg.style.cursor = "pointer";
    plateau.appendChild(nouvelleImg);
}

let nouveauBtn = document.createElement("button");
nouveauBtn.setAttribute("id", "shuffle");
nouveauBtn.setAttribute("class", "btn btn-neutral uppercase mt-4");
nouveauBtn.textContent = "Mélanger";
document.body.appendChild(nouveauBtn);

shuffleBtn = document.querySelector("id", "shuffle");


