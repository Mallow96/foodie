<script setup>
import { computed, ref } from "vue";
import { useFoodStore } from "../store/foodie_store";

const useStore = useFoodStore();

// 透過 Getter 取得登入使用者的乾淨資料
const userInfo = computed(() => useStore.getLoggedInUserBasicInfo);

// 格式化日期時間的函式
// const formatDateTime = (isoString) => {
//   if (!isoString) return "N/A";
//   const date = new Date(isoString);
//   return date.toLocaleString("zh-TW", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     // hour: "2-digit",
//     // minute: "2-digit",
//     // second: "2-digit",
//   });
// };
</script>

<template>
  <aside class="content">
    <div class="user-info w-100">
      <div class="profile"></div>
      <h2>{{ userInfo.realName }}</h2>
      <span> ({{ userInfo.username }})</span>
      <div class="user-details">
        <p>收藏：{{ userInfo?.likedRestaurants?.length || "n" }} 筆</p>
        <p>評論：{{ userInfo?.reviewAmount?.length || "n" }} 次</p>
      </div>
    </div>

    <div class="divider"></div>

    <ul class="button-list">
      <li>
        <router-link :to="{ name: 'accountSetting' }">
          <i class="fa-solid fa-gear btn-icon"></i>帳號管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'accountSetting' }">
          <i class="fa-regular fa-circle-user btn-icon"></i>我的主頁
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'accountSetting' }">
          <i class="fa-regular fa-heart btn-icon"></i>收藏清單
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'accountSetting' }">
          <i class="fa-solid fa-ticket btn-icon"></i>優惠管理
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'reservationHistory' }">
          <i class="fa-solid fa-clock-rotate-left btn-icon"></i>訂位紀錄
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.divider {
  width: 96%;
  margin: 1rem 0;
  height: 0.125rem;
}

aside {
  width: 98%;
  padding: 1.5rem 0.75rem;
  justify-items: center;
  background-color: var(--color-beige-200);
  border-radius: var(--border-radius);
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  h2 {
    margin: 0;
  }
}
.profile {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: lightgray;
}

.user-details {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.button-list {
  list-style-type: none;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--color-primary-brown);
  padding: 0;
  width: 100%;
  margin: 0;

  a {
    color: var(--color-primary-brown);
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}

.button-list > li {
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
</style>
