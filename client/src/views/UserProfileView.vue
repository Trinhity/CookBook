 <template>
    <v-container>
        <v-card width="700" tile>
            <v-img height="70%" src="https://media.istockphoto.com/photos/chickens-on-traditional-free-range-poultry-farm-picture-id803406120?s=612x612"></v-img>
            
            <v-col>   
                <v-avatar size="100" style="position:absolute; top: 55%">
                    <v-hover v-slot="{ hover }">
                        <v-img 
                            src="https://media.istockphoto.com/photos/portrait-of-a-funny-chicken-closeup-isolated-on-white-background-picture-id1132026121?s=612x612"
                            @click="changeProfilePic"
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }"
                        ></v-img> 
                    </v-hover>
                </v-avatar>
            </v-col>
            <v-col>
                <v-list>
                    <v-list-item color="rgba(0, 0, 0, .4)">
                        <v-list-item-content>
                            <v-list-item-title class="title">{{ user.fname + " " + user.lname }}</v-list-item-title>
                            <v-list-item-subtitle>Certified chicken</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-ite>
                        <router-link to='/edituser'>
                            <v-btn
                                outlined
                                color="#9C6644"
                            >Edit</v-btn>
                        </router-link>
                    </v-list-ite>
                </v-list>
            </v-col>
                
    

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

<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 1;
 }
</style>