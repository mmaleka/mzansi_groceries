<template>
  <div class="home">
    <GroceryList />
  </div>
</template>

<script>
// @ is an alias to /src
import GroceryList from '@/components/GroceryList.vue'

export default {
  name: 'Home',
  components: {
    GroceryList
  }
}
</script>
