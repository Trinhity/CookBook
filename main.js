const app = Vue.createApp({
  data() {
    return {
      mainIngredient: "",
      recipes: null,
    };
  },
  methods: {
    searchRecipe(e) {
      fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          this.mainIngredient +
          "&app_id=26d89fcd&app_key=28d64d9439085ffc46d2b5ac16b31fc4",
        {
          method: "GET",
          headers: {},
        }
      )
        .then((response) => response.json())
        .then((response) => {
          // if (response.ok) {
          this.recipes = response.hits;
          console.log(this.recipes);
          return {
            recipes: this.recipes,
          };

          // } else {
          //   alert(
          //     "Server returned " + response.status + " : " + response.statusText
          //   );
          // }
        });

      e.preventDefault();
    },
  },
});
