<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  router.back();
};
</script>

<template>
  <div @click="goBack">
    <i class="backBtn fa-solid fa-chevron-left"></i>
  </div>
</template>

<style scoped>
div {
  padding: 1rem 1rem;
  border-radius: 0.9375rem;
  color: var(--color-primary-brown);
}

div:hover {
  color: var(--color-primary-yellow);
  cursor: pointer;
}

.backBtn {
  width: 1.5rem;
  background-color: rgb(0, 0, 0, 0);
  font-size: 1.5rem;
}
</style>
