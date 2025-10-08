<script setup>
import { useFoodStore } from "../store/foodie_store"; // 引入 store
const store = useFoodStore();

function scrollCards(direction) {
  const container = document.querySelector(".cards-container");
  const scrollAmount = 800;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

function scrollCoupons(direction) {
  const container = document.getElementById("couponsContainer");
  const scrollAmount = 570;

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

const randomIds = store.randomIdGenerator(10, 1001, 1300);
console.log(`已成功生成 ${randomIds.length} 個隨機且唯一的 ID：`);
console.log(randomIds);
</script>

<template>
  <section>
    <div class="section-title">
      <h2 class="main-title">找點吃！為您推薦</h2>
      <p class="sub-title">驚喜就在不經意間！滑一滑，找到你的下一間愛店。</p>
    </div>

    <div class="scrollbar">
      <button class="scroll-btn left" @click="scrollCards(-1)">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="cards-container">
        <div class="card" v-for="item in randomIds">
          <div class="card-img-container">
            <img src="../img/16.png" class="card-img-top" alt="餐廳圖片" />
            <div class="card-tag">熱門</div>
          </div>
          <div class="card-body">
            <h5 class="card-title">Le Petit Pain</h5>
            <p class="card-address">台北市大安區</p>
            <div class="rating">
              <span class="rating-score">4.82</span>
              <div class="stars">★★★★★</div>
              <span class="score-amount">(709)</span>
            </div>
            <button class="arrow-btn">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <button class="scroll-btn right" @click="scrollCards(1)">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<style scoped>
.section-title {
  text-align: center;
  margin: 48px 0 0;
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

.scrollbar {
  position: relative;
}

/* cards */

.cards-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}

.cards-container::-webkit-scrollbar {
  display: none;
}

.card {
  flex: 0 0 285px;
  height: 315px;
  border-radius: 15px;
  border: none;
  transition: transform 0.3s ease;
  overflow: hidden;
  scroll-snap-align: start;
}

.card-img-top {
  height: 150px;
  object-fit: cover;
  width: 100%;
}

.card-body {
  padding: 12px 16px 0px 16px;
  position: relative;
}

.card:hover .card-body {
  background-color: #fff5c6;
}

.card:hover .arrow-btn {
  background-color: #4f0201;
  color: #f0e7d3;
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
  position: absolute;
  bottom: 15px;
  right: 15px;
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
  background: white;
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
</style>
