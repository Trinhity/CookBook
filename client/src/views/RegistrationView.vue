<template>
    <v-container fluid fill-height>
        <v-layout 
            align-center 
            justify-center
        >
            <v-flex 
                xs12 
                sm8 
                md4
            >
                <v-card class="elevation-12">
                    <v-toolbar 
                        dark 
                        color="#9C6644"
                    >
                        <v-toolbar-title>
                            {{ isRegister ? state.register.name : state.login.name }}
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <form 
                            ref="form" 
                            @submit.prevent="isRegister ? register() : login()"
                        >
                            <v-text-field
                                v-model="username"
                                name="email"
                                label="E-mail"
                                type="text"
                                placeholder="example@outlook.com"
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

                            <v-text-field v-if="isRegister"
                                v-model="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                placeholder="cocnfirm password"
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
                                    {{ isRegister ? state.register.name : state.login.name }}
                                </v-btn>
                            <div 
                                class="grey--text mt-4" 
                                v-on:click="isRegister = !isRegister;"
                            >
                                {{ toggleMessage }}  
                            </div>
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
      confirmPassword: "",
      isRegister : false,
      errorMessage: "",
      state: {
         register :{
            name: 'Register',
            message: 'Aleady have an Account?'
         },
         login : {
            name: 'Login',
            message: 'Register'
         }
      }
    };
  },
  methods: {
    login() {
      console.log(this.username + " logged in")
    },
    register() {
       if (this.password == this.confirmPassword) {
          this.isRegister = false;
          this.errorMessage = "";
          this.$refs.form.reset();
       }
       else {
         this.errorMessage = "Passwords did not match"
       }
    }
  },
      computed: {
        toggleMessage : function() { 
          return this.isRegister ? this.state.register.message : this.state.login.message
        }
    }
};
</script>