const konamiCode = 
    [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "b",
        "a"
    ];

let userSequence = []

const codeLength = konamiCode.length;

window.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    userSequence.push(keyPressed);
    userSequence = userSequence.slice(-codeLength);

    if (userSequence.join("") === konamiCode.join("")) {
        codeAllowed();
    }
});

function codeAllowed() {
    document.body.classList.add("konami-active");
}