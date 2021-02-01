<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="8" lg="8" xl="8" class="pa-md-4 mx-lg-auto">
          <!-- <h3 class="blue-grey--text pa-4">{{ user_profile.user_name2 }}</h3> -->
          <v-divider></v-divider>
          <p class="blue-grey--text pa-16">
            Hi welcome to your shopping cart.
          </p>
        </v-col>
          
      </v-row>
      <v-row align="top" justify="center">
        </v-row>
    </v-container>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'ShoppingCart',

  components: {
  },

  data: () => ({
  }),

  computed: {
    ...mapGetters(['all_groceries']),
  },

  created() {
    this.$store.dispatch('fetchGroceries')
    this.$store.dispatch('updateGroceryCount', 'ShoppingCartView')
  },

  mounted() {
      console.log("shopping cart component mounted");
      this.$store.dispatch('viewTrackerCount', 'shopping cart')
  },


}
</script>

<style>

</style>