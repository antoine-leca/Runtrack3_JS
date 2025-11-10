let nouvelArt = document.createElement("article");
nouvelArt.textContent = "Les logiciels et les cathédrales, c'est un peu la même chose - d'abord, on les construit, ensuite, on prie.";
nouvelArt.setAttribute("id", "phrase");
nouvelArt.style.display = "none";
document.body.appendChild(nouvelArt);

let nouveauBtnO = document.createElement("button");
nouveauBtnO.setAttribute("id", "buttonO");
nouveauBtnO.textContent = "Afficher la phrase"; 
document.body.appendChild(nouveauBtnO);

let artText = document.getElementById("phrase");
let artBtnO = document.getElementById("buttonO");

let nouveauBtnC = document.createElement("button");
nouveauBtnC.setAttribute("id", "buttonC");
nouveauBtnC.textContent = "Masquer la phrase"; 
document.body.appendChild(nouveauBtnC);

let artBtnC = document.getElementById("buttonC");

function show() {
    if (artText.style.display === "none") {
        artText.style.display = "block";
    }
}

function hide() {
    if (artText.style.display === "block") {
        artText.style.display = "none";
    }
}
artBtnO.addEventListener("click", show); 
artBtnC.addEventListener("click", hide)