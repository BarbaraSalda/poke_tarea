const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

const renderPokemonCard = (pokemon) => {// Esta función se encarga de crear y actualizar la tarjeta del Pokémon en el DOM. Muestra el nombre, ID, peso e imagen del Pokémon.
    const pokeCard = document.getElementById('poke-card');
    pokeCard.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p>Weight: ${pokemon.weight} hectograms</p>
    `;
}

document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        renderPokemonCard(pokemon);
    });

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');//Cada vez que se obtiene un nuevo Pokémon (al hacer clic en "Get", "Previous" o "Next"), el ID se almacena en localStorage. Cuando la página se carga, se recupera el ID almacenado para mostrar la tarjeta correspondiente.
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    renderPokemonCard(pokemon);
});


document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId - 1);
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentPokeId', pokemon.id);// La tarjeta se carga automáticamente al iniciar la página, utilizando el ID almacenado en localStorage.
        renderPokemonCard(pokemon);
    });

document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentPokeId', pokemon.id);
        renderPokemonCard(pokemon);
    });

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'title1',
        body: 'Lorem ipsum dolor sit amet',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
}).then(res => res.json())
    .then(json => console.log(json));
