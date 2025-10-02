<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRestStore } from "../store/restaurants_store";
import restaurantInfo from "../components/restaurant-info.vue";

const route = useRoute();
const restStore = useRestStore();
const id = route.params.id;

const activeTab = ref("info");
const setActiveTab = (tabName) => {
  activeTab.value = tabName;
};

// 假設 restaurants 中每筆物件有唯一屬性 id
const restaurant = restStore.restaurants.find((r) => String(r.id) === id);
</script>

<template>
  <main v-if="restaurant">
    <div class="banner">
      <img src="../assets/food stock/pexels-robinstickel-70497.jpg" alt="" />
    </div>

    <!-- 餐廳標題及主要資訊 -->
    <div class="title mt-4">
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
    <!-- 餐廳標題及主要資訊 -->

    <div class="row mt-4">
      <!-- 切換顯示區 -->
      <div class="col-9 pe-4">
        <!-- 切換tab -->
        <ul class="nav">
          <li class="nav-item" @click="setActiveTab('info')">
            <div class="nav-link">資訊</div>
          </li>
          <li class="nav-item" @click="setActiveTab('photo')">
            <div class="nav-link" href="#">照片</div>
          </li>
          <li class="nav-item" @click="setActiveTab('review')">
            <div class="nav-link" href="#">評論</div>
          </li>
        </ul>
        <!-- 切換tab -->

        <!-- 切換顯示內容 -->
        <div class="display">
          <div v-if="activeTab === 'info'">
            <!-- 資訊內容 -->
            <restaurantInfo></restaurantInfo>
          </div>
          <div v-if="activeTab === 'photo'">
            <!-- 照片內容 -->
            <p>這裡顯示餐廳照片...</p>
          </div>
          <div v-if="activeTab === 'review'">
            <!-- 評論內容 -->
            <p>這裡顯示餐廳評論...</p>
          </div>
          <!-- 切換顯示內容 -->
        </div>
      </div>
      <!-- 切換顯示區 -->

      <!-- 預訂 -->
      <div class="col-3">
        <div class="card" style="width: 18rem">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      <!-- 預訂 -->
    </div>
  </main>

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

.banner {
  width: 100%;

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    object-position: center;
  }
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

.nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-item {
  width: 33%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--color-brown-50);

  .nav-link {
    height: 3rem;
    display: flex;
    align-items: center;
    color: var(--color-brown-400);
  }
}

.nav-item:hover {
  cursor: pointer;
  background-color: var(--color-primary-beige);
  border-bottom: 2px solid var(--color-primary-orange);

  .nav-link {
    color: var(--color-primary-dbrown);
  }
}

.col-3 > div {
  width: 100% !important;
}

.display {
  margin-top: 1rem;
}
</style>
