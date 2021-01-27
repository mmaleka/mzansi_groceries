<template>
  <v-bottom-navigation
    :value="value"
    color="teal"
    fixed
    grow
  >

  <router-link 
    class="router_link" 
    to="/"
    >
    <v-btn
    text
    outlined
    :class="{'text-none': true, clicked: individual == 'a relative'}"
    style="width: 100%; height: 100%;"
    @click="individual = 'a relative'; page++"
    >
      <v-col
        cols="12"
      >
        <v-row
          width="100%"
          style="place-content: center; margin-bottom: 12px;"
        >
          <v-icon
            large
            color="teal"
          >
            mdi-home
          </v-icon>
        </v-row>
        <v-row
          width="100%"
          style="place-content: center"
        >
          <span
            class="body-1"
            style="font-weight: bold;"
          >
            Home
          </span>
        </v-row>
      </v-col>
    </v-btn>
  </router-link>

  <router-link 
    class="router_link" 
    to="/api_search"
    >
    <v-btn
    text
    outlined
    :class="{'text-none': true, clicked: individual == 'a relative'}"
    style="width: 100%; height: 100%;"
    @click="individual = 'a relative'; page++"
    >
      <v-col
        cols="12"
      >
        <v-row
          width="100%"
          style="place-content: center; margin-bottom: 12px;"
        >
          <v-icon
            large
            color="teal"
          >
            mdi-card-search
          </v-icon>
        </v-row>
        <v-row
          width="100%"
          style="place-content: center"
        >
          <span
            class="body-1"
            style="font-weight: bold;"
          >
            Search
          </span>
        </v-row>
      </v-col>
    </v-btn>
  </router-link>

  <router-link 
      class="router_link" 
      to="/shopping_cart"
      >
    <v-btn
    text
    outlined
    :class="{'text-none': true, clicked: individual == 'a relative'}"
    style="width: 100%; height: 100%;"
    @click="individual = 'a relative'; page++"
    >
      <v-col
        cols="12"
      >
        <v-row
          width="100%"
          style="place-content: center; margin-bottom: 12px;"
        >
          <v-icon
            large
            color="teal"
          >
            mdi-cart
          </v-icon>
        </v-row>
        <v-row
          width="100%"
          style="place-content: center"
        >
          <span
            class="body-1"
            style="font-weight: bold;"
          >
            Cart
          </span>
        </v-row>
      </v-col>
    </v-btn>
    </router-link>
  



    
  </v-bottom-navigation>
</template>

<script>

import { mdiAccount } from "@mdi/js";

export default {
  name: 'BottomNav',
  data: () => ({ 
    value: 1, 
    icons: {
      mdiAccount
    }
    }),

  created() {
  },
}
</script>

<style>

.router_link{
    text-decoration: none; color: inherit;
}

</style>