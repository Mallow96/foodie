<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import { useFoodStore } from "./store/foodie_store";
import { onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

//取得store
const store = useFoodStore();

//storeToRefs可保持響應性
const { hasLoadedMembers, isLoading } = storeToRefs(store);

//登入用戶定義為"xxx"
const currentUsername = "user1";

//fetch資料
onMounted(() => {
  if (!hasLoadedMembers.value) {
    console.log("App Mounted: 所有資料載入");
    store.fetchAllData();
  }
});

//監聽資料載入狀態
watch(
  isLoading,
  (newisLoading) => {
    //條件
    if (newisLoading === false && hasLoadedMembers.value) {
      console.log("資料載入完成");

      //載入完成，執行loginUser
      const loadSuccess = store.loginUserByUsername(currentUsername);

      if (loadSuccess) {
        console.log(`${currentUsername} 登入狀態成功`);
      } else {
        console.log("設定登入失敗");
      }
    } else if (newisLoading === false && store.dataError) {
      //有載入，但發生錯誤
      console.error("資料載入失敗，錯誤訊息: ", store.dataError);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="backgrounds">
    <img src="./assets/bg-egg.png" alt="bg-img" class="bg-img egg-bg" />
    <img src="./assets/egg.png" alt="egg-img" class="bg-img egg-img" />
  </div>
  <header>
    <Header></Header>
  </header>

  <div class="container">
    <router-view></router-view>
  </div>
  <footer><Footer></Footer></footer>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  z-index: 100;
}

footer {
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
}

.bg-img {
  position: absolute;
}

.egg-bg {
  left: -12rem;
}

.egg-img {
  left: 6rem;
  top: 12rem;
}
</style>
