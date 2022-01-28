const app = Vue.createApp({
  data() {
    return {
      mainIngredient: "",
      recipes: "",
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
      ).then((response) => {
        if (response.ok) {
          this.recipes = response.json();
        } else {
          alert(
            "Server returned " + response.status + " : " + response.statusText
          );
        }
      });

      e.preventDefault();
      return this.recipes;
    },
  },
});
