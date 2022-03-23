<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="#9C6644">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <form ref="form" @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  name="email"
                  label="E-mail"
                  type="text"
                  placeholder="example@outlook.com"
                  :rules="emailRules"
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
                <v-spacer></v-spacer>
                <router-link :to="{ path: '/register' }">
                  Sign up
                </router-link>
              </form>
            </v-card-text>
          </v-card>  
        </v-flex>
    </v-layout>
  </v-container>
</template>
 
<script>
  import AuthenticationAPI from '@/services/AuthService.js';

  export default {
      name: "Login",
      data: () => ({        
        email: "",
        password: "",
        user: null,
        showPassword: false,
        emailRules: [
          v => !!v || 'E-mail is required',
        ],
      }),

      methods: {
        async login(e) {
          await axios
          .post("http://localhost:8080/login", {
            params: {
              email: this.email,
              password: this.password,
            },
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            this.user = res;
            this.setLoginStatus();
            this.redirectToDashboard();
          })
          .catch((err) => {
            console.log(err);
          });
        },

        setLoginStatus() {
            document.cookie =
                "verification_string=test_verification_" +
                this.user.username +
                ";secure;" +
                "samesite=lax;" +
                "max-age=60*60*24*15;";
        },

        redirectToDashboard() {
          console.log(this.user.username + " logged in");
          this.$router.replace({ name: "dashboard", params: {user: this.user} }) 
        }
      }
    }
</script>
