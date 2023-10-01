const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 151
const limit = 10;
let offset = 0;

//1,2,3,4,5         0-5
//6,7,8,9,10        5-5
//11,               10-5
function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name"> ${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                
            </li>
        `
}
function loadPokemonItens(offset, limit){
    PokeApi.getPokemons(offset, limit).then((pokemons=[])=>{
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml})
}
loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', ()=>{
    offset += limit
    debugger
    const qtdRegistro = offset + limit

    if (qtdRegistro >= maxRecords){
        const newLimit =  maxRecords - offset 
        loadPokemonItens(offset, newLimit)
        //remover o botao
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
         loadPokemonItens(offset, limit)
    }
   
})
document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('theme-switch');
    const savedTheme = localStorage.getItem('theme');

    // Verifica se o tema foi salvo anteriormente
    if (savedTheme) {
        document.body.classList.add(savedTheme)
        themeSwitch.checked = savedTheme === 'dark-theme'
    }

    themeSwitch.addEventListener('change', function () {
        const newTheme = themeSwitch.checked ? 'dark-theme' : 'light-theme'
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(newTheme)
        localStorage.setItem('theme', newTheme)
    })
});

 