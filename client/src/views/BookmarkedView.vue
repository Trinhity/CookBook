<template> 
    <v-main>
      <v-container>
          <h1>Bookmarked</h1>
        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
</template>

<script>
  export default {
    //
  }
</script>


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
      this.recipes = await API.getAllRecipes();
    },

    components: {
      
    },
  }
</script>
