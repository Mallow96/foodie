<script setup>
import BackBtn from "../components/back_btn.vue";
</script>

<template>
  <div class="back"><BackBtn></BackBtn></div>
  <main class="content w-100">
    <div class="user-info w-100 d-flex align-items-center">
      <span class="profile"></span>
      <h2>使用者名稱</h2>
      <div class="user-details ms-auto">
        <p>收藏：筆</p>
        <p>評論：次</p>
        <p>加入日期：</p>
      </div>
    </div>

    <div class="divider w-100"></div>

    <ul class="button-list">
      <li><i class="fa-solid fa-gear btn-icon"></i>帳號管理</li>
      <li><i class="fa-regular fa-circle-user btn-icon"></i>我的主頁</li>
      <li><i class="fa-regular fa-heart btn-icon"></i>收藏清單</li>
      <li><i class="fa-solid fa-ticket btn-icon"></i>優惠管理</li>
      <li><i class="fa-solid fa-clock-rotate-left btn-icon"></i>訂位紀錄</li>
    </ul>
  </main>
</template>

<style scoped>
.back {
  position: fixed;
  left: 0.5rem;
  top: calc(var(--bellow-header) + 8px);
}

.content {
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--color-brown-200);
}

.divider {
  margin: 2rem 0;
  height: 0.125rem;
}

.user-info {
  color: var(--color-primary-dbrown);
  gap: 2rem;
}

.profile {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: lightgray;
}

.button-list {
  list-style-type: none;
  font-size: 1.5rem;
  color: var(--color-primary-brown);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.button-list > li {
  padding: 1rem;
  border: 2px solid var(--color-primary-brown);
  border-radius: var(--border-radius);
  &:hover {
    background-color: var(--color-yellow-100);
    border-color: var(--color-primary-orange);
    cursor: pointer;

    i {
      color: var(--color-primary-orange);
    }
  }
}

.button-list > li > i {
  margin-right: 1rem;
}
</style>
