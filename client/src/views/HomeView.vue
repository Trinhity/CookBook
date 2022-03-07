<template>
  <v-container>
    <h1>Home page</h1>
    <v-form>  
      <v-row>
        <v-col cols="12" sm="6" md="3">
          
          <v-text-field
            v-model="mainIngredient"
          
            label="What are you craving?"
            placeholder="Key Ingredient"
            outlined
            rounded
            clearable
            required
            append-outer-icon="mdi-magnify"
            @click:append-outer="searchRecipe"
            :rules="ingredientRules"
          ></v-text-field>
          
        </v-col>
      </v-row>           
    </v-form>
  </v-container>
</template>

<script>
  

  export default {
    name: 'Home',
    data: () => ({
      mainIngredient: '',


      ingredientRules: [
        v => !!v || 'Ingredient is required',
      ]
    }),

    components: {
     
    },

    methods: {
      searchRecipe(e) {
        console.log(this.mainIngredient);
        var string =
          "https://api.edamam.com/api/recipes/v2?type=public&q=" +
          encodeURI(this.mainIngredient) +
          "&app_id=26d89fcd&app_key=28d64d9439085ffc46d2b5ac16b31fc4";

        // if (this.diet != "") {
        //   string += "&diet=" + encodeURI(this.diet);
        // }

        // if (this.health != "") {
        //   string += "&health=" + encodeURI(this.health);
        // }

        // if (this.cuisineType != "") {
        //   string += "&cuisineType=" + encodeURI(this.cuisineType);
        // }

        // if (this.mealType != "") {
        //   string += "&mealType=" + encodeURI(this.mealType);
        // }

        // if (this.dishType != "") {
        //   string += "&dishType=" + encodeURI(this.dishType);
        // }

        string += "&random=true";

        fetch(string, {
          method: "GET",
          headers: {},
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.hits.length > 0) {
              this.recipes = response.hits;
            } else {
              this.errors = "Maybe you should invent this dish";
              alert(
                "Server returned " + response.status + " : " + response.statusText
              );
            }

            return {
              recipes: this.recipes,
              errors: this.errors,
            };
          });

        e.preventDefault();
        this.recipes = null;
        this.errors = null;
      },
    },
  }
</script>
