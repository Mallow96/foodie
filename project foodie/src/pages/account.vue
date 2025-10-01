<script setup>
import BackBtn from "../components/back_btn.vue";
</script>

<template>
  <div class="back"><BackBtn></BackBtn></div>

  <h1>this is account</h1>
</template>

<style scoped>
.back {
  position: absolute;
  left: 0.5rem;
  top: calc(var(--bellow-header) + 8px);
}
</style>
