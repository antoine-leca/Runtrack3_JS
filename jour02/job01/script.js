let nouvelArticle = document.createElement("article");
nouvelArticle.textContent = "La vie a beaucoup plus d'imagination que nous";
nouvelArticle.setAttribute("id", "citation");
document.bodyappendChild(nouveauBtn);

let nouveauBtn = document.createElement("button");
nouveauBtn.setAttribute("id", "button");
document.body.appendChild(nouveauBtn);

let artText = document.getElementById("citation");
let artBtn = document.getElementById("button");
function citation() {
    artBtn.addEventListener("click", function() {
        console.log(artText.textContent);
    });
}

citation();