 <template>
    <v-container>
        <v-card width="700" tile>
            <v-img height="70%" src="https://media.istockphoto.com/photos/chickens-on-traditional-free-range-poultry-farm-picture-id803406120?s=612x612"></v-img>
            <v-col>   
                <v-hover>
                    <template v-slot:default="{ hover }">
                        <v-avatar size="100" style="position:absolute; top: 58%">
                            <v-img 
                                src="https://media.istockphoto.com/photos/portrait-of-a-funny-chicken-closeup-isolated-on-white-background-picture-id1132026121?s=612x612"
                                @click="changeProfilePic"
                                :elevation="hover ? 24 : 2"
                                :class="{ 'on-hover': hover }"
                            ></v-img> 
                        </v-avatar>
                    </template>
                </v-hover>       
            </v-col>
            <v-row>
                <v-col >
                    <v-list>
                        <v-list-item >
                            <v-list-item-content>
                                <v-list-item-title class="title">{{ user.fname + " " + user.lname }}</v-list-item-title>
                                <v-list-item-subtitle>Certified chicken</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-spacer></v-spacer>
                <v-col>
                    <v-container>
                        <router-link to='/edituserprofile'>
                            <v-btn
                                outlined
                                color="#9C6644"
                            >
                                Edit User Profile
                            </v-btn>
                        </router-link>
                    </v-container>
                </v-col>
            </v-row>
        </v-card>
        <NavBar />
    </v-container>
</template>

<script>
    import NavBar from "../components/NavBar.vue";
    import VueJwtDecode from "vue-jwt-decode";

    export default {
        name: "UserProfile",
        data: () => ({
            user: null,
        
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
            },

            changeProfilePic() {
                console.log("here");
            }
        }


    }
</script>
