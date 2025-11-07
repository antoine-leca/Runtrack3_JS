let nouveauCom = document.createElement("textarea");
nouveauCom.textContent = 0;
nouveauCom.setAttribute("id", "keylogger");
document.body.appendChild(nouveauCom);

let keyL = document.getElementById("keylogger");

document.addEventListener("keydown", function(event) {
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        if (document.activeElement === keyL) {
            keyL.value += event.key + event.key;
        } else {
            keyL.value += event.key;
        }
    }
});