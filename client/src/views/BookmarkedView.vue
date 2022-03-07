<template>    
      <v-container>
        <h1>Bookmarked</h1>
        
         <v-row no-gutters>
          <v-col
            sm="4"
            class="pa-3"
            v-for="recipe in recipes"
            :key="recipe._id"
            cols="4"
          >
          
            <v-card class="pa-1">
              <v-img height="250" :src="`${recipe.recipe.image}`"></v-img>

             
              
             
              <v-card-title class="headline">
                {{ recipe.recipe.label }}
              </v-card-title>

               <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Ingredients
                    </v-btn>
                  </template>
                  <v-list>

                  
                    <v-list-item-content>
                      <v-list-item-title>Ingredients</v-list-item-title>
                    </v-list-item-content>
                    
                    <v-list-item
                      v-for="ingredient in recipe.recipe.ingredientLines"
                      :key="ingredient"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="ingredient"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list>
                </v-tooltip>

              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Health Labels
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item-content>
                    <v-list-item-title>Health Labels</v-list-item-title>
                  </v-list-item-content>
                  
                  <v-list-item
                    v-for="healthLabel in recipe.recipe.healthLabels"
                    :key="healthLabel" 
                  >
                    <v-btn small outlined color="indigo">
                      {{ healthLabel }}
                    </v-btn>
                  </v-list-item>

                </v-list>
              </v-tooltip>

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
        
      }
    },

    async created() {
      this.recipes = await API.getSavedRecipes(); 

    },

    components: {
      
    },
  }
</script>
