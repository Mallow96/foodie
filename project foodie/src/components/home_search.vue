<script setup>
import Btn_send from "./btn_send.vue";
import { ref, watch, nextTick } from "vue";

const isExpand = ref(false);
const expandedInput = ref(null);

const fn_searchExpand = () => {
  isExpand.value = true;
};

const fn_searchCollapse = () => {
  isExpand.value = false;
};

watch(isExpand, async (newVal) => {
  if (newVal) {
    await nextTick();
    expandedInput.value?.focus();
  }
});
</script>

<template>
  <main class="d-flex align-items-center flex-column justify-content-center">
    <h3>餐廳檢索</h3>

    <div class="search-btns mt-4" v-if="!isExpand">
      <!-- 搜尋 -->
      <div
        class="input-group input-group-default d-flex justify-content-evenly align-items-center gap-3"
        @click="fn_searchExpand"
      >
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="請輸入關鍵字..." class="input-area" />
      </div>
      <!-- 搜尋 -->

      <!-- 地圖 -->
      <div
        class="input-group input-group-default d-flex align-items-center justify-content-center gap-3"
      >
        <span>前往地圖</span>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
      <!-- 地圖 -->
    </div>

    <!-- expand -->
    <div
      class="input-group input-group-expand d-flex align-items-center justify-content-evenly gap-3 ps-4 mt-4"
      v-else
    >
      <i class="fa-solid fa-magnifying-glass"></i>
      <input
        type="text"
        placeholder="請輸入關鍵字..."
        ref="expandedInput"
        class="input-area"
        @blur="fn_searchCollapse"
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
    <!-- expand -->
  </main>
</template>

<style scoped>
main {
  height: 25rem;
  transition: all 0.8s ease;
}

.search-btns {
  display: flex;
  gap: 3rem;
}

.input-group {
  width: 24rem;
  height: 7.5rem;
  background-color: white;
  /* padding: 2.5rem 1.5rem; */
  border-radius: 5rem;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.input-group-default {
  .input-area {
    width: 66%;
    border: none;
    &:focus {
      border: none;
    }
  }

  &:hover {
    background-color: var(--color-primary-yellow);
    cursor: pointer;
    &:first-child {
      cursor: text;
    }
  }
}

.input-group-expand {
  width: 100%;

  .input-area {
    border: none;
    padding: 1rem;
    font-size: 1.5rem;
    /* width: 20%; */
  }
}

.radio-group {
  display: flex;
  gap: 1rem;
  font-size: 1rem;
}

.input-area:focus {
  outline: none;
  border: none;
}
</style>
