<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="#9C6644">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <form ref="form" @submit.prevent="login()">
                <v-text-field
                  v-model="username"
                  name="username"
                  label="Username or e-mail"
                  type="text"
                  placeholder="example@outlook.com"
                  :rules="usernameRules"
                  required
                ></v-text-field>
                
                <v-text-field
                  v-model="password"
                  name="password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password"
                  required                            
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-btn 
                  type="submit" 
                  class="mt-4" 
                  color="#9C6644" 
                  value="log in"
                  outlined 
                >
                  Login
                </v-btn>
              </form>
            </v-card-text>
          </v-card>  
        </v-flex>
    </v-layout>
  </v-container>
</template>
 
<script>
  import axios from "axios"
  export default {
      name: "Login",
      data: () => ({  
        
        username: "",
        password: "",
        
        user: null,
        showPassword: false,
        valid: true,
        usernameRules: [
          v => !!v || 'Username is required',
        ],
      }),

      methods: {
        login(e) {
          const { username } = this;
          console.log(username + " logged in");
          this.$router.push({ path: "/dashboard", params: {"username": username} }) 
        },
        // async login(e) {
        //   console.log("here");
        //   if (e != null) {
        //     e.preventDefault();
        //   }
        //   axios
        //   .post("http://localhost:8080/login", {
        //     params: {
        //       email: this.state.username,
        //       password: this.state.password,
        //     },
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //   })
        //   .then((res) => {
        //     console.log(res);
        //     this.user = res;
        //     this.setLoginStatus();
        //     this.redirectToSDashboard();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        //   this.state.username= "";
        //   this.state.password= "";
        // },

        setLoginStatus() {
            document.cookie =
                "verification_string=test_verification_" +
                this.state.username +
                ";secure;" +
                "samesite=lax;" +
                "max-age=60*60*24*15;";
        },

        redirectToSDashboard(e) {
        e.preventDefault();  
        // redirect to the dashboard with parameter user
        this.$router.replace({ path: "/dashboard", params: {"username": this.username} })  
           
      },
      }
    }
</script>
