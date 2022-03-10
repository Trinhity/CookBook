<template>
  <v-container>
    <h1>Home page</h1>
    <v-form>  
      <v-row>
        <v-col 
          sm="6" 
          md="3"
        >  
          <v-text-field
            label="What are you craving?"
            placeholder="Key Ingredient"
            outlined
            rounded
            clearable
            append-icon="mdi-magnify"
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
        
    }),

    components: {
     
    },

    methods: {

    }
  }
    
</script>
