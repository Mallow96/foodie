<script setup></script>

<template>
  <header class="header">
    <div class="logo">
      <a href="">
        <img src="../assets/logo.svg" alt="logo" class="logo-img" />
        <!-- <h2>thisisLogo</h2> -->
      </a>
    </div>

    <div class="nav-group">
      <div class="icons">
        <router-link :to="{ name: 'developing' }">
          <i class="fa-solid fa-bell"></i>
        </router-link>

        <router-link :to="{ name: 'account' }">
          <i class="fa-solid fa-user"></i>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.logo {
  place-items: center;
}

.logo-img {
  width: 8.75rem;
  height: auto;
}

.icons {
  display: flex;
  align-items: center;
  gap: 2rem;

  a {
    :hover {
      color: var(--color-primary-orange);
    }

    i {
      font-size: 2rem;
      color: var(--color-primary-brown);
    }
  }
}
</style>
