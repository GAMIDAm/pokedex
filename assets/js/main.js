document.addEventListener("DOMContentLoaded", () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const contentDetalhes = document.getElementById('content-detalhes');

    const maxRecords = 151;
    let offset = 0;
    const limit = 6;

    function convertPokemonToli(pokemon) {
        return `
        <a href="detalhes.html?pokemon=${pokemon.name}" style="text-decoration: none; color: inherit;">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}"/>
                </div>    
            </li>
        </a>`;
    }

    function loadPokemonItens(offset, limit) {
        PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            pokemonList.innerHTML += pokemons.map(convertPokemonToli).join('');
        });
    }

    function convertPokemontoDetalhes(pokemon) {
        return `
            <section class="pokemon-detalhes-title ${pokemon.type}">
                <div class="pokemon-infosHeader">
                    <div class="pokemon-infosTitle">
                        <h1 id="pokemonName">${pokemon.name}</h1>
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <span id="pokemonId">#${pokemon.number}</span>
                </div>
                <div class="pokemon-image">
                    <img id="pokemonImage" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </section>
            <section class="pokemon-detalhes-about">
                <div class="pokemon-stats" id="pokemonStats">
                    <h3>Base Stats</h3>
                    <ol class="stats-list">
                        ${pokemon.stats.map((stat) => `
                            <li class="stat">
                                <span class="stat-name">${stat.name}</span>
                                <span class="stat-value">${stat.value}</span>
                            </li>`).join('')}
                    </ol>
                </div>
            </section>
        `;
    }

    // Se estivermos na página inicial
    if (pokemonList && loadMoreButton) {
        loadPokemonItens(offset, limit);

        loadMoreButton.addEventListener('click', () => {
            offset += limit;
            const qtdRecordNextPage = offset + limit;

            if (qtdRecordNextPage >= maxRecords) {
                const newLimit = maxRecords - offset;
                loadPokemonItens(offset, newLimit);
                loadMoreButton.parentElement.removeChild(loadMoreButton);
            } else {
                loadPokemonItens(offset, limit);
            }
        });
    }

    // Se estivermos na página de detalhes
    if (contentDetalhes) {
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonName = urlParams.get('pokemon');

        if (pokemonName) {
            PokeApi.getPokemonDetail({
                name: pokemonName,
                url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            })
                .then((pokemon) => {
                    const detalhesHtml = convertPokemontoDetalhes(pokemon);
                    contentDetalhes.innerHTML = detalhesHtml;

                    // 🔹 Altera dinamicamente a cor da página pelo tipo do Pokémon
                    document.body.className = pokemon.type;      // muda o body
                    const header = document.querySelector('header');
                    if (header) header.className = pokemon.type; // muda o header também
                });
        }
    }
});
