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
  
    <v-row 
      no-gutters
      v-if="(recipes != null) && (recipes.length > 0)"
    >
      <v-col
        sm="4"
        class="pa-3"
        v-for="recipe in recipes"
        :key="recipe._id"
        cols="4"
      >                    
        <v-card>
          <v-hover v-slot="{ hover }">  
            <v-img height="250" :src="`${recipe.recipe.image}`">
              <v-fade-transition>
                <v-overlay
                  v-if="hover"
                  absolute
                  color="grey"
                >
                  <v-btn>See recipe details</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </v-hover> 

          <v-card-title  
            class="indigo white--text"
            v-if="recipe.recipe.label.length > 20"
          >
            {{ recipe.recipe.label.substring(0, 20)+"..." }}
          </v-card-title>
          <v-card-title class="indigo white--text"
            v-else
          >
            {{ recipe.recipe.label }}
          </v-card-title>

          <v-divider></v-divider>

          <v-row no-gutters class="pa-4" >
            <v-col>
              <v-btn small outlined color="#9C6644">
                {{ recipe.recipe.dishType[0] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn small outlined color="#9C6644">
                {{ recipe.recipe.mealType[0] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn small outlined color="#9C6644">
                {{ recipe.recipe.cuisineType[0] }}
              </v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          
          <v-expansion-panels flat popout>
            <v-expansion-panel>
              <v-expansion-panel-header ripple>Ingredients</v-expansion-panel-header>
              <v-expansion-panel-content
                v-for="ingredient in recipe.recipe.ingredientLines"
                :key="ingredient"
              >
                {{ ingredient }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>    
      </v-col>
    </v-row> 
  </v-container>
</template>

<script>
  

  export default {
    name: 'Home',
    data: () => ({
      mainIngredient: '',
      recipes:[],


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
