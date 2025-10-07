<script setup>
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import { useFoodStore } from "./store/foodie_store";

const store = useFoodStore();

store.loginUserByUsername("user1");
</script>

<template>
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
</style>
