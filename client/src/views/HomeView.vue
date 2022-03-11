<template>
  <v-container>
    <v-row>
      <v-col
        sm="6" 
        md="3"
      >
        <h1>Hello name</h1>
      </v-col>
      <v-col>
        <v-form
          @submit="redirectToSearch"
        >  
          <v-row>
            <v-col 
              sm="6" 
              md="3">
              
              <v-text-field
                v-model="keyword"       
                label="Quick search"
                placeholder="Key Ingredient"
                outlined
                rounded
                clearable
                required
                append-icon="mdi-magnify"
                @click:append="redirectToSearch"
              ></v-text-field>
            </v-col>
          </v-row>           
        </v-form>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
        keyword: "",
    }),

    components: {
     
    },

    methods: {
      /**
       * Redirect to search page and pass the keyword as a parameter
       */
      redirectToSearch(e) {
        e.preventDefault();  
        // redirect to the search page with parameter q
        this.$router.push({ path: "/searchrecipes", query: {"q": this.keyword} })  
           
      },
    }
  }
    
</script>
