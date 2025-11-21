const inForm = document.getElementById("inForm");
const inMessage = document.getElementById("inMessage");

function valiDomaine(email) {
    const domain = email.split("@")[1];
    return domain === "laplateforme.io";
}

inForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailIn").value;
    const mdp = document.getElementById("mdpIn").value;
    const mdpconf = document.getElementById("mdpConfIn").value;

    if (!valiDomaine(email)) {
        inMessage.textContent = "Seulement les membres de La Plateforme peuvent s'inscrire.";
        inMessage.style.color = "red";
        return;
    }

    if (mdp !== mdpconf) {
        inMessage.textContent = "Les deux mots de passe ne correspondent pas.";
        inMessage.style.color = "red";
        return;
    }

    inMessage.textContent = "Inscription réussie !";
    inMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "calendrier.html";
    }, 2000);
});