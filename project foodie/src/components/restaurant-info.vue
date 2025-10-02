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
  <main>
    <div class="block">
      <h4>餐廳簡介</h4>
      <p>{{ restaurant.about }}</p>
    </div>

    <div class="block">
      <h4>菜單</h4>
      <p>{{ restaurant.menu }}</p>
    </div>

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
  width: 100%;
}

p {
  background-color: transparent;
  margin: 0;
  padding: 0;
}

.row {
  width: 100%;
  border-top: 1px solid var(--color-brown-300);
  padding: 0;
  margin: 0;
}

.last-row {
  border-bottom: 1px solid var(--color-brown-300);
}

.col-3,
.col-9 {
  /* min-height: 3.5rem; */
  padding: 1.125rem 0;
  display: flex;
  align-items: center;
}

.col-3 {
  background-color: var(--color-beige-200);
  padding-left: 1rem;
}

.dishes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
}
</style>
