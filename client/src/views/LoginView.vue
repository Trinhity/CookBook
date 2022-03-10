<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      placeholder="example@hotmail.com"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      required
      label="Normal with hint text"
    ></v-text-field>
  </v-form>
</template>
 
<script>
  import axios from ('axios');
  export default {
      data: () => ({
        state = {
            email: "",
            pass: "",
        },
        valid: true,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }),

      methods: {
        myOnChangeUserId(e) {
            this.setState({ userId: e.target.value });
        },

        myOnChangePassword(e) {
            this.setState({ userPass: e.target.value });
        },

        loginUser(e) {
            e.preventDefault();
            axios
            .post("http://localhost:8080/login", {
                params: {
                    username: this.state.userId,
                    password: this.state.userPass,
                },
                headers: {
                    "content-type": "application/json",
                },
            })
            .then((res) => {
                console.log(res);
                this.setLoginStatus();
            })
            .catch((err) => {
                console.log(err);
            });
        },

        setLoginStatus() {
            document.cookie =
                "verification_string=test_verification_" +
                this.state.userId +
                ";secure;" +
                "samesite=lax;" +
                "max-age=60*60*24*15;";
        },
      }
    }
</script>

    );
  }
}

export default withTranslation()(MyLogin);
