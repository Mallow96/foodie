<script setup>
import { useRoute } from "vue-router";
import { useFoodStore } from "../store/foodie_store";

const route = useRoute();
const restStore = useFoodStore();
const id = route.params.id;

// 假設 restaurants 中每筆物件有唯一屬性 id
const restaurant = restStore.restaurants.find((r) => String(r.id) === id);
</script>

<template>
  <main>
    <!-- 輪播照片 -->
    <div id="carouselPhotos" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselPhotos"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselPhotos"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselPhotos"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/food stock/pexels-chitokan-2087748.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/food stock/pexels-nano-erdozain-120534369-28460875.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/food stock/pexels-rachel-claire-5863643.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselPhotos"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselPhotos"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- 輪播照片 -->

    <!-- 簡介 -->
    <div class="block">
      <h4>餐廳簡介</h4>
      <p>{{ restaurant.about }}</p>
    </div>
    <!-- 簡介 -->

    <!-- 輪播菜單 -->
    <div id="carouselMenu" class="carousel slide">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselMenu"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselMenu"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselMenu"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/menus/pexels-rachel-claire-5865439.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/menus/pexels-solliefoto-313700.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
        <div class="carousel-item">
          <img
            src="../assets/menus/pexels-thatguycraig000-2463419.jpg"
            class="d-block w-100"
            alt="..."
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselMenu"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselMenu"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- 輪播菜單 -->

    <!-- 菜單 -->
    <div class="block">
      <h4>菜單</h4>
      <p>{{ restaurant.menu }}</p>
    </div>
    <!-- 菜單 -->

    <!-- 詳細資訊 -->
    <div class="block">
      <h4>詳細資訊</h4>

      <div class="table">
        <div class="row">
          <div class="col-3">店名</div>
          <div class="col-9">{{ restaurant.name }}</div>
        </div>
        <div class="row">
          <div class="col-3">營業時間</div>
          <div class="col-9">{{ restaurant.hours }}</div>
        </div>
        <div class="row">
          <div class="col-3">餐廳地址</div>
          <div class="col-9">{{ restaurant.address }}</div>
        </div>
        <div class="row">
          <div class="col-3">交通方式</div>
          <div class="col-9">{{ restaurant.transportation }}</div>
        </div>
        <div class="row">
          <div class="col-3">特色餐點</div>
          <div class="col-9 dishes">
            <p v-for="(dish, index) in restaurant.signatureDishes" :key="index">
              {{ dish }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-3">其他分店</div>
          <div class="col-9">{{ restaurant.branches }}</div>
        </div>
        <div class="row">
          <div class="col-3">付款方式</div>
          <div class="col-9 dishes">
            <p
              v-for="(method, index) in restaurant.paymentMethods"
              :key="index"
            >
              {{ method }}
            </p>
          </div>
        </div>

        <div class="row last-row">
          <div class="col-3">用餐須知</div>
          <div class="col-9">{{ restaurant.diningNotice }}</div>
        </div>
      </div>
      <!-- 詳細資訊 -->
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.table {
  color: black;
}

p {
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.row {
  border-top: 1px solid var(--color-brown-300);
}

.last-row {
  border-bottom: 1px solid var(--color-brown-300);
}

.col-3,
.col-9 {
  /* min-height: 3.5rem; */
  padding: 1.125rem 1rem;
  display: flex;
  align-items: center;
}

.col-3 {
  background-color: var(--color-beige-200);
}

.dishes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
}

#carouselPhotos {
  width: 100%;
  margin: 0 auto;
}

.carousel-item > img {
  height: 24rem;
  object-fit: cover;
}
</style>
