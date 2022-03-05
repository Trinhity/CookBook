<template>
  <v-container>
    <h1>Home page</h1>
    <v-form>      
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="What are you craving?"
            placeholder="Key Ingredient"
          ></v-text-field>
          <v-btn
              icon
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-btn
              icon
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-col>
      </v-row>        
    
    </v-form>
  </v-container>
</template>

<script>
  

  export default {
    name: 'Home',
    data() {
      return {
        recipes: [],
        item: [
          { text: 'Home', icon: 'mdi-magnify', link: "/" },
        ],
      }
    },

    components: {
      
    },
  }
</script>
