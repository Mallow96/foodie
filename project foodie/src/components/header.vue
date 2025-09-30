<script setup></script>

<template>
  <header
    class="w-100 d-flex justify-content-center align-center bg-white py-1"
  >
    <div class="logo mx-auto">
      <a href="">
      <img src="../assets/logo.svg" alt="logo" class="logo-img">
        <!-- <h2>thisisLogo</h2> -->
      </a>
    </div>

    <div
      class="right d-flex align-items-center position-absolute top-50 end-0 translate-middle-y me-4"
    >
      <div class="icons d-flex gap-4">
        <a href="">
          <i class="fa-solid fa-user"></i>
        </a>
        <a href="">
          <i class="fa-solid fa-bell"></i>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
}

.logo {
  place-items: center;
}

.logo-img {
  width: 6.75rem;
  height: auto;
}

.icons > a {
  :hover {
    color: var(--color-primary-orange);
  }
}

a > i {
  font-size: 1.5rem;
  color: var(--color-primary-brown);
}
</style>
