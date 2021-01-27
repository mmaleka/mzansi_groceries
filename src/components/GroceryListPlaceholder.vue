<template>
    <v-container class="grey lighten-5">
        <v-row no-gutters>

        <v-col 
        cols="6"
        sm="6"
        md="4"
        v-for="i in 10"
        :key="i"
        >
        <v-card
        class="mx-auto"
        max-width="400"
        >
        <v-img
        class="white--text align-end"
        height="120px"
        src="@/assets/Curve-Loading.gif"
        >
        </v-img>

        <v-card-subtitle class="pb-0">
        ...
        </v-card-subtitle>

        <v-card-text class="text--primary">
        <div>...</div>
        </v-card-text>

        <v-card-actions>
        <v-btn
            color="orange"
            text
            block
            disabled
        >
            ...
        </v-btn>
        </v-card-actions>
        </v-card>
        </v-col>







        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'GroceryListPlaceholder',
    
    
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },

  }
</script>
