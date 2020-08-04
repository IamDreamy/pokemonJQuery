var pokemonRepository = (function () {
  var o = [],
    e = "https://pokeapi.co/api/v2/pokemon/?limit=15";
  function t(e) {
    "object" == typeof e && "name" in e && "detailsUrl" in e
      ? o.push(e)
      : console.log("add an object");
  }
  function a(o) {
    var e = $(".modal-body"),
      t = $(".modal-title");
    $(".modal-header");
    t.empty(), e.empty();
    var a = $('<img class="modal-img" style="width: 50%"> ');
    a.attr("src", o.imageUrlFront);
    var n = $('<img class ="modal-img" style="width: 50%"> ');
    n.attr("src", o.imageUrlBack);
    var i = $("<h1>Pokemon Name: " + o.name + "</h1>"),
      c = $("<p>Height: " + o.height + "</p>"),
      s = $("<p>Weight: " + o.weight + "</p>"),
      l = $("<p>Type: " + o.types + "</p>"),
      r = $("<p>Abilities : " + o.abilities + "</p>");
    t.append(i),
      e.append(n),
      e.append(a),
      e.append(c),
      e.append(s),
      e.append(l),
      e.append(r);
  }
  return {
    add: t,
    getAll: function () {
      return o;
    },
    addListItem: function (o) {
      pokemonRepository.loadDetails(o).then(function () {
        var e = $(".row"),
          t = $('<div class = "pokeCard" style="width:200px"></div>');
        ($pokeImage = $(
          '<img class= "card-img-top" alt= "Image of Card" style="width:50" />'
        )),
          $pokeImage.attr("src", o.imageUrlFront);
        var n = $('<div class= "card-body"></div>'),
          i = $("<h5 class= 'card-title' >" + o.name + "</h5>"),
          c = $(
            '<button type= "button" class= "btn btn-info" data-toggle= "modal" data-target="#exampleModal">Open Profile</button>'
          );
        e.append(t),
          t.append($pokeImage),
          t.append(n),
          n.append(i),
          n.append(c),
          c.on("click", function (e) {
            !(function (o) {
              pokemonRepository.loadDetails(o).then(function () {
                console.log(o), a(o);
              });
            })(o);
          });
      });
    },
    loadList: function () {
      return $.ajax(e)
        .then(function (o) {
          o.results.forEach(function (o) {
            var e = { name: o.name, detailsUrl: o.url };
            t(e), console.log(e);
          });
        })
        .catch(function (o) {
          console.log(o);
        });
    },
    loadDetails: function (o) {
      var e = o.detailsUrl;
      return $.ajax(e)
        .then(function (e) {
          (o.imageUrlFront = e.sprites.front_default),
            (o.imageUrlBack = e.sprites.back_default),
            (o.height = e.height),
            (o.types = []);
          for (var t = 0; t < e.types.length; t++)
            o.types.push(e.types[t].type.name);
          for (
            o.types.includes("grass")
              ? $("#modal-container").css("background-color", "#006400")
              : o.types.includes("fire")
              ? $("#modal-container").css("background-color", "#DC143C")
              : o.types.includes("psychic")
              ? $("#modal-container").css("background-color", "#8B008B")
              : o.types.includes("poison")
              ? $("#modal-container").css("background-color", "#9932CC")
              : o.types.includes("water")
              ? $("#modal-container").css("background-color", "#00FFFF")
              : o.types.includes("bug")
              ? $("#modal-container").css("background-color", "#556B2F")
              : o.types.includes("rock")
              ? $("#modal-container").css("background-color", "#A9A9A9")
              : o.types.includes("flying")
              ? $("#modal-container").css("background-color", "#6495ED")
              : o.types.includes("electric")
              ? $("#modal-container").css("background-color", "#FFFF00")
              : o.types.includes("ice")
              ? $("#modal-container").css("background-color", "#87CEEB")
              : o.types.includes("ghost")
              ? $("#modal-container").css("background-color", "#663399")
              : o.types.includes("ground")
              ? $("#modal-container").css("background-color", "#DCDCDC")
              : o.types.includes("fairy")
              ? $("#modal-container").css("background-color", "#FF69B4")
              : o.types.includes("steel") &&
                $("#modal-container").css("background-color", "#F5F5F5"),
              o.abilities = [],
              t = 0;
            t < e.abilities.length;
            t++
          )
            o.abilities.push(e.abilities[t].ability.name);
          o.weight = e.weight;
        })
        .catch(function (o) {
          console.error(o);
        });
    },
    showModal: a,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (o) {
    pokemonRepository.addListItem(o);
  });
});
