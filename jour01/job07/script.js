function jourtravaille(date) {
    const jour = date.getDate();
    const mois = date.getMonth() + 1;
    const annee = date.getFullYear();
    const day = date.getDay(); // 0 = dimanche, 6 = samedi
    
    // Jours fériés fixes en 2020
    const joursFeriesFixes = [
        '1/1',   // Jour de l'An
        '1/5',   // Fête du Travail
        '8/5',   // Victoire 1945
        '14/7',  // Fête nationale
        '15/8',  // Assomption
        '1/11',  // Toussaint
        '11/11', // Armistice 1918
        '25/12'  // Noël
    ];
    
    // Jours fériés variables pour 2020
    const joursFeriesVariables2020 = [
        '13/4',  // Lundi de Pâques
        '21/5',  // Ascension
        '1/6'    // Lundi de Pentecôte
    ];
    
    const dateStr = `${jour}/${mois}`;
    
    if (annee === 2020 && (joursFeriesFixes.includes(dateStr) || joursFeriesVariables2020.includes(dateStr))) {
        console.log(`Le ${jour} ${mois} ${annee} est un jour férié`);
        return;
    }

    // Week-end
    
    if (day === 0 || day === 6) {
        console.log(`Non, ${jour} ${mois} ${annee} est un week-end`);
        return;
    }
    
    // Jour travaillé
    console.log(`Oui, ${jour} ${mois} ${annee} est un jour travaillé`);
}

// tests
const date1 = new Date('2020-04-13'); // Lundi de Pâques (férié)
const date2 = new Date('2020-06-13'); // Samedi (week-end)
const date3 = new Date('2020-06-15'); // Lundi (jour travaillé)

jourtravaille(date1);
jourtravaille(date2);
jourtravaille(date3);