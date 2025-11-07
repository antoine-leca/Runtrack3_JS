let nouveauFooter = document.createElement("footer");
nouveauFooter.setAttribute("id", "keylogger");
document.body.appendChild(nouveauFooter);

window.addEventListener("scroll", function() {
    let scrollTop = window.scrollY;
    let docHeight = document.documentElement.scrollHeight - window.innerHeight;
    let scrollPercent = (scrollTop / docHeight) * 100;
    let red = Math.min(255, Math.floor((scrollPercent / 100) * 255));
    let green = 0;
    let blue = Math.min(255, Math.floor((100 - scrollPercent) / 100 * 255));
    nouveauFooter.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
});