<script setup>
import Home_search from "../components/home_search.vue";
import Home_recommendations from "../components/home_recommendations.vue";
</script>

<template>
  <main>
    <Home_search></Home_search>
    <Home_recommendations></Home_recommendations>
  </main>
</template>

<style scoped>
main {
  min-height: 80vh;
}
</style>
