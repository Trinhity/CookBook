<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar dark color="#9C6644">
                        <v-toolbar-title>
                            Registration
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <form 
                            ref="form" 
                            @submit.prevent="registerNewUser"
                        >
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
                                v-model="username"
                                name="username"
                                label="Username"
                                type="text"
                                placeholder="Danny DeVito"
                                required
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-model="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm password"
                                required
                            ></v-text-field>

                            <div class="red--text"> {{ errorMessage }}</div>
                                <v-btn 
                                    type="submit" 
                                    class="mt-4" 
                                    color="#9C6644" 
                                    value="log in"
                                    outlined
                                >
                                    Register
                                </v-btn>
                        </form>
                    </v-card-text>
                </v-card>           
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
      errorMessage: "",
        register :{
            name: 'Register',
            message: 'Aleady have an Account?'
        },
 
    }
},
 
  methods: {

    registerNewUser() {
       if (this.password == this.confirmPassword) {
          this.errorMessage = "";
          this.$refs.form.reset();

          // send data to database here
        
       }
       else {
         this.errorMessage = "Passwords did not match"
       }
    }
  },
      
};
</script>