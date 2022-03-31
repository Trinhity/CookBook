<template>
    <v-container>
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
