<script setup>
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
  <h1>This is account setting</h1>
</template>

<style scoped></style>
