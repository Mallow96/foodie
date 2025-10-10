<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFoodStore } from "../store/foodie_store";

const route = useRoute();
const router = useRouter();
const store = useFoodStore();

const currentKeyword = ref("");
const newKeyword = ref("");

onMounted(() => {
  // 從網址參數取得關鍵字
  currentKeyword.value = route.query.keyword || "";
  newKeyword.value = currentKeyword.value;

  // 如果有關鍵字就執行搜尋
  if (currentKeyword.value) {
    store.search(currentKeyword.value);
  }
});

function onNewSearch() {
  if (!newKeyword.value.trim()) {
    alert("請輸入搜尋關鍵字");
    return;
  }

  currentKeyword.value = newKeyword.value;
  store.search(newKeyword.value);

  // 更新網址參數
  router.replace({
    name: "searchResult",
    query: { keyword: newKeyword.value },
  });
}
</script>

<template>
  <div class="search-results">
    <div class="search-header">
      <div class="left">
        <h2>搜尋結果</h2>
        <p v-if="currentKeyword">
          (共找到
          {{ store.results.length }} 筆結果)
        </p>
      </div>

      <div class="right">
        <!-- 重新搜尋功能 -->
        <div class="search-container">
          <input
            v-model="newKeyword"
            @keyup.enter="onNewSearch"
            type="text"
            placeholder="輸入餐廳名稱"
            class="search-input rounded-pill"
          />
          <button @click="onNewSearch" class="rounded-pill">
            <i class="fa-solid fa-magnifying-glass"></i>
            搜尋
          </button>
          <button
            class="unfinished rounded-pill"
            @click="store.directUnfinished()"
          >
            <i class="fa-solid fa-sliders"></i>
            篩選條件
          </button>
          <button
            class="unfinished rounded-pill"
            @click="store.directUnfinished()"
          >
            <i class="fa-regular fa-map"></i>
            前往地圖
          </button>
        </div>
      </div>
    </div>

    <!-- 搜尋結果 -->
    <div v-if="store.results.length === 0" class="no-results">
      <p>找不到符合「{{ currentKeyword }}」的餐廳。</p>
      <button @click="$router.push('/')">回到首頁</button>
    </div>

    <div v-else class="results-list">
      <div v-for="item in store.results" :key="item.id" class="restaurant-card">
        <router-link :to="`/restaurant/${item.id}`" class="card-body row">
          <div class="col-3 result-img">
            <img :src="item.imageUrl" :alt="item.name" />
          </div>
          <div class="col-6 card-center">
            <h3>{{ item.name }}</h3>
            <p class="address">{{ item.address }}</p>
            <p class="rating" v-if="item.rating">
              {{ item.rating.toFixed(1) }}
            </p>
            <div class="stars">
              <div
                class="stars-outer"
                :style="{ '--rating': item.rating.toFixed(1) }"
              >
                ★★★★★
                <div class="stars-inner">★★★★★</div>
              </div>
            </div>
            <p class="phone" v-if="item.contactPhone">
              {{ item.contactPhone }}
            </p>
            <p class="category" v-if="item.contactPhone">{{ item.about }}</p>
            <p class="price-range" v-if="item.priceRange">
              TWD$ {{ item.priceRange }}
            </p>
          </div>
          <div class="col-3 result-actions">
            <button class="favorite-btn">
              <i class="fa-regular fa-heart"></i>
            </button>
            <button class="book-btn">
              前往預訂<i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.search-results {
  max-width: 800px;
  margin: 0 auto;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  display: flex;
  gap: 8px;
  margin: 20px auto;

  button {
    background-color: var(--color-primary-beige);
    color: var(--color-primary-dbrown);
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: none;

    .fa-sliders {
      rotate: 90deg;
    }
    &:hover {
      background-color: var(--color-beige-200);
    }
  }
}

input {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid var(--color-primary-brown);
}

.no-results {
  text-align: center;
  padding: 40px;
}

.no-results button {
  margin-top: 20px;
}

.results-list {
  display: grid;
  gap: 20px;
}

.restaurant-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  padding: 1rem;
  &:hover {
    background-color: var(--color-yellow-100);
  }
}

.restaurant-card h3 {
  color: #333;
}

.result-img {
  width: 25%;
  height: 11rem;
  overflow: hidden;
}

.result-img img {
  height: 100%;
  object-fit: cover;
}

.card-body {
  width: 100%;
  height: 100%;
  align-items: center;
}

.card-center {
  padding-left: 1rem;
}

.address {
  color: #666;
}

.phone,
.category {
  color: #888;
  font-size: 0.9rem;
}

.result-actions {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.favorite-btn {
  font-size: 32px;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6b2a2a;
  border: none;
  background: none;
  transition: all 0.3s ease;
}

.book-btn {
  padding: 12px 16px;
  background-color: transparent;
  color: var(--color-primary-dbrown);
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
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
