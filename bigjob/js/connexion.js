const coForm = document.getElementById("coForm");
const coMessage = document.getElementById("coMessage");

function valiDomaine(email) {
    const domain = email.split("@")[1];
    return domain === "laplateforme.io";
}

coForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("emailCo").value;
    const mdp = document.getElementById("mdpCo").value;

    if (!valiDomaine(email)) {
        coMessage.textContent = "Seulement les membres de La Plateforme peuvent se connecter.";
        coMessage.style.color = "red";
        return;
    }

    coMessage.textContent = "Connexion réussie !";
    coMessage.style.color = "green";

    setTimeout(() => {
        window.location.href = "calendrier.html";
    }, 2000);
});