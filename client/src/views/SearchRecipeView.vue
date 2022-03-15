<template>
  <v-container>
    <h1>Search page</h1>
    <v-form
      @submit.prevent="searchRecipe"
    >  
      <v-row>
        <v-col 
          sm="6" 
          md="3">
          
          <v-text-field
            v-model="mainIngredient"       
            label="What are you craving?"
            placeholder="Key Ingredient"
            outlined
            rounded
            clearable
            required
            append-icon="mdi-magnify"
            @click:append="searchRecipe"
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
        class="pa-3 d-flex flex-row"
        v-for="recipe in recipes"
        :key="recipe._id"
        cols="4"
      >                    
        <v-card
          class="d-flex flex-column"
          width="100%"
        >
          <v-card-actions>
            <v-hover v-slot="{ hover }">  
              <v-img 
                height="250" 
                :src="`${recipe.recipe.image}`"    
              >
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
          </v-card-actions>

          <v-card-title  
            class="brown white--text grow"
            text-truncate
            d-inline-block           
          >
            <div class="headerClass">
              {{ recipe.recipe.label }}
            </div>
            <v-spacer></v-spacer>
            <v-btn
              
              right
              :class="fav ? 'red--text' : ''"
              icon
              @click="saveRecipe(recipe)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn> 
          </v-card-title>
   
          <v-divider></v-divider>

          <v-row 
            no-gutters 
          >
            <v-col 
              class="d-flex flex-row pa-3"
              sm="6"
              cols="4"
            >
              <v-btn 
                class="d-flex flex-column"
                small 
                outlined 
                color="#9C6644"               
                v-if="recipe.recipe.mealType != null"
              >
                {{ recipe.recipe.mealType[0] }}
              </v-btn>
            
              <v-btn 
                class="d-flex flex-column"
                small 
                outlined 
                color="#9C6644"               
                v-if="recipe.recipe.dishType != null"
              >
                {{ recipe.recipe.dishType[0] }}
              </v-btn>
            
              <v-btn 
                class="d-flex flex-column"
                small 
                outlined 
                color="#9C6644"               
                v-if="recipe.recipe.cuisineType != null"
              >
                {{ recipe.recipe.cuisineType[0] }}
              </v-btn>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-card-actions>
            <v-menu
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#B08968"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Ingredients
                </v-btn>
              </template>

              <v-list>
                <v-list-item    
                  v-for="ingredient in recipe.recipe.ingredientLines"
                  :key="ingredient"
                >                  
                  <v-list-item-title>{{ ingredient }}</v-list-item-title>                 
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </v-card>    
      </v-col>
    </v-row> 
  </v-container>
</template>

<script>
  import API from "../api";
  export default {   
    name: 'Search',
    data: () => ({
      mainIngredient: '',
      recipes:[],   
      fav: false,
      ingredientRules: [
        v => !!v || 'Ingredient is required',
      ]
    }),

    created() {
      // Check if the page has any rerouted data
      if (this.$route.query.q != null) {
        // Rerouted query exists, quick search was performed on the home page
        this.mainIngredient = this.$route.query.q;
        this.searchRecipe();
      }
    },

    methods: {
      /**
       * Saves recipe data into database
       */
      async saveRecipe(recipe) {     
        this.fav = !this.fav; 
        const res = await API.saveRecipe(recipe.recipe);  
      },

      async deleteRecipe(recipe) {
        console.log("here");
      },

      /**
       * Query the Edamam API using the keyword from the form and return recipes
       */ 
      searchRecipe(e) {
        if (e != null) {
          e.preventDefault();
        }
        
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

        // fetch data from Edamam API
        fetch(string, {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            // TODO check for response status 200
            if (res.hits.length > 0) {
              this.recipes = res.hits;
              // TODO check for response status 400
            } else {
              this.errors = "Maybe you should invent this dish";

              // DEBUGGING
              alert(
                "Server returned " + res.status + " : " + res.statusText
              );
            }

            return {
              recipes: this.recipes,
              errors: this.errors,
            };
          });

        // Reset local variables
        this.recipes = [];
        this.errors = [];
      },
    },
  }
</script>

<style>
  .headerClass{
      white-space: nowrap ;
      word-break: normal;
      overflow: hidden ;
      text-overflow: ellipsis;
  }
</style>
