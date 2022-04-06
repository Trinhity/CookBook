<template>
<v-app>
  <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-tabs 
        v-model="tab" 
        show-arrows 
        background-color="#9C6644" 
        icons-and-text 
        dark 
        grow
      >
        <v-tabs-slider color="#9C6644"></v-tabs-slider>
        <v-tab 
          v-for="i in tabs" 
          :key="i.name"
        >
          <v-icon large>{{ i.icon }}</v-icon>
          <div class="caption py-1">{{ i.name }}</div>
        </v-tab>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form 
                ref="loginForm" 
                v-model="valid" 
                lazy-validation
              >
                <v-row>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="login.email" 
                      :rules="loginEmailRules" 
                      label="E-mail" 
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="login.password" 
                      :append-icon="show ? 'eye':'eye-off'" 
                      :rules="passwordRules" 
                      :type="show ? 'text' : 'password'" 
                      name="input-10-1" 
                      label="Password" 
                      hint="At least 8 characters" 
                      counter 
                      @click:append="show = !show"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12">
                  </v-col>

                  <v-spacer></v-spacer>

                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn 
                      x-large 
                      block 
                      :disabled="!valid" 
                      outlined
                      color="#9C6644" 
                      @click="loginUser"
                    >
                      Login 
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form 
                ref="registerForm" 
                v-model="valid" 
                lazy-validation
              >
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                      v-model="registration.firstname" 
                      label="First Name" 
                      maxlength="20" 
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field 
                      v-model="registration.lastname" 
                      label="Last Name"
                      maxlength="20" 
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="registration.email" 
                      :rules="emailRules" 
                      label="E-mail"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
                      v-model="registration.password" 
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                      :rules="passwordRules" 
                      :type="show ? 'text' : 'password'" 
                      name="input-10-1" 
                      label="Password" 
                      hint="At least 8 characters" 
                      counter 
                      @click:append="show = !show"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field 
                      block 
                      v-model="registration.verify" 
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                      :rules="[passwordMatch]" 
                      :type="show ? 'text' : 'password'"
                      name="input-10-1" 
                      label="Confirm Password" 
                      counter 
                      @click:append="show = !show"
                      required
                     ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                    <v-btn 
                      x-large 
                      block 
                      :disabled="!valid" 
                      outlined
                      color="#9C6644" 
                      @click="registerUser"
                    >
                      Register
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</v-app>
</template>
 
<script>
  export default {
      name: "Login",
      data: () => ({
        dialog: true,
        tab: 0,
        tabs: [
            {name:"Login", icon:"mdi-account"},
            {name:"Register", icon:"mdi-account-outline"}
        ],

        valid: true,
        registration: {
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          verify: "",
        },
        
        login: {
          password: "",
          email: "",
        },
        
        loginEmailRules: [
          value => !!value || "Required",
          value => /.+@.+\..+/.test(value) || "E-mail must be valid"
        ],

        emailRules: [
          value => !!value || "Required",
          value => /.+@.+\..+/.test(value) || "E-mail must be valid"
        ],

        show: false,
        passwordRules: [
          value => (value && value.length >= 8) || "Min 8 characters"
        ],

        passwordMatchRules: [
          value => (value && value == this.registration.password) || "Passwords must match"
        ]
      }),

      computed: {
        passwordMatch() {
          return () => this.registration.password == this.registration.verify || "Password must match";
        }
      },

      methods: {
        /**
         * Sends user login inputs to server and validates user info
         */
        async loginUser() {
          try {
            let response = await this.$http.post("/user/login", this.login);
            let token = response.data.token;
            localStorage.setItem("jwt", token);
            if (token) {
              console.log("Successful login");
              this.setLoginStatus();
              this.$router.push({ name: "dashboard" });
            }
          } catch (err) {
            console.log(err.message);
          }
        },

        /**
         * Creates a new user and stores their first name, last name, email, and hashed password to the database
         */
        async registerUser() {
          const res = await this.$http.post("/user/register", this.registration)
          .then(res => {
            console.log(res);
            const token = res.data.token;
            if (token) {
              localStorage.setItem("jwt", token);
              console.log("Successful registration");
              // Send user to email confirmation page WIP
              this.$router.push("/");
              
            } else {
              console.log("Something went wrong");
            }
          }).catch (err => {
            console.log(err);
            if (err.status == 409) {
              console.log(err.message);
            } else {
              console.log(err.message);
            }
          });
        },

        setLoginStatus() {
            document.cookie =
                "verification_string=test_verification_" +
                this.login.email
                ";secure;" +
                "samesite=lax;" +
                "max-age=60*60*24*15;";
        },
      },

    }
</script>
