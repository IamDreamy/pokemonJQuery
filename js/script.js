var pokemonRepository = (function () {
  var pokemonList = [];
  var apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=20";

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
    return $.ajax(apiURL)
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
    pokemonRepository.loadDetails(pokemon).then(function () {
      var $row = $(".row"); //creates a row for list to show on
      var $pokeCard = $('<div class = "pokeCard" style="width:200px"></div>'); //Sets all items in row to 200px size
      $pokeImage = $(
        '<img class= "card-img-top" alt= "Image of Card" style="width:50" />'
      ); //set image class and size
      $pokeImage.attr("src", pokemon.imageUrlFront); //link to loadDetails
      var $pokeBody = $('<div class= "card-body"></div>'); //bootstrap class for cards
      var $pokeTitle = $("<h5 class= 'card-title' >" + pokemon.name + "</h5>"); //adds name to title
      var $openProfile = $(
        '<button type= "button" class= "btn btn-info" data-toggle= "modal" data-target="#exampleModal">Open Profile</button>'
      );

      $row.append($pokeCard);
      //append each image to each card
      $pokeCard.append($pokeImage);
      $pokeCard.append($pokeBody);
      $pokeBody.append($pokeTitle);
      $pokeBody.append($openProfile);

      $openProfile.on("click", function (event) {
        showDetails(pokemon);
      });
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
    return $.ajax(url)
      .then(function (details) {
        //details on item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        //loop through each of the pokemon types
        //and changing background color if includes is true for that statement
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        if (item.types.includes("grass")) {
          $("#modal-container").css("background-color", "#006400");
        } else if (item.types.includes("fire")) {
          $("#modal-container").css("background-color", "#DC143C");
        } else if (item.types.includes("psychic")) {
          $("#modal-container").css("background-color", "#8B008B");
        } else if (item.types.includes("poison")) {
          $("#modal-container").css("background-color", "#9932CC");
        } else if (item.types.includes("water")) {
          $("#modal-container").css("background-color", "#00FFFF");
        } else if (item.types.includes("bug")) {
          $("#modal-container").css("background-color", "#556B2F");
        } else if (item.types.includes("rock")) {
          $("#modal-container").css("background-color", "#A9A9A9");
        } else if (item.types.includes("flying")) {
          $("#modal-container").css("background-color", "#6495ED");
        } else if (item.types.includes("electric")) {
          $("#modal-container").css("background-color", "#FFFF00");
        } else if (item.types.includes("ice")) {
          $("#modal-container").css("background-color", "#87CEEB");
        } else if (item.types.includes("ghost")) {
          $("#modal-container").css("background-color", "#663399");
        } else if (item.types.includes("ground")) {
          $("#modal-container").css("background-color", "#DCDCDC");
        } else if (item.types.includes("fairy")) {
          $("#modal-container").css("background-color", "#FF69B4");
        } else if (item.types.includes("steel")) {
          $("#modal-container").css("background-color", "#F5F5F5");
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
    var modalBody = $(".modal-body");
    var modalTitle = $(".modal-title");
    var modalHeader = $(".modal-header");
    modalTitle.empty();
    modalBody.empty();

    var imageFront = $('<img class="modal-img" style="width: 50%"> ');
    imageFront.attr("src", pokemon.imageUrlFront);

    var imageBack = $('<img class ="modal-img" style="width: 50%"> ');
    imageBack.attr("src", pokemon.imageUrlBack);

    var pokeName = $("<h1>" + "Pokemon Name: " + pokemon.name + "</h1>");
    // pokeName.innerText = "Pokemon Name: " + pokemon.name;
    // Element for IMG
    // var pokeImg = $('<img class = "modal-img"></img>');
    // // pokeImg.addClass("modal-img");
    // pokeImg.attr("src", pokemon.imageUrl);
    //Element for height
    var pokeHeight = $("<p>" + "Height: " + pokemon.height + "</p>");
    // pokeHeight.innerText = "Height: " + pokemon.height;
    //Element for weight
    var pokeWeight = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    // pokeWeight.innerText = "Weight: " + pokemon.weight;
    //Element for type
    var pokeType = $("<p>" + "Type: " + pokemon.types + "</p>");
    // pokeType.innerText = "Type: " + pokemon.types;
    //Element for abilities
    var pokeAbili = $("<p>" + "Abilities : " + pokemon.abilities + "</p>");
    // pokeAbili.innerText = "Abilities: " + pokemon.abilities;
    //Append all to modal then to modal container and adding 'is-visible;
    modalTitle.append(pokeName);
    modalBody.append(imageBack);
    modalBody.append(imageFront);
    modalBody.append(pokeHeight);
    modalBody.append(pokeWeight);
    modalBody.append(pokeType);
    modalBody.append(pokeAbili);
  }
  // //Hides when clicked on close button
  // function hideModal() {
  //   var modalContainer = $("#modal-container");
  //   modalContainer.removeClass("is-visible");
  // }

  // //Hides when clicked ESC
  // jQuery(window).on("keydown", (e) => {
  //   // var modalContainer = document.querySelector("#modal-container");
  //   var modalContainer = $("#modal-container");
  //   if (e.key === "Escape" && modalContainer.hasClass("is-visible")) {
  //     hideModal();
  //   }
  // });

  // //Hides when clicked outside the Modal
  // // var modalContainer = document.querySelector("#modal-container");
  // // var modalContainer = $("#modal-container");
  // // modalContainer.on("click", (e) => {
  // //   var target = e.target;
  // //   if (target === modalContainer) {
  // //     hideModal();
  // //   }
  // // });
  // $("body").click(function () {
  //   if ($("#modal-container").is(":visible")) {
  //     hideModal();
  //   }
  // });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    // showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
//
