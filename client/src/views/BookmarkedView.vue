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
            class="brown white--text grow"
            text-truncate
            d-inline-block
          >
            <div class="headerClass">
              {{ recipe.recipe.label }}
            </div>
            
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
                v-for="(ingredient, i) in recipe.recipe.ingredientLines"
                :key="i"
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

<style>
  .headerClass{
      white-space: nowrap ;
      word-break: normal;
      overflow: hidden ;
      text-overflow: ellipsis;
  }
</style>