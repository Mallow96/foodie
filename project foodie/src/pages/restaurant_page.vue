<script setup>
import { useRoute } from "vue-router";
import { useRestStore } from "../store/restaurants_store";

const route = useRoute();
const restStore = useRestStore();
const id = route.params.id;

// 假設 restaurants 中每筆物件有唯一屬性 id
const restaurant = restStore.restaurants.find((r) => String(r.id) === id);
</script>

<template>
  <div v-if="restaurant">
    <h2>{{ restaurant.name }}</h2>
    <p>{{ restaurant.description }}</p>
    <!-- 依據格式繼續展開其他欄位 -->
  </div>
  <div v-else>
    <p>找不到該餐廳。</p>
  </div>
</template>
