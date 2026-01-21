<script setup>
import Home_search from "../components/home_search.vue";
import Home_recommendations from "../components/home_recommendations.vue";
import Home_coupon from "../components/home_coupon.vue";
import Home_ranking from "../components/home_ranking.vue";
import { ref } from "vue";

const isHover = ref(false);

const onMouseEnterLeave = () => {
  isHover.value = !isHover.value;
};
</script>

<template>
  <div class="backgrounds">
    <!-- 荷包蛋 -->
    <img src="../assets/bg-egg.png" alt="bg-img" class="bg-img egg-bg" />
    <img
      src="../assets/egg.png"
      alt="egg-img"
      class="bg-img egg-img"
      @mouseenter="onMouseEnterLeave"
      v-if="!isHover"
    />
    <img
      src="../assets/egg-hover.png"
      alt="egg-img-hover"
      class="bg-img egg-img"
      @mouseleave="onMouseEnterLeave"
      v-else
    />
    <!-- 荷包蛋 -->
    <!-- 包子 -->
    <img src="../assets/bao-bg.png" alt="bg-img" class="bg-img bao-bg" />
    <img
      src="../assets/bao.png"
      alt="bao-img"
      class="bg-img bao-img"
      @mouseenter="onMouseEnterLeave"
      v-if="!isHover"
    />
    <img
      src="../assets/bao-hover.png"
      alt="bao-hover-img"
      class="bg-img bao-img"
      @mouseleave="onMouseEnterLeave"
      v-else
    />
    <!-- 包子 -->

    <img
      src="../assets/recommand-bg.png"
      alt="recommand-bg"
      class="bg-img recommand-bg"
    />

    <!-- bobatea -->
    <img src="../assets/boba-bg.png" alt="boba-bg" class="bg-img boba-bg" />
    <img
      src="../assets/boba.png"
      alt="boba-img"
      class="bg-img boba-img"
      @mouseenter="onMouseEnterLeave"
      v-if="!isHover"
    />
    <img
      src="../assets/boba-hover.png"
      alt="boba-img"
      class="bg-img boba-img"
      @mouseleave="onMouseEnterLeave"
      v-else
    />
    <!-- bobatea -->

    <!-- beer -->
    <img src="../assets/beer-bg.png" alt="beer-bg" class="bg-img beer-bg" />
    <img
      src="../assets/beer.png"
      alt="beer-img"
      class="bg-img beer-img"
      @mouseenter="onMouseEnterLeave"
      v-if="!isHover"
    />
    <img
      src="../assets/beer-hover.png"
      alt="beer-img"
      class="bg-img beer-img"
      @mouseleave="onMouseEnterLeave"
      v-else
    />
    <!-- beer -->
  </div>

  <div class="content search-bar">
    <Home_search></Home_search>
  </div>
  <div class="content">
    <Home_recommendations></Home_recommendations>
  </div>
  <div class="content">
    <Home_coupon></Home_coupon>
  </div>
  <div class="content">
    <Home_ranking></Home_ranking>
  </div>
</template>

<style scoped>
.backgrounds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.bg-img {
  position: absolute;
  z-index: 1;
}

.egg-bg {
  top: -2rem;
  left: -8rem;
}

.egg-img {
  left: 8rem;
  top: 10rem;
}

.bao-bg {
  top: 30rem;
  right: -16rem;
}

.bao-img {
  top: 44rem;
  right: 0rem;
}

.recommand-bg {
  left: 10rem;
  top: 93rem;
}

.boba-bg {
  left: -14rem;
  top: 137.5rem;
}

.boba-img {
  left: 8rem;
  top: 144rem;
}

.beer-bg {
  bottom: 10rem;
  right: 0;
}

.beer-img {
  bottom: 37rem;
  right: 6rem;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: var(--home-section-gap);
  position: relative;
  z-index: 10;
}

.search-bar {
  min-height: calc(100vh - 48px);
}
</style>
