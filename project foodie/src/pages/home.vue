<script setup>
import Home_search from "../components/home_search.vue";
import Home_recommendations from "../components/home_recommendations.vue";
import Home_coupon from "../components/home_coupon.vue";
import Home_ranking from "../components/home_ranking.vue";
</script>

<template>
  <div class="content search-bar">
    <Home_search></Home_search>
  </div>
  <div class="content">
    <Home_recommendations></Home_recommendations>
  </div>
  <div class="content">
    <Home_coupon></Home_coupon>
  </div>
  <div class="content">
    <Home_ranking></Home_ranking>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: var(--home-section-gap);
}

.search-bar {
  min-height: calc(100vh - 48px);
}
</style>
