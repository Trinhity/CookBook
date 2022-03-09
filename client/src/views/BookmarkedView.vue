<template>    
  <v-container>
    
    <v-row no-gutters>
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

          <v-card-title class="indigo white--text"
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
              <v-btn small outlined color="indigo">
                {{ recipe.recipe.dishType[0] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn small outlined color="indigo">
                {{ recipe.recipe.mealType[0] }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn small outlined color="indigo">
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
