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
      <h2>搜尋結果</h2>
      <p v-if="currentKeyword">
        關鍵字：{{ currentKeyword }} (共找到 {{ store.results.length }} 筆結果)
      </p>

      <!-- 重新搜尋功能 -->
      <div class="search-container">
        <input
          v-model="newKeyword"
          @keyup.enter="onNewSearch"
          type="text"
          placeholder="輸入餐廳名稱"
        />
        <button @click="onNewSearch">重新搜尋</button>
      </div>
    </div>

    <!-- 搜尋結果 -->
    <div v-if="store.results.length === 0" class="no-results">
      <p>找不到符合「{{ currentKeyword }}」的餐廳。</p>
      <button @click="$router.push('/')">回到首頁</button>
    </div>

    <div v-else class="results-list">
      <div v-for="item in store.results" :key="item.id" class="restaurant-card">
        <router-link :to="`/restaurant/${item.id}`" class="card-body">
          <h3>{{ item.name }}</h3>
          <p class="address">{{ item.address }}</p>
          <p class="rating" v-if="item.rating">{{ item.rating.toFixed(1) }}</p>
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
  margin-bottom: 30px;
  text-align: center;
}

.search-container {
  display: flex;
  gap: 8px;
  max-width: 500px;
  margin: 20px auto;
}

input {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.no-results {
  text-align: center;
  padding: 40px;
}

.no-results button {
  background-color: #6c757d;
  margin-top: 20px;
}

.results-list {
  display: grid;
  gap: 20px;
}

.restaurant-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.restaurant-card h3 {
  color: #333;
}

.card-body {
  width: 100%;
  height: 100%;
}

.address {
  color: #666;
}

.phone,
.category {
  color: #888;
  font-size: 0.9rem;
}

.result-card {
  width: 1200px;
  height: 288px;
  background: white;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  margin-bottom: 20px;
}

.result-card:hover {
  background-color: #fff5c6;
}

.result-img {
  width: 220px;
  height: 288px;
}

.result-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-content {
  flex: 1;
  display: flex;
  padding: 24px;
}

.result-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-note {
  font-size: 16px;
  color: #966f53;
  margin: 0;
  padding: 2px;
  border: 1px solid #966f53;
}

.result-title {
  font-size: 40px;
  font-weight: 900;
  margin: 0;
}

.result-address {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.result-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-score {
  font-size: 32px;
  font-weight: 700;
  color: #4f0201;
}

.stars {
  color: #ffc107;
  font-size: 16px;
}

.rating-count {
  font-size: 16px;
  color: #966f53;
}

.result-price {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.result-desc {
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
}

.result-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
  padding-left: 20px;
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
  background: #966f53;
  color: #f0e7d3;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reservation-card {
  width: 804px;
  height: 284px;
  background: white;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  margin-bottom: 20px;
  padding: 32px;
}

.reservation-img {
  width: 220px;
  height: 220px;
}

.reservation-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reservation-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  margin: 0;
  padding: 0;
}

.reservation-info {
  flex: 1;
  margin-left: 40px;
}

.reservation-subtitle {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 16px 0;
}

.reservation-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reservation-date,
.reservation-address,
.reservation-phone {
  font-size: 16px;
  margin: 0;
}

.reservation-phone {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reservation-phone i {
  color: #4f0201;
}

.reservation-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: auto;
}

.edit-btn,
.cancel-btn {
  width: 80px;
  height: 40px;
  padding: 0;
  font-weight: 600;
  color: #f0e7d3;
  border: none;
  border-radius: 100px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #b89d8a;
}

.cancel-btn {
  background-color: #966f53;
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
