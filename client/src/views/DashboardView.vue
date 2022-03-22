<template>
<v-app id="inspire">
  <v-navigation-drawer
    v-model="drawer"
    app
  >
    <v-list 
      color="#9C6644"
      v-if="isLoggedIn == true"
    >
      <v-list-item class=" white--text" >
        <v-list-item-avatar>
          <v-icon x-large>
            mdi-account
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>      
          <v-list-item-title>{{ username }}</v-list-item-title>
          <v-list-item-subtitle @click="logout">Logout</v-list-item-subtitle>
        </v-list-item-content>
      
        <v-list-item-content>
          <v-menu     
            left
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>Management</v-list-item-title>
              </v-list-item>
              
            </v-list>
          </v-menu>          
        </v-list-item-content>
      </v-list-item>  
    </v-list>
    
    <v-list
      color="#9C6644"
      v-else
    >

      <v-btn dense>
        Sign in
      </v-btn>

    </v-list>

    <v-divider></v-divider>

    <v-list 
      dense
      v-if="isLoggedIn == true"
    >
      <v-list-item-group color="#B08968">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Secret Kitchen Diary</v-toolbar-title>
  </v-app-bar>

  <v-container>
    <v-row>
      <v-col sm="6"  md="3">
        <h1>Hello {{ username }}</h1>
      </v-col>
      <v-col>
        <v-form
          @submit.prevent="redirectToSearch"
        >  
          <v-row>
            <v-col sm="6" md="3">          
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
</v-app> 
  
</template>

<script>
  export default {
    name: 'Dashboard',
    data: () => ({
      keyword: "",
      username: "",
      drawer: null,
      items: [
        { text: 'Dashboard', icon: 'mdi-home', link: "/dashboard" },

        // // Not really supposed to be here
        // { text: 'Sign In', icon: 'mdi-account-arrow-right', link: "/login" },
        
        { text: 'Search Recipes', icon: 'mdi-book-open-page-variant', link: "/searchrecipes" },
        { text: 'Personal Cookbook', icon: 'mdi-book', link: "/bookmarked"},
        { text: 'About', icon: 'mdi-help-box', link: "/about" },
      ],
      username: null,
      isLoggedIn: false

    }),

    created() {
      console.log(this.$route.params.username);
      if (this.$route.params.username != null) {
        this.username = this.$route.params.username;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },

    components: {
     
    },

    methods: {
      logout() {
        this.$router.replace({name: "login"})
      },

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
