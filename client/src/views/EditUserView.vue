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
                            <v-col>
                                <v-container>
                                    <v-img style="max-width:100%; max-height:20%;" src="https://media.istockphoto.com/photos/chickens-on-traditional-free-range-poultry-farm-picture-id803406120?s=612x612"></v-img>
                                </v-container>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-container>                                                                                          
                                    <v-hover>
                                        <template v-slot:default="{ hover }">
                                            <v-avatar size="300">
                                                <v-img 
                                                    src="https://media.istockphoto.com/photos/portrait-of-a-funny-chicken-closeup-isolated-on-white-background-picture-id1132026121?s=612x612"
                                                    @click="changeProfilePic"
                                                    :elevation="hover ? 24 : 2"
                                                    :class="{ 'on-hover': hover }"
                                                ></v-img>                                           
                                            </v-avatar>
                                        </template>
                                    </v-hover>
                                    <v-row>
                                        <v-col>
                                            <v-text-field 
                                                v-model="edit.firstname" 
                                                label="First Name" 
                                                maxlength="20" 
                                            >
                                                <span>{{ edit.firstname }}</span>
                                            </v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field 
                                                v-model="edit.lastname" 
                                                label="Last Name"
                                                maxlength="20" 
                                            >
                                                <span>{{ edit.lastname }}</span>
                                            </v-text-field>
                                        </v-col>                                      
                                    </v-row>
                                </v-container>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="edit.email" 
                                    label="E-mail" 
                                    disabled
                                >
                                    <span>{{ edit.email }}</span>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="edit.oldPassword" 
                                    :type="'password'" 
                                    name="input-10-1" 
                                    label="Current Password" 
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    block 
                                    v-model="edit.newPassword" 
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :rules="passwordRules" 
                                    :type="show ? 'text' : 'password'"
                                    name="input-10-1" 
                                    label="New Password" 
                                    counter 
                                    @click:append="show = !show"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    block 
                                    v-model="edit.verify" 
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" 
                                    :rules="[passwordMatch]" 
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
            edit: {
                firstname: "",
                lastname: "",
                email: "",
                oldPassword: "",
                newPassword:"",
                verify: "",
            },
            

            valid: true,
            show: false,

            passwordRules: [
                value => (value && value.length >= 8) || "Min 8 characters"
            ],
        }),

        computed: {
            passwordMatch() {
                return () => this.edit.newPassword == this.edit.verify || "Password must match";
            }
        },

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
                this.edit.firstname = this.user.fname;
                this.edit.lastname = this.user.lname;
                this.edit.email = this.user.email;
                console.log(this.user);
            },

            changeProfilePic() {

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
