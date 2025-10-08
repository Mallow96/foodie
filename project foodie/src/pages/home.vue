<script setup>
import Home_search from "../components/home_search.vue";
import Home_recommendations from "../components/home_recommendations.vue";
import Home_coupon from "../components/home_coupon.vue";
</script>

<template>
  <div class="content">
    <Home_search></Home_search>
    <Home_recommendations></Home_recommendations>
    <Home_coupon></Home_coupon>
  </div>
</template>

<style scoped>
.content {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: var(--home-section-gap);
}

section {
  &:first-child {
    margin-top: var(--home-section-gap);
  }

  &:last-child {
    margin-bottom: var(--home-section-gap);
  }
}
</style>
