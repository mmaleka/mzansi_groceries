<template>
    <v-container class="grey lighten-5">
        <v-row v-if="isLoaded" no-gutters>
          <v-col
          cols="6"
          sm="3"
          md="2"
          v-for="item in groceries_data_results"
          :key="item.id"
          >
          <v-card
          class="mx-2"
          max-width="450"
          >
          <v-img
          class="white--text align-end"
          contain
          v-bind:src = item.item_name_image
          align="center"
          justify="center"
          >
          </v-img>

          <v-card-subtitle class="pb-0">
          <p v-line-clamp:20="2">{{ item.item_name }}</p>
          </v-card-subtitle>

          <v-card-text class="text--primary">
          <div>R{{ item.current_price }} <span><h3 class="bold">{{ item.shop_name }}</h3></span></div>
          </v-card-text>

          <v-card-actions>
          <v-btn
              color="orange"
              text
              block
              disabled
          >
              Add to Cart
          </v-btn>
          </v-card-actions>
          </v-card>
          </v-col>

        </v-row>

        

        <v-row v-else>
          <GroceryListPlaceholder />
        </v-row>

        <v-row 
        align-center justify-center
        no-gutters
        >
          <v-col
          cols="12"
          sm="12"
          md="12"
          class="mt-10"
          
          >
          <div class="text-center">
            <v-btn
            v-on:click="load_more_data()"
            rounded
            color="primary"
            dark
            >
              LOAD MORE
            </v-btn>
          </div>

          </v-col>
        </v-row>

        
    </v-container>
</template>



<script>

import GroceryListPlaceholder from '@/components/GroceryListPlaceholder.vue'
import { mapGetters, mapState } from 'vuex';


export default {
  name: 'GroceryList',
  components: {
    GroceryListPlaceholder
  },
  
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    load_more_data: function () {
      const loadmoreData = {
        filter_url: this.groceries_data_pagination.next,
      }
      console.log("this.groceries_data_pagination.next: ", this.groceries_data_pagination.next);
      this.$store.dispatch('updateGroceries', loadmoreData)
    },

  },

  computed: {
    ...mapState(['groceries_data_results', 'groceries_data_pagination']),
    ...mapGetters(['all_groceries']),
    isLoaded() {
      if (this.groceries_data_results.length >= 1) {
        console.log("data is there");
        // send to analytics that someone viewed this component
        return true
      } else {
        console.log("no data");
        return false
      }
    }
  },

  created() {
    console.log("component created");
    this.$store.dispatch('fetchGroceries')
  },

  mounted() {
    console.log("grocery component mounted");
    this.$store.dispatch('updateGroceryCount', 'GroceryCountView')
  },



}
</script>
