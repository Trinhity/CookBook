const app = Vue.createApp({
  data() {
    return {
      mainIngredient: "",
      recipes: null,
      errors: null,
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
          if (response.hits.length > 0) {
            this.recipes = response.hits;
          } else {
            this.errors = "Does that ingredient exist?";
          }

          return {
            recipes: this.recipes,
            errors: this.errors,
          };

          // } else {
          //   alert(
          //     "Server returned " + response.status + " : " + response.statusText
          //   );
          // }
        });

      e.preventDefault();
      this.recipes = null;
      this.errors = null;
    },
  },
});
