<template>
  <div>
    
    <v-main>

    
    <v-app-bar
      color="teal"
      dense
      dark
      app
    >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>
            <span class="font-weight-light">Mzansi</span>
            <span>Groceries</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>



    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="">
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title>
                {{ userName1 }}
            </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
            <v-list-item-content>
                <router-link 
                class="router_link" 
                to="/"
                >
                    <v-btn block color="teal" dark>Home</v-btn>
                </router-link>

                
                <router-link 
                class="router_link" 
                to="/register"
                >
                    <v-btn block color="teal" dark>Register</v-btn>
                </router-link
                
                >
                <router-link 
                class="router_link" 
                to="/login"
                >
                    <v-btn block color="teal" dark>Login</v-btn>
                </router-link>





            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
            link
            >
            <v-list-item-content>
                <v-list-item-title>Personal</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
            <router-link 
            class="router_link" 
            to="/shopping_cart"
            >
                <v-btn block color="">My Shopping Cart</v-btn>
            </router-link>
        </v-list>

    </v-navigation-drawer>

    
    <router-view/>


    </v-main>
  </div>
</template>
<script>

import { mapGetters } from 'vuex';
// import VueJwtDecode from 'vue-jwt-decode';


export default {
    name: 'NavBar',
    components: {
        
    },
    // methods: {
    //     ...mapActions(['fetchProfile']),
    // },
    data() {
        return {
            drawer: false
        }
    },
    computed: {
        ...mapGetters(['userName1', 'userjwt', 'user_profile']),
    }, 
    created() {
        // let user_id = VueJwtDecode.decode(this.$store.getters.userjwt).user_id
        // this.fetchProfile(user_id);
    },
}
</script>

<style>

.router_link{
    text-decoration: none; color: inherit;
}

</style>