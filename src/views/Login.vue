<template>
  <div>
    <LoginComp v-on:log-in="login" />
  </div>
</template>

<script>
import LoginComp from '@/components/LoginComp';
// import { mapGetters, mapActions } from 'vuex';
// import VueJwtDecode from 'vue-jwt-decode';


export default {
  name: 'Login',
  components: {
    LoginComp,
  },
  computed: {
    currentUser() {
      return this.$store.getters.isLoggedIn
    },
    // ...mapGetters(['user_profile']),
  },
  methods: {
    login: function(logindata) {
        let username = logindata.username
        let password = logindata.password
        this.$store.dispatch('obtainToken', { username, password })
      },
    // ...mapActions(['fetchProfile']),
  },


  mounted() {
      console.log("login component mounted");
      this.$store.dispatch('viewTrackerCount', 'groceries login')
    },
}
</script>

<style>

</style>