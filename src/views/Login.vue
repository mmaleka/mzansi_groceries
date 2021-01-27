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
    // let user_id = VueJwtDecode.decode(this.$store.getters.userjwt).user_id
    // this.fetchProfile(user_id);
  }
}
</script>

<style>

</style>