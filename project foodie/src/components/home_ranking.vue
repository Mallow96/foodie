<script setup>
import { useFoodStore } from "../store/foodie_store"; // 引入 store
const store = useFoodStore();

function scrollRanking(id, direction) {
  const container = document.querySelectorAll(".ranking1-container");

  const scrollAmount = container[id].clientWidth;
  const tolerance = 10;

  const maxScrollLeft = container[id].scrollWidth - container[id].clientWidth;
  const isAtEnd = container[id].scrollLeft >= maxScrollLeft - tolerance; // 允許 10px 的誤差範圍

  if (direction === 1 && isAtEnd) {
    // 如果向右滾動且已到達最右端，回到開始位置
    container[id].scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else if (direction === -1 && container[id].scrollLeft <= tolerance) {
    // 如果向左滾動且已到達最左端，跳到最右端
    container[id].scrollTo({
      left: maxScrollLeft,
      behavior: "smooth",
    });
  } else {
    container[id].scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}

//隨機生成推薦餐廳id，模擬演算法
const randomIds = store.randomIdGenerator(10, 1001, 1300);
const randomIds2 = store.randomIdGenerator(10, 1001, 1300);
const randomIds3 = store.randomIdGenerator(10, 1001, 1300);

const restaurantsRanking1 = [];
const restaurantsRanking2 = [];
const restaurantsRanking3 = [];

for (const id of randomIds) {
  restaurantsRanking1.push(store.getRestaurantInfo(id));
}
for (const id of randomIds2) {
  restaurantsRanking2.push(store.getRestaurantInfo(id));
}
for (const id of randomIds3) {
  restaurantsRanking3.push(store.getRestaurantInfo(id));
}
</script>

<template>
  <section>
    <div class="section-title">
      <h2 class="main-title">找點吃！人氣榜單</h2>
      <p class="sub-title">不想踩雷？跟著排行榜吃就對了！</p>
    </div>

    <div class="scroll-group">
      <!-- 評分排行 -->
      <div class="scrollbar">
        <h5>評分排行</h5>
        <button class="scroll-btn left" @click="scrollRanking(0, -1)">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="ranking1-container">
          <div class="card" v-for="(item, index) in restaurantsRanking1">
            <router-link :to="`/restaurant/${item.id}`">
              <div class="card-img-container">
                <img
                  :src="item.imageUrl"
                  :alt="item.name"
                  class="card-img-top"
                />
                <div class="card-tag">{{ index + 1 }}</div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-address">{{ item.address }}</p>
                <div class="rating">
                  <span class="rating-score">{{ item.rating }}</span>
                  <div
                    class="stars-outer"
                    :style="{ '--rating': item.rating.toFixed(1) }"
                  >
                    ★★★★★
                    <div class="stars-inner">★★★★★</div>
                  </div>
                  <span class="score-amount">({{ item.reviewCount }})</span>
                </div>
                <div class="">
                  <button class="arrow-btn">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <button class="scroll-btn right" @click="scrollRanking(0, 1)">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <!-- 收藏排行 -->
      <div class="scrollbar">
        <h5>收藏排行</h5>
        <button class="scroll-btn left" @click="scrollRanking(1, -1)">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="ranking1-container">
          <div class="card" v-for="(item, index) in restaurantsRanking2">
            <router-link :to="`/restaurant/${item.id}`">
              <div class="card-img-container">
                <img
                  :src="item.imageUrl"
                  :alt="item.name"
                  class="card-img-top"
                />
                <div class="card-tag">{{ index + 1 }}</div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-address">{{ item.address }}</p>
                <div class="rating">
                  <span class="rating-score">{{ item.rating }}</span>
                  <div
                    class="stars-outer"
                    :style="{ '--rating': item.rating.toFixed(1) }"
                  >
                    ★★★★★
                    <div class="stars-inner">★★★★★</div>
                  </div>
                  <span class="score-amount">({{ item.reviewCount }})</span>
                </div>
                <div class="">
                  <button class="arrow-btn">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <button class="scroll-btn right" @click="scrollRanking(1, 1)">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <!-- 回頭率排行 -->
      <div class="scrollbar">
        <h5>回頭率排行</h5>
        <button class="scroll-btn left" @click="scrollRanking(2, -1)">
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <div class="ranking1-container">
          <div class="card" v-for="(item, index) in restaurantsRanking3">
            <router-link :to="`/restaurant/${item.id}`">
              <div class="card-img-container">
                <img
                  :src="item.imageUrl"
                  :alt="item.name"
                  class="card-img-top"
                />
                <div class="card-tag">{{ index + 1 }}</div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-address">{{ item.address }}</p>
                <div class="rating">
                  <span class="rating-score">{{ item.rating }}</span>
                  <div
                    class="stars-outer"
                    :style="{ '--rating': item.rating.toFixed(1) }"
                  >
                    ★★★★★
                    <div class="stars-inner">★★★★★</div>
                  </div>
                  <span class="score-amount">({{ item.reviewCount }})</span>
                </div>
                <div class="">
                  <button class="arrow-btn">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <button class="scroll-btn right" @click="scrollRanking(2, 1)">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  place-content: center;
}

.section-title {
  text-align: center;
}

.main-title {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 700;
}

.sub-title {
  font-size: 20px;
  margin-bottom: 24px;
  font-weight: 600;
}

.scroll-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.scrollbar {
  position: relative;
}

/* cards */

.ranking1-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  gap: calc(4% / 3);
}

.ranking1-container::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 24%;
  border-radius: 15px;
  border: none;
  transition: transform 0.3s ease;
  overflow: hidden;
  scroll-snap-align: start;

  a {
    color: black;
    height: 100%;
  }

  &:hover {
    .card-body {
      background-color: var(--color-yellow-300);
    }

    .arrow-btn {
      background-color: var(--color-primary-dbrown);
      color: white;
    }
  }
}

.card-img-top {
  height: 150px;
  object-fit: cover;
  width: 100%;
}

.card-body {
  padding: 1rem;
  position: relative;
  height: 100%;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-address {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-score {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.score-amount {
  color: #966f53;
  font-size: 16px;
  font-weight: 600;
}

.stars {
  color: #ffc107;
}

.arrow-btn {
  /* position: absolute; */
  /* bottom: 15px; */
  /* right: 15px; */
  margin-left: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0e7d3;
  color: #4f0201;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: black;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scroll-btn.left {
  left: -20px;
}

.scroll-btn.right {
  right: -20px;
}

.scroll-btn:hover {
  background-color: #f8f9fa;
}

.card-tag {
  position: absolute;
  background: #f0e7d3;
  top: 0;
  left: 0;
  color: #da1e28;
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 600;
  border-bottom-right-radius: 6px;
  z-index: 2;
}

.card-img-container {
  position: relative;
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
