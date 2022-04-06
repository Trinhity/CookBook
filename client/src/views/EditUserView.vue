<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title color="#9C6644">Edit Profile</v-card-title>
                    <v-divider></v-divider>
                    <v-form 
                        ref="loginForm" 
                        v-model="valid" 
                        lazy-validation
                        @submit.prevent="editUser"
                    >
                        <v-row>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field 
                                    v-model="firstname" 
                                    label="First Name" 
                                    maxlength="20" 
                                >
                                    <span>{{ firstname }}</span>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field 
                                    v-model="lastname" 
                                    label="Last Name"
                                    maxlength="20" 
                                >
                                    <span>{{ lastname }}</span>
                                </v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12" sm="4" md="4">
                                <v-avatar size="100">
                                    <v-img 
                                        src="https://media.istockphoto.com/photos/portrait-of-a-funny-chicken-closeup-isolated-on-white-background-picture-id1132026121?s=612x612"
                                    ></v-img> 
                                </v-avatar>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="email" 
                                    label="E-mail" 
                                    disabled
                                >
                                    <span>{{ email }}</span>
                                </v-text-field>
                            </v-col>
                        
                            <v-col class="d-flex" cols="12" sm="6" xsm="12">
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="oldPassword" 
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :rules="passwordRules" 
                                    :type="show ? 'text' : 'password'" 
                                    name="input-10-1" 
                                    label="Current Password" 
                                    @click:append="show = !show"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                    block 
                                    v-model="newPassword" 
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :rules="passwordMatchRules" 
                                    :type="show ? 'text' : 'password'"
                                    name="input-10-1" 
                                    label="New Password" 
                                    counter 
                                    @click:append="show = !show"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                    block 
                                    v-model="verify" 
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :rules="passwordMatchRules" 
                                    :type="show ? 'text' : 'password'"
                                    name="input-10-1" 
                                    label="Confirm New Password" 
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
                                >
                                    <span class="text-wrap" style="width: min-content; margin: auto;">
                                        Save Changes
                                    </span>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card> 
            </v-col>
        </v-row>
        <NavBar />
    </v-container>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "EditUser",
        data: () => ({
            tab: 0,
            tabs: [
                {name:"User", icon:"mdi-account"},
                {name:"Password", icon:"mdi-account-outline"}
            ],
            user: null,
            firstname: "",
            lastname: "",
            email: "",
            oldPassword: "",
            newPassword:"",
            verify: "",

            valid: true,
            show: false,

            passwordMatchRules: [
                value => (value && value === this.newPassword) || "Passwords must match"
            ]
        }),

        components: {
            NavBar
        },

        async created() {
            this.getUserDetails();
        },

        methods: {
            getUserDetails() {
                let token = localStorage.getItem("jwt");
                let decoded = VueJwtDecode.decode(token);
                this.user = decoded;
                this.firstname = this.user.fname;
                this.lastname = this.user.lname;
                this.email = this.user.email;
                console.log(this.user);
            },

            async editUser() {
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
            }
        }
    }
</script>
