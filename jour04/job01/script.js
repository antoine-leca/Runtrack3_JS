let nouveauBtn = document.createElement("button");
nouveauBtn.setAttribute("id", "button");
nouveauBtn.setAttribute("class", "btn btn-neutral");
nouveauBtn.textContent = "Afficher la phrase";
document.body.appendChild(nouveauBtn);

let nouveauP = document.createElement("p");
nouveauP.textContent = "";
document.body.appendChild(nouveauP);

nouveauBtn.addEventListener("click", function() {
    fetch('expression.txt')
        .then(response => response.text())
        .then(data => {
            nouveauP.textContent = data;
        }
    )
})