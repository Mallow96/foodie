<template>
  <main class="d-flex align-items-center flex-column justify-content-center">
    <h3>餐廳檢索</h3>

    <div v-if="!isExpand" class="search-btns mt-4">
      <div
        class="input-group input-group-default d-flex justify-content-evenly align-items-center gap-3"
        @click="fn_searchExpand"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="請輸入關鍵字..."
          class="input-area"
          readonly
        />
      </div>

      <div
        class="input-group input-group-default d-flex align-items-center justify-content-center gap-3"
      >
        <span>前往地圖</span>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>

    <div
      v-if="isExpand"
      class="input-group input-group-expand d-flex align-items-center justify-content-evenly gap-3 ps-4 mt-4 scale-up-hor-center"
    >
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="請輸入關鍵字..."
        ref="expandedInput"
        class="input-area"
        @blur="fn_searchCollapse"
        autofocus
      />
      <div class="radio-group">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radioDefault"
            id="radioDefault2"
            checked
          />
          <label class="form-check-label" for="radioDefault2"> 清單顯示 </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radioDefault"
            id="radioDefault1"
          />
          <label class="form-check-label" for="radioDefault1"> 地圖顯示 </label>
        </div>
      </div>
      <Btn_send></Btn_send>
    </div>
  </main>
</template>

<script setup>
import { ref, nextTick } from "vue";

const isExpand = ref(false);

function fn_searchExpand() {
  isExpand.value = true;
  nextTick(() => {
    if (refs.expandedInput) refs.expandedInput.focus();
  });
}

function fn_searchCollapse() {
  isExpand.value = false;
}
</script>

<style scoped>
.input-group-default {
  cursor: pointer;
  width: 300px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
}

.input-group-expand {
  width: 100%;
  max-width: 800px;
  padding: 10px 25px;
  border: 1px solid #007bff;
  border-radius: 5px;
  background-color: #f3f9ff;
}

/* 動畫定義 */
@-webkit-keyframes scale-up-hor-center {
  0% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}
@keyframes scale-up-hor-center {
  0% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}
.scale-up-hor-center {
  -webkit-animation: scale-up-hor-center 0.4s
    cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: scale-up-hor-center 0.4s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  transform-origin: center center;
}
</style>
