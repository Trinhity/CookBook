<template>    
  <v-container>
    <v-row no-gutters>
      <v-col
        sm="3"
        class="pa-3 d-flex flex-row"
        v-for="recipe in recipes"
        :key="recipe._id"
        cols="4"
      >                    
        <v-card
          class="d-flex flex-column"
        >
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
            class="brown white--text"
            v-if="recipe.recipe.label.length > 100"
          >
            {{ recipe.recipe.label.substring(0, 100)+"..." }}
          </v-card-title>
          <v-card-title class="brown white--text"
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

        </v-card>    
      </v-col>
    </v-row> 
  </v-container>   
</template>

<script>
  import API from "../api"

  export default {
    name: 'bookmarked',
    data() {
      
      return {
        recipes: [],
        overlay: false,

        
      }
    },

    async created() {
      this.recipes = await API.getSavedRecipes(); 

    },

    components: {
      
    },
  }
</script>
