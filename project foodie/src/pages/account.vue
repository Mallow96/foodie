<script setup>
import BackBtn from "../components/back_btn.vue";

import { computed, ref } from "vue";
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
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  });
};
</script>

<template>
  <div class="back"><BackBtn></BackBtn></div>
  <main class="content w-100">
    <div class="user-info w-100 d-flex align-items-center">
      <span class="profile"></span>
      <h2>{{ userInfo?.realName }}</h2>
      <span> ({{ userInfo?.username }})</span>
      <div class="user-details ms-auto">
        <p>收藏：{{ userInfo?.likedRestaurants?.length || "n" }} 筆</p>
        <p>評論：{{ userInfo?.reviewAmount?.length || "n" }} 次</p>
        <p>加入日期：{{ formatDateTime(userInfo?.createdAt) }}</p>
      </div>
    </div>

    <div class="divider w-100"></div>

    <ul class="button-list">
      <li>
        <router-link :to="{ name: 'accountSetting' }">
          <i class="fa-solid fa-gear btn-icon"></i>帳號管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'developing' }" class="unfinished">
          <i class="fa-regular fa-circle-user btn-icon"></i>我的主頁
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'developing' }" class="unfinished">
          <i class="fa-regular fa-heart btn-icon"></i>收藏清單
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'developing' }" class="unfinished">
          <i class="fa-solid fa-ticket btn-icon"></i>優惠管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'reservationHistory' }">
          <i class="fa-solid fa-clock-rotate-left btn-icon"></i>訂位紀錄
        </router-link>
      </li>
    </ul>
  </main>
</template>

<style scoped>
h2 {
  margin: 0;
}

.content {
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-brown-200);
}

.divider {
  margin: 2rem 0;
  height: 0.125rem;
}

.user-info {
  color: var(--color-primary-dbrown);
  h2 {
    margin-left: 2rem;
    margin-right: 0.5rem;
  }
}

.user-details > p {
  text-align: right;
}

.profile {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: lightgray;
}

.button-list {
  list-style-type: none;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: var(--color-primary-brown);

  a {
    color: var(--color-primary-brown);
    width: 100%;
    padding: 1rem;
    display: inline-block;
  }
}

.button-list > li {
  border: 2px solid var(--color-primary-brown);
  border-radius: var(--border-radius);
  &:hover {
    background-color: var(--color-yellow-100);
    border-color: var(--color-primary-orange);
    cursor: pointer;

    i {
      color: var(--color-primary-orange);
    }
  }
}

.button-list > li i {
  margin-right: 1rem;
}
</style>
