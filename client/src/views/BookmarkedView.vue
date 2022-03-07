<template>    
      <v-container>
        <h1>Bookmarked</h1>
         <v-row>
          <v-col
            v-for="recipe in recipes"
            :key="recipe"
            cols="4"
          >
            <v-card class="pa-2">
              <v-card-actions class="pb-0">
                <v-row class="mt-1 mx-1">
                  <v-col sm="2">
                    some image here
                  </v-col >
                  <v-col sm="10" class="d-flex justify-end">
                    <v-btn color="red" text>Delete</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
              <v-card-subtitle class="headline">
                <h3>{{ recipe.label }}</h3>
              </v-card-subtitle>
              <v-card-text class="grey--text">
                <p>{{ recipe.url }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>   
</template>

<script>
  import API from "../api"

  export default {
    name: 'Bookmarked',
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
