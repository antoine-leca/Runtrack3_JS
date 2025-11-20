const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

document.getElementById("rebootB").addEventListener("click", function (event) {
    event.preventDefault();

    const citations = [
        "Tous ces moments se perdront dans l'oubli, comme des larmes dans la pluie.",
        "J'ai vu tant de choses que vous, humains, ne pourriez pas croire.",
        "C'est dommage qu'elle doive vivre, mais c'est ainsi.",
        "La lumière qui brille deux fois plus fort brûle deux fois moins longtemps.",
        "Les étoiles, elles vous écoutent ?",
        "Je veux plus de vie, père.",
        "Il est temps de mourir.",
        "La question, c'est pas de savoir combien de temps il te reste, mais ce que tu vas faire du temps qui t'est imparti.",
        "Je ne suis pas dans le business. Je suis le business.",
        "Un système de mémoire humaine peut contenir 80 giga-octets d'informations."
    ];

    const citationAleatoire = citations[Math.floor(Math.random() * citations.length)];
    
    const jumbotron = document.getElementById("jumboText");
    if (jumbotron) {
        jumbotron.textContent = citationAleatoire;
    }
});