let pokemonData = [];

fetch("pokemon.json")
    .then(response => response.json())
    .then(data => {
        pokemonData = data;
        createForm();
    })
    .catch(error => console.error('Error loading Pokemon data:', error));

function createForm() {
    let section = document.createElement("section");
    section.setAttribute("id", "section");
    section.setAttribute("class", "flex justify-center mb-8");
    document.body.appendChild(section);

    let form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("id", "form");
    form.setAttribute("class", "w-[90%] max-w-md bg-white p-6 rounded-lg shadow-md");
    section.appendChild(form);

    let title = document.createElement("h1");
    title.textContent = "Filtrer les Pokémon";
    title.setAttribute("class", "text-2xl font-bold mb-4 text-center");
    form.appendChild(title);

    inputTypes.forEach(inType => {
        createInput(inType)
    });

    createResultsContainer();
}

const inputTypes = [
    "id",
    "name",
    "type",
    "filter"
];

function createInput(inputType) {
    let form = document.getElementById("form");
    
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", `div-${inputType} mb-4`);
    form.appendChild(newDiv);

    let label = document.createElement("label");
    label.setAttribute("for", `input-${inputType}`);
    label.setAttribute("class", "block text-sm font-medium text-gray-700 mb-2");
    label.textContent = inputType.charAt(0).toUpperCase() + inputType.slice(1);
    newDiv.appendChild(label);

    let newInput = "";

    if (inputType === "id" || inputType === "name" || inputType === "filter" || inputType === "type") {
        if (inputType === "id" || inputType === "name" || inputType === "filter") { 
            newInput = document.createElement("input");
            newInput.setAttribute("class", `input-${inputType} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`);
            newInput.setAttribute("id", `input-${inputType}`);
            newInput.setAttribute("name", `input-${inputType}`);
            
            if (inputType === "id") {
                newInput.setAttribute("type", "number");
                newInput.setAttribute("placeholder", "ID du Pokémon");
                newInput.setAttribute("min", "1");
                newInput.setAttribute("max", "151");
            } else if (inputType === "name") {
                newInput.setAttribute("type", "text");
                newInput.setAttribute("placeholder", "Nom du Pokémon");
            } else if (inputType === "filter") {
                newInput.setAttribute("type", "button");
                newInput.setAttribute("value", "Filtrer");
                newInput.setAttribute("class", `input-${inputType} w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer`);
                newInput.addEventListener("click", filterPokemon);
            }
        } else if (inputType === "type") {
            newInput = document.createElement("select");
            newInput.setAttribute("id", `input-${inputType}`);
            newInput.setAttribute("name", `input-${inputType}`);
            newInput.setAttribute("class", `input-${inputType} w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`);

            let defaultOption = document.createElement("option");
            defaultOption.setAttribute("value", "");
            defaultOption.textContent = "Tous les types";
            newInput.appendChild(defaultOption);

            const allTypes = new Set();
            pokemonData.forEach(pokemon => {
                pokemon.type.forEach(type => {
                    allTypes.add(type);
                });
            });

            const sortedTypes = Array.from(allTypes).sort();
            
            sortedTypes.forEach(type => {
                let newOption = document.createElement("option");
                newOption.setAttribute("value", type);
                newOption.textContent = type;
                newInput.appendChild(newOption);
            });
        }
        
        newDiv.appendChild(newInput);
    }
}

function createResultsContainer() {
    let resultsSection = document.createElement("section");
    resultsSection.setAttribute("id", "results");
    resultsSection.setAttribute("class", "container mx-auto px-4");
    document.body.appendChild(resultsSection);
}

function filterPokemon() {
    const idInput = document.getElementById("input-id").value.trim();
    const nameInput = document.getElementById("input-name").value.trim().toLowerCase();
    const typeInput = document.getElementById("input-type").value;

    let filteredPokemon = pokemonData.filter(pokemon => {
        let matchesId = true;
        let matchesName = true;
        let matchesType = true;

        if (idInput !== "") {
            matchesId = pokemon.id === parseInt(idInput);
        }

        if (nameInput !== "") {
            matchesName = pokemon.name.english.toLowerCase().includes(nameInput) ||
                         pokemon.name.french.toLowerCase().includes(nameInput);
        }

        if (typeInput !== "") {
            matchesType = pokemon.type.includes(typeInput);
        }

        return matchesId && matchesName && matchesType;
    });

    displayResults(filteredPokemon);
}

function displayResults(pokemon) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (pokemon.length === 0) {
        let noResults = document.createElement("div");
        noResults.setAttribute("class", "text-center py-8");
        noResults.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-600">Aucun Pokémon trouvé</h2>
            <p class="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
        `;
        resultsContainer.appendChild(noResults);
        return;
    }

    let title = document.createElement("h2");
    title.textContent = `${pokemon.length} Pokémon trouvé${pokemon.length > 1 ? 's' : ''}`;
    title.setAttribute("class", "text-2xl font-bold mb-6 text-center");
    resultsContainer.appendChild(title);

    let grid = document.createElement("div");
    grid.setAttribute("class", "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6");
    resultsContainer.appendChild(grid);

    pokemon.forEach(poke => {
        let card = document.createElement("div");
        card.setAttribute("class", "bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow");
        
        card.innerHTML = `
            <div class="text-center">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">#${poke.id} ${poke.name.english}</h3>
                <p class="text-sm text-gray-600 mb-3">${poke.name.french}</p>
                <div class="mb-4">
                    ${poke.type.map(type => 
                        `<span class="inline-block bg-${getTypeColor(type)}-200 text-${getTypeColor(type)}-800 px-2 py-1 rounded-full text-xs font-medium mr-1">${type}</span>`
                    ).join('')}
                </div>
                <div class="text-left">
                    <h4 class="font-medium text-gray-700 mb-2">Statistiques de base:</h4>
                    <div class="space-y-1 text-sm text-gray-600">
                        <div>HP: ${poke.base.HP}</div>
                        <div>Attaque: ${poke.base.Attack}</div>
                        <div>Défense: ${poke.base.Defense}</div>
                        <div>Att. Spé: ${poke.base["Sp. Attack"]}</div>
                        <div>Déf. Spé: ${poke.base["Sp. Defense"]}</div>
                        <div>Vitesse: ${poke.base.Speed}</div>
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function getTypeColor(type) {
    const colors = {
        'Normal': 'gray',
        'Fire': 'red',
        'Water': 'blue',
        'Electric': 'yellow',
        'Grass': 'green',
        'Ice': 'blue',
        'Fighting': 'red',
        'Poison': 'purple',
        'Ground': 'yellow',
        'Flying': 'indigo',
        'Psychic': 'pink',
        'Bug': 'green',
        'Rock': 'gray',
        'Ghost': 'purple',
        'Dragon': 'purple',
        'Steel': 'gray',
        'Fairy': 'pink'
    };
    return colors[type] || 'gray';
}