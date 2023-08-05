const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");

let searchPokemon = 1;

const fetchPOkemon = async (pokemon) => {
  const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (API.status === 200) {
    const data = await API.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";

  const data = await fetchPOkemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not found";
    pokemonNumber.innerHTML = "0";
  }
};

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  renderPokemon(input.value.toLowerCase());
  input.value = "";
});

prev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

next.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
