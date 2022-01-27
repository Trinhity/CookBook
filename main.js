const app = Vue.createApp({
  data() {
    return {
      mainIngredient: "",
      json: null,
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
      ).then((response) => {
        if (response.ok) {
          json = JSON.parse(response.json);
          let recipes = {
            name: json.hits[0].label,
          };
          return recipes;
          // this.$emit("recipes-found", recipe);
          // console.log(response.json);
        } else {
          alert(
            "Server returned " + response.status + " : " + response.statusText
          );
        }
      });
      e.preventDefault();
      this.mainIngredient = "";
      this.recipes = null;
    },
  },
});
