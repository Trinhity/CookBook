<template>
  <v-form
    lazy-validation
    @submit="loginUser"
  >
    <v-text-field
      v-model="state.email"
      :rules="emailRules"
      label="E-mail"
      placeholder="example@hotmail.com"
      required
    ></v-text-field>

    <v-text-field
      v-model="state.password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      required
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      name="input-10-1"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
  </v-form>
</template>
 
<script>
  import API from "../api"
  export default {
      name: "Login",
      data: () => ({
        state: {
            email: "",
            password: "",
        
        },
        user: null,
        showPassword: false,
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }),

      methods: {
        loginUser(e) {
          e.preventDefault();
          axios
          .post("http://localhost:8080/login", {
            params: {
              username: state.email,
              password: state.password,
            },
            headers: {
              "content-type": "application/json",
            },
          })
          .then((res) => {
            console.log(res);
            this.user = res;
            this.setLoginStatus();
          })
          .catch((err) => {
            console.log(err);
          });
        },

        setLoginStatus() {
            document.cookie =
                "verification_string=test_verification_" +
                this.state.email +
                ";secure;" +
                "samesite=lax;" +
                "max-age=60*60*24*15;";
        },
      }
    }
</script>
