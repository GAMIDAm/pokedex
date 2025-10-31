# Instruções para Agentes de IA - Pokedex

Este projeto é uma Pokedex web que consome a [PokeAPI](https://pokeapi.co/) para exibir informações sobre Pokémons. Aqui estão as informações essenciais para trabalhar neste código:

## Arquitetura

O projeto segue uma arquitetura MVC simples:

- **Model** (`pokemon-model.js`): Define a classe `Pokemon` com seus atributos
- **View** (arquivos HTML e CSS): Renderiza os Pokémons em lista e detalhes
- **Controller** (`main.js` e `poke-api.js`): Gerencia a lógica de busca e exibição

### Fluxo de Dados Principal

1. `poke-api.js` faz requisições para a PokeAPI e converte os dados para o modelo local
2. `main.js` gerencia a paginação e renderização dos Pokémons na interface
3. Cliques nos Pokémons redirecionam para a página de detalhes

## Convenções Importantes

### Estilos de Tipo de Pokémon

Os tipos de Pokémon são representados por classes CSS em `pokedex.css` e `detalhes.css`. Por exemplo:

```css
.grass { background-color: #77c850; }
.fire { background-color: #ee7f30; }
```

### Paginação

- `maxRecords = 151` limita a busca à primeira geração de Pokémon
- `limit = 6` define quantidade de Pokémon por página
- Botão "Carregar mais" é removido ao atingir o limite

## Arquivos Chave

- `index.html`: Página principal com lista de Pokémon
- `detalhes.html`: Página de detalhes de um Pokémon específico
- `assets/js/poke-api.js`: Interface com a PokeAPI
- `assets/css/pokedex.css`: Estilos da lista de Pokémon
- `assets/css/detalhes.css`: Estilos da página de detalhes

## Pontos de Integração

### PokeAPI

- Base URL: https://pokeapi.co/api/v2/pokemon
- Parâmetros principais:
  - `offset`: Índice inicial da página
  - `limit`: Quantidade de Pokémon por página
- Dados utilizados:
  - Nome, ID, tipos e imagem (sprites.other.dream_world.front_default)

## Dicas para Desenvolvimento

1. Use `convertPokeApiDetailToPokemon()` ao adicionar novos campos da API
2. Mantenha a consistência das cores dos tipos em `pokedex.css` e `detalhes.css`
3. Respeite o limite de 151 Pokémon ao implementar novas funcionalidades

## Comandos Úteis

Para desenvolvimento local, abra `index.html` diretamente no navegador ou use um servidor local como Live Server do VS Code.