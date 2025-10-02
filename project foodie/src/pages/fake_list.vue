<script setup>
import { useRestStore } from "../store/restaurants_store"; // 引入 store

const restStore = useRestStore(); // 呼叫 store 實例
</script>

<template>
  <h1>these are restaurants</h1>
  <ul>
    <li v-for="restaurant in restStore.restaurants" :key="restaurant.id">
      <router-link :to="`/restaurant/${restaurant.id}`">
        {{ restaurant.name }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped></style>
