<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRestStore } from "../store/restaurants_store";
import restaurantInfo from "../components/restaurant-info.vue";
import reservationCalendar from "../components/reservation_calendar.vue";

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
        <!-- 餐廳名稱 -->
        <h2>{{ restaurant.name }}</h2>
        <!-- 餐廳名稱 -->

        <!-- 餐廳評分 -->
        <h3 class="rating">{{ restaurant.rating.toFixed(1) }} / 5.0</h3>
        <!-- 餐廳評分 -->

        <!-- 星星評分 -->
        <div
          class="stars-outer"
          :style="{ '--rating': restaurant.rating.toFixed(1) }"
        >
          ★★★★★
          <div class="stars-inner">★★★★★</div>
        </div>
        <!-- 星星評分 -->

        <!-- 評論數 -->
        <p class="review-count">({{ restaurant.reviewCount }})</p>
        <!-- 評論數 -->

        <!-- 價位 -->
        <h5 class="price-range">TWD ${{ restaurant.priceRange }} / 每人</h5>
        <!-- 價位 -->
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
      <div class="col-8 pe-2">
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
      <div class="col-4">
        <reservationCalendar></reservationCalendar>
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

main {
  background-color: white;
  padding: 0 0.5rem;
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

/* 1. 外層容器：顯示空心星 (作為背景) */
.stars-outer {
  /* 確保元素可以設定寬度，且不換行 */
  display: inline-block;
  position: relative;

  /* 設置星星的字體大小和顏色 */
  font-size: 24px; /* 調整這個值來改變星星的大小 */
  color: lightgray; /* 空心星（背景）的顏色 */
  line-height: 1; /* 防止星星因為行高被撐開 */
  letter-spacing: 2px; /* 調整星星間距 */

  /* 讓 CSS 變數 --rating 可以在這裡被使用 */
  --rating: 0;
}

/* 2. 內層容器：顯示實心星 (作為前景覆蓋) */
.stars-inner {
  /* 絕對定位，讓它疊加在外層空心星上方 */
  position: absolute;
  top: 0;
  left: 0;

  /* **關鍵技巧：只顯示指定寬度範圍內的內容** */
  overflow: hidden;
  white-space: nowrap; /* 確保星星不會換行 */

  /* 實心星（前景）的顏色 */
  color: var(--color-primary-yellow);

  /* *** 魔法公式：根據分數計算寬度百分比 *** */
  /* (評分 / 總分 5) * 100% = 實心星需要覆蓋的寬度 */
  width: calc(var(--rating) / 5 * 100%);
}
</style>
