
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => {
        return `
        <li class="type">${typeSlot.type.name}</li>
        `
    })
}

function convertPokemonToli(pokemon) {
    return `
    <li class="pokemon">
                    <span class="number">#${pokemon.order}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${convertPokemonTypesToLi(pokemon.types).join('')}
                        </ol>

                        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}"/>
                    </div>    
                </li>`
}

const pokemonList = document.getElementById('pokemonList');

PokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToli).join('');
    /*  
    const listItens = [];

    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        listItens.push(convertPokemonToli(pokemon));
    }


    console.log(listItens); */
})