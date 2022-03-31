<template>
    <v-container>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
                    <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="First name"
                        required
                    ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                    <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Last name"
                        required
                    ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                        md="4"
                    >
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
      
        <NavBar />
    </v-container>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "EditUser",
        data: () => ({

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
                console.log(this.user.fname);
            },
        }
    }
</script>
