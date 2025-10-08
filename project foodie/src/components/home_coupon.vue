<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function scrollCoupons(direction) {
  const container = document.getElementById("couponsContainer");
  const scrollAmount = container.clientWidth / 2 + 16;
  const tolerance = 10;

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const isAtEnd = container.scrollLeft >= maxScrollLeft - tolerance; // 允許 10px 的誤差範圍

  if (direction === 1 && isAtEnd) {
    // 如果向右滾動且已到達最右端，回到開始位置
    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  } else if (direction === -1 && container.scrollLeft <= tolerance) {
    // 如果向左滾動且已到達最左端，跳到最右端
    container.scrollTo({
      left: maxScrollLeft,
      behavior: "smooth",
    });
  } else {
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }
}

const directUnfinish = () => {
  router.push("/this-page-is-developing");
};
</script>

<template>
  <section>
    <div class="section-title">
      <h2 class="main-title">找點吃！獨家優惠券等你領</h2>
      <p class="sub-title">
        吃大餐不用再等特別節日！精選店家優惠券，讓你隨時都能犒賞自己。
      </p>
    </div>

    <div class="scrollbar">
      <button class="scroll-btn left" @click="scrollCoupons(-1)">
        <i class="fa-solid fa-chevron-left"></i>
      </button>

      <div class="coupons-container" id="couponsContainer">
        <div class="coupon-card" @click="directUnfinish">
          <div class="coupon-img">
            <img
              src="../assets/food stock/pexels-chitokan-2087748.jpg"
              alt="約會首選"
            />
          </div>
          <div class="coupon-content">
            <div class="coupon-text">
              <h3 class="coupon-title">約會首選</h3>
              <p class="coupon-desc">
                浪漫不設限！兩人同行，經典義大利麵、手工披薩，享主餐買一送一。
              </p>
            </div>
            <button class="coupon-btn">
              前往兌換 <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div class="coupon-card" @click="directUnfinish">
          <div class="coupon-img">
            <img
              src="../assets/food stock/pexels-valeriya-11213786.jpg"
              alt="肉食主義者集合"
            />
          </div>
          <div class="coupon-content">
            <div class="coupon-text">
              <h3 class="coupon-title">肉食主義者集合</h3>
              <p class="coupon-desc">
                肉山肉海，吃到飽才過癮！憑券享四人同行一人免費，大口吃肉不用怕。
              </p>
            </div>
            <button class="coupon-btn">
              前往兌換 <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div class="coupon-card" @click="directUnfinish">
          <div class="coupon-img">
            <img
              src="../assets/food stock/pexels-h-u-mai-2153907229-32961648.jpg"
              alt="下午茶時光"
            />
          </div>
          <div class="coupon-content">
            <div class="coupon-text">
              <h3 class="coupon-title">下午茶時光</h3>
              <p class="coupon-desc">
                甜點胃永遠有空間！憑券外帶自取，人氣蛋糕或精緻甜點享88折。
              </p>
            </div>
            <button class="coupon-btn">
              前往兌換 <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div class="coupon-card" @click="directUnfinish">
          <div class="coupon-img">
            <img
              src="../assets/food stock/pexels-robinstickel-70497.jpg"
              alt="家庭聚餐"
            />
          </div>
          <div class="coupon-content">
            <div class="coupon-text">
              <h3 class="coupon-title">家庭聚餐</h3>
              <p class="coupon-desc">
                溫馨團圓好時光！六人以上訂位，招牌合菜或火鍋套餐享9折，兒童餐點免費升級。
              </p>
            </div>
            <button class="coupon-btn">
              前往兌換 <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div class="coupon-card" @click="directUnfinish">
          <div class="coupon-img">
            <img
              src="../assets/food stock/pexels-valeriya-1860208.jpg"
              alt="早鳥專案"
            />
          </div>
          <div class="coupon-content">
            <div class="coupon-text">
              <h3 class="coupon-title">早鳥專案</h3>
              <p class="coupon-desc">
                晨光美好時光！上午11點前用餐，精選早午餐套餐享7折優惠，咖啡無限續杯。
              </p>
            </div>
            <button class="coupon-btn">
              前往兌換 <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <button class="scroll-btn right" @click="scrollCoupons(1)">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

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
  width: 100%;
}

.coupons-container {
  display: flex;
  gap: 2%;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  width: 100%;
}

.coupons-container::-webkit-scrollbar {
  display: none;
}

.coupon-card {
  flex: 0 0 49%;
  border-radius: 20px;
  background: white;
  display: flex;
  overflow: hidden;
  cursor: pointer;
}

.coupon-card:hover {
  background-color: #fff5c6;
}

.coupon-card:hover .coupon-btn {
  background-color: #4f0201;
  color: #f0e7d3;
}

.coupon-img {
  width: 70%;
  padding: 0.5rem;
}

.coupon-img img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.coupon-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.coupon-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.coupon-title {
  color: #4f0201;
  font-size: 32px;
  font-weight: 900;
  margin: 0;
}

.coupon-desc {
  font-size: 20px;
  line-height: 1.5;
  font-weight: 700;
  margin: 0;
}

.coupon-btn {
  width: 126px;
  height: 54px;
  border-radius: 15px;
  background: #966f53;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-end;
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.coupon-btn:hover {
  background: #3a0100;
  transform: translateY(-2px);
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
</style>
