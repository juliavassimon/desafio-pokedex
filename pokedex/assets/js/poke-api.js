//objeto que teremos as funções de manipulação da poke api
const PokeApi = {}
//função q abstrai o consumo do http, faz o get e da o results pronto
function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    //convertendo para string
    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    //primeira posição de uma array
    const [type] = types
    pokemon.types = types
    //tipo principal
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    return pokemon

}
fetch('URL_DA_API_AQUI', {
  headers: {
    'Authorization': 'Bearer SUA_CHAVE_DE_API_AQUI'
  }
})
  .then(response => response.json())
  .then(data => {
    const imageUrl = data.url; // Supondo que a API retorne a URL da imagem
    // Agora você pode definir a imagem como plano de fundo
    document.body.style.backgroundImage = `url(${imageUrl})`;
  })
  .catch(error => {
    console.error('Erro ao buscar imagem da API', error);
  });
PokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
            .then((response)=>response.json()) 
            //converter para o nosso modelo
            .then(convertPokeApiDetailToPokemon)
}
PokeApi.getPokemons = (offset=0, limit=5)=>{
   
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível obter a lista de Pokémon.');
        }
        return response.json();
      })
      .then((jsonBody) => jsonBody.results)
      .then((pokemons)=>pokemons.map((PokeApi.getPokemonDetail)))
      .then((detailRequests)=>Promise.all(detailRequests))
      .then((pokemonsDetails)=>pokemonsDetails  )
      

  };
 