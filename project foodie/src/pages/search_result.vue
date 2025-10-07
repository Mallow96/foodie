<template>
  <div class="search-results">
    <div class="search-header">
      <h2>搜尋結果</h2>
      <p v-if="currentKeyword">
        關鍵字：<strong>{{ currentKeyword }}</strong> (共找到
        {{ store.results.length }} 筆結果)
      </p>

      <!-- 重新搜尋功能 -->
      <div class="search-container">
        <input
          v-model="newKeyword"
          @keyup.enter="onNewSearch"
          type="text"
          placeholder="輸入餐廳名稱"
        />
        <button @click="onNewSearch">重新搜尋</button>
      </div>
    </div>

    <!-- 搜尋結果 -->
    <div v-if="store.results.length === 0" class="no-results">
      <p>找不到符合「{{ currentKeyword }}」的餐廳。</p>
      <button @click="$router.push('/')">回到首頁</button>
    </div>

    <div v-else class="results-list">
      <div v-for="item in store.results" :key="item.id" class="restaurant-card">
        <h3>{{ item.name }}</h3>
        <p class="address">{{ item.address }}</p>
        <p class="phone" v-if="item.phone">電話：{{ item.phone }}</p>
        <p class="category" v-if="item.category">類型：{{ item.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFoodStore } from "../store/foodie_store";

const route = useRoute();
const router = useRouter();
const store = useFoodStore();

const currentKeyword = ref("");
const newKeyword = ref("");

onMounted(() => {
  // 從網址參數取得關鍵字
  currentKeyword.value = route.query.keyword || "";
  newKeyword.value = currentKeyword.value;

  // 如果有關鍵字就執行搜尋
  if (currentKeyword.value) {
    store.search(currentKeyword.value);
  }
});

function onNewSearch() {
  if (!newKeyword.value.trim()) {
    alert("請輸入搜尋關鍵字");
    return;
  }

  currentKeyword.value = newKeyword.value;
  store.search(newKeyword.value);

  // 更新網址參數
  router.replace({
    name: "SearchResults",
    query: { keyword: newKeyword.value },
  });
}
</script>

<style scoped>
.search-results {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-header {
  margin-bottom: 30px;
  text-align: center;
}

.search-container {
  display: flex;
  gap: 8px;
  max-width: 500px;
  margin: 20px auto;
}

input {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.no-results {
  text-align: center;
  padding: 40px;
}

.no-results button {
  background-color: #6c757d;
  margin-top: 20px;
}

.results-list {
  display: grid;
  gap: 20px;
}

.restaurant-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #f9f9f9;
}

.restaurant-card h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.address {
  color: #666;
  margin: 5px 0;
}

.phone,
.category {
  color: #888;
  font-size: 0.9rem;
  margin: 5px 0;
}
</style>
