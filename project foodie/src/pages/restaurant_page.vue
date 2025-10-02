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
  <div v-if="restaurant" class="title">
    <div class="rest-head">
      <h2>{{ restaurant.name }}</h2>
      <h3 class="rating">{{ restaurant.rating }} / 5.0</h3>
      <p class="review-count">({{ restaurant.reviewCount }})</p>
      <h5 class="price-range">TWD ${{ restaurant.priceRange }} / 每人</h5>
    </div>
    <div class="contact">
      <h5>
        <i class="fa-solid fa-location-dot"></i>
        {{ restaurant.address }}
      </h5>
      <h5>
        <i class="fa-solid fa-phone"></i>
        {{ restaurant.contactPhone }}
      </h5>
    </div>
  </div>

  <!-- 錯誤 -->
  <div v-else>
    <h2 class="text-center">找不到該餐廳。</h2>
  </div>
  <!-- 錯誤 -->
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.rest-head,
.contact {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.rest-head {
  margin-bottom: 2.5rem;
}

.rating {
  color: var(--color-primary-dbrown);
}

.review-count {
  color: var(--color-primary-brown);
}

.price-range {
  color: var(--color-brown-200);
}
</style>
