function sommenombrespremiers(a, b) {
    function estPremier(number) {
        if (number < 2) return false;
        if (number === 2) return true;
        if (number % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(number); i += 2) {
            if (number % i === 0) return false;
        }
        return true;
    }
    // vérifie si les deux nombres sont premiers
    if (estPremier(a) && estPremier(b)) {
        // retourne leur somme
        return a + b;
    }
    // sinon retourne false
    return false;
}

console.log(sommenombrespremiers(3, 5)); 
// = 8
console.log(sommenombrespremiers(4, 5)); 
// = false