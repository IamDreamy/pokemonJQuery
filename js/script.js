var pokemonRepository = (function () {
  var pokemonList = [];
  var apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=900";

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    if (typeof item === "object" && "name" in item && "detailsUrl" in item) {
      pokemonList.push(item);
    } else {
      console.log("add an object");
    }
  }

  function loadList() {
    return fetch(apiURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  function addListItem(pokemon) {
    // var ul = document.createElement("ul");
    // ul.classList.add("pokemon-list");
    var pokemonList = document.querySelector(".pokemon-list"); // take out . for new function
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("styling");
    // document.body.appendChild(ul);
    // ul.appendChild(listItem);
    pokemonList.appendChild(listItem);
    listItem.appendChild(button);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //details on item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        //loop through each of the pokemon types
        //and changing background color if includes is true for that statement
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        if (item.types.includes("grass")) {
          document.getElementById("modal-container").style.background =
            "#006400";
        } else if (item.types.includes("fire")) {
          document.getElementById("modal-container").style.background =
            "#DC143C";
        } else if (item.types.includes("psychic")) {
          document.getElementById("modal-container").style.background =
            "#8B008B";
        } else if (item.types.includes("poison")) {
          document.getElementById("modal-container").style.background =
            "#9932CC";
        } else if (item.types.includes("water")) {
          document.getElementById("modal-container").style.background =
            "#00FFFF";
        } else if (item.types.includes("bug")) {
          document.getElementById("modal-container").style.background =
            "#556B2F";
        } else if (item.types.includes("rock")) {
          document.getElementById("modal-container").style.background =
            "#A9A9A9";
        } else if (item.types.includes("flying")) {
          document.getElementById("modal-container").style.background =
            "#6495ED";
        } else if (item.types.includes("electric")) {
          document.getElementById("modal-container").style.background =
            "#FFFF00";
        } else if (item.types.includes("ice")) {
          document.getElementById("modal-container").style.background =
            "#87CEEB";
        } else if (item.types.includes("ghost")) {
          document.getElementById("modal-container").style.background =
            "#663399";
        } else if (item.types.includes("ground")) {
          document.getElementById("modal-container").style.background =
            "#DCDCDC";
        } else if (item.types.includes("fairy")) {
          document.getElementById("modal-container").style.background =
            "#FF69B4";
        } else if (item.types.includes("steel")) {
          document.getElementById("modal-container").style.background =
            "#F5F5F5";
        }
        //loop to get pokemons abilities
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    var modalContainer = document.querySelector("#modal-container");
    // Clears existing modal content
    modalContainer.innerHTML = "";
    // Creates Div in DOM
    var modal = document.createElement("div");
    //Adds class to div element
    modal.classList.add("modal");
    //Create closing button in modal
    var closeButton = document.createElement("button");
    closeButton.classList.add("modal-close");
    closeButton.innerText = "Close";
    //Event listener to listen for click
    closeButton.addEventListener("click", hideModal);
    // Element for name
    var pokeName = document.createElement("h1");
    pokeName.innerText = "Pokemon Name: " + pokemon.name;
    // Element for IMG
    var pokeImg = document.createElement("img");
    pokeImg.classList.add("modal-img");
    pokeImg.setAttribute("src", pokemon.imageUrl);
    //Element for height
    var pokeHeight = document.createElement("p");
    pokeHeight.innerText = "Height: " + pokemon.height;
    //Element for weight
    var pokeWeight = document.createElement("p");
    pokeWeight.innerText = "Weight: " + pokemon.weight;
    //Element for type
    var pokeType = document.createElement("p");
    pokeType.innerText = "Type: " + pokemon.types;
    //Element for abilities
    var pokeAbili = document.createElement("p");
    pokeAbili.innerText = "Abilities: " + pokemon.abilities;
    //Append all to modal then to modal container and adding 'is-visible;
    modal.appendChild(closeButton);
    modal.appendChild(pokeName);
    modal.appendChild(pokeHeight);
    modal.appendChild(pokeImg);
    modal.appendChild(pokeWeight);
    modal.appendChild(pokeType);
    modal.appendChild(pokeAbili);
    modalContainer.appendChild(modal);
    //adds class to show modal
    modalContainer.classList.add("is-visible");
  }
  //Hides when clicked on close button
  function hideModal() {
    var modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //Hides when clicked ESC
  window.addEventListener("keydown", (e) => {
    var modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //Hides when clicked outside the Modal
  var modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener("click", (e) => {
    var target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
//
