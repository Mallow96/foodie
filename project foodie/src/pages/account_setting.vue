<script setup>
import BackBtn from "../components/back_btn.vue";
import accountAside from "../components/account_aside.vue";

import { computed } from "vue";
import { useFoodStore } from "../store/foodie_store";

const useStore = useFoodStore();

// 透過 Getter 取得登入使用者的乾淨資料
const userInfo = computed(() => useStore.getLoggedInUserBasicInfo);

// 格式化日期時間的函式
const formatDateTime = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>

<template>
  <div class="back"><BackBtn></BackBtn></div>

  <div class="row">
    <aside class="col-3">
      <accountAside></accountAside>
    </aside>
    <main class="col-9">
      <h3>您的會員資料</h3>

      <div class="row">
        <div class="col">
          <h5>姓名</h5>
          <p>{{ userInfo.realName }}</p>
        </div>
        <div class="col">
          <h5>稱謂</h5>
          <p>先生 / 小姐 / 其他</p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h5>連絡電話</h5>
          <p>{{ userInfo.phone }}</p>
        </div>
        <div class="col">
          <h5>電子郵件</h5>
          <p>{{ userInfo.email }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  min-height: 70vh;
}
</style>
