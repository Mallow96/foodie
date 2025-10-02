<script setup>
import Btn_send from "./btn_send.vue";
import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";

const isExpanded = ref(false);
const collapseShow = ref(false);
const searchBlock = ref(null);

const fnSearchExpand = () => {
  if (!isExpanded.value) {
    isExpanded.value = true;
  }

  if (!collapseShow.value) {
    setTimeout(() => {
      collapseShow.value = true;
    }, 300);
  }
};

const fnSearchCollapse = () => {
  if (isExpanded.value) {
    isExpanded.value = false;
  }

  if (collapseShow.value) {
    collapseShow.value = false;
  }
};

const handleClickOutside = (event) => {
  if (searchBlock.value && !searchBlock.value.contains(event.target)) {
    fnSearchCollapse();
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});

const expandedInput = ref(null);
watch(isExpanded, async (newVal) => {
  if (newVal) {
    await nextTick();
    expandedInput.value?.focus();
  }
});
</script>

<template>
  <section>
    <!-- 標題 -->
    <div class="title"><h3 class="text-center">餐廳檢索</h3></div>
    <!-- 標題 -->

    <!-- 主按鈕*2 -->
    <div class="search-bar">
      <!-- 搜尋鈕 -->
      <div
        id="searchBlock"
        class="search-block search-bar-blocks"
        :class="{
          'search-expand': isExpanded,
        }"
        @click="fnSearchExpand"
        ref="searchBlock"
      >
        <div :class="{ 'visible-content': isExpanded }">
          <i class="fa-solid fa-magnifying-glass ms-3"></i>
          <input
            class="search-input"
            type="text"
            placeholder="請輸入關鍵字..."
            ref="expandedInput"
          />
        </div>

        <!-- 收合內容 -->
        <div class="collapse-content slide-in-fwd-center" v-if="collapseShow">
          <div class="radio-group">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault2"
                checked
              />
              <label class="form-check-label" for="radioDefault2">
                清單顯示
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="radioDefault"
                id="radioDefault1"
              />
              <label class="form-check-label" for="radioDefault1">
                地圖顯示
              </label>
            </div>
          </div>
          <Btn_send></Btn_send>
        </div>
        <!-- 收合內容 -->
      </div>
      <!-- 搜尋鈕 -->

      <!-- 地圖鈕 -->
      <div class="map-block search-bar-blocks">
        <span>前往地圖</span>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
      <!-- 地圖鈕 -->
    </div>
    <!-- 主按鈕*2 -->
  </section>
</template>

<style scoped>
section {
  width: 100%;
  height: 31.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  position: relative;
}

/* 主按鈕*2 個別*/
.search-bar-blocks {
  background-color: white;
  width: 47%;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5rem;
  transition: width 0.2s ease-in-out;
  font-size: 1.5rem;

  &:hover {
    background-color: var(--color-primary-yellow);

    &.search-block {
      cursor: text;
    }

    &.map-block {
      cursor: pointer;
    }
  }
}

.search-block > div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  outline: none;
  border: none;
}

.visible-content {
  width: 56%;
}

.collapse-content {
  width: 40%;
  display: flex;
  justify-content: space-evenly;
}

.radio-group {
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-expand {
  width: 100%;
  position: absolute;
}

.slide-in-fwd-center {
  -webkit-animation: slide-in-fwd-center 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: slide-in-fwd-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@-webkit-keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
