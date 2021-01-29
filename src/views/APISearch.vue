<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row align="center" justify="center">
        <v-card>
          <v-card-title class="headline red lighten-3">
            Search for grocery items
          </v-card-title>
          <v-card-text>
            Explore hundreds of grocery items on popular shopping stores
            such as PNP, Shoprite or Checkers
          </v-card-text>
          <v-card-text>
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              color="white"
              hide-no-data
              hide-selected
              item-text="Description"
              item-value="API"
              label="Search for grocery items"
              placeholder="Start typing to Search"
              prepend-icon="mdi-database-search"
              return-object
            ></v-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list
              v-if="model"
              class="lighten-3"
            >
              <v-img
          class="white--text align-end"
          contain
          v-bind:src = fields[3].value
          align="center"
          justify="center"
          width="250px"
          >
          </v-img>
              <v-list-item>
                <v-list-item-content>
                  
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="fields[1].value"></v-list-item-title>
                  <v-list-item-subtitle>Item Name</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="fields[4].value"></v-list-item-title>
                  <v-list-item-subtitle>Shop Name</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="fields[2].value"></v-list-item-title>
                  <v-list-item-subtitle>Price</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-col cols="8">
                    <router-link to = "/register">
                      <v-btn block type="submit" value="Submit" color="teal" dark>Add to shopping cart</v-btn>
                    </router-link>
                  </v-col>
                  <router-view></router-view>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'APISearch',
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }),

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.item_name.length > this.descriptionLimit
            ? entry.item_name.slice(0, this.descriptionLimit) + '...'
            : entry.item_name

          return Object.assign({}, entry, { Description })
        })
      },
    },

    watch: {
      search (val) {
        console.log("val: ", val);
        if (val.length > 3){
          this.$store.dispatch('getAPISearchText', val)
        }
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://try-coding.herokuapp.com/api-mzansi_groceries/all_departments_search/')
          .then(res => res.json())
          .then(res => {
            const { count, results } = res
            this.count = count
            this.entries = results
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },

    created() {
      this.$store.dispatch('fetchGroceries')
      this.$store.dispatch('updateGroceryCount', 'SearchAPIView')
    },


  }
</script>

<style>

</style>