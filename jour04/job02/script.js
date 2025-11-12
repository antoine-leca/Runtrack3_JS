function jsonValueKey(jsonString, key) {
    try {
        let jsonObject = JSON.parse(jsonString);
        console.log(jsonObject[key])
        return jsonObject[key]
    }
    catch (error) {
        console.error("Erreur", error)
        return null;
    }
};

const jsonString = `{ "name": "La Plateforme_", "address": "8 rue d'hozier", "city": "Marseille", "nb_staff": "11", "creation":"2019" }`;

jsonValueKey(jsonString, "nb_staff");
jsonValueKey(jsonString, "address");
jsonValueKey(jsonString, "city");