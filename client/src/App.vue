<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list color="#9C6644">
        <v-list-item 
          class=" white--text"         
        >
          <v-list-item-avatar>
              <v-icon
                x-large
                >mdi-account
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>      
            <v-list-item-title>Name</v-list-item-title>
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
                <v-list-item>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>          
          </v-list-item-content>
        </v-list-item>  
      </v-list>
      
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item-group       
          color="#B08968"
        >
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
   
      <v-main>
        
            <router-view></router-view>
        
      </v-main>
  </v-app>
  
</template>

<script>
  export default {
    data: () => ({ 
      drawer: null,
      items: [
        { text: 'Home', icon: 'mdi-home', link: "/" },
        { text: 'Bookmarked', icon: 'mdi-bookmark', link: "/bookmarked"},
        { text: 'About', icon: 'mdi-help-box', link: "/about" },
      ],
    }),
  }
</script>

<style>
#inspire {
  background: url('http://textures.world/wp-content/uploads/2018/10/Seamless-White-Wood-Texture-9-copy.jpg')
    center center fixed !important;
  background-size: cover;
}
</style>