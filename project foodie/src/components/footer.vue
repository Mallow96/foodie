<script setup></script>

<template>
  <div class="footer w-100">
    <div class="container py-4">
      <div class="top d-flex justify-content-between align-items-center">
        <div class="logo d-inline-block">
          <a href="">
            <img src="../assets/logo.svg" alt="logo" class="logo-img" />
            <!-- <h2>thisisLogo</h2> -->
          </a>
        </div>
        <ol class="socials">
          <li>
            <router-link :to="{ name: 'developing' }">
              <i class="fa-brands fa-youtube"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }">
              <i class="fa-brands fa-facebook-f"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }">
              <i class="fa-brands fa-x-twitter"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }">
              <i class="fa-brands fa-instagram"></i>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }">
              <i class="fa-brands fa-linkedin-in"></i>
            </router-link>
          </li>
        </ol>
      </div>

      <div class="divider"></div>

      <div class="bot w-100 d-flex justify-content-between align-items-center">
        <p class="p-0 m-0 text-start">
          Project Foodie © 2025. All rights reserved.
        </p>
        <ol class="d-flex justify-content-between">
          <li class="fw-bold">
            <router-link :to="{ name: 'fakelist' }">
              List of Restaurants
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }"> Twelve </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }"> Thirteen </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }"> Fourteen </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }"> Fifteen </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'developing' }"> Sixteen </router-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: var(--color-primary-beige);
  color: var(--color-primary-brown);
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0;
}

.logo-img {
  width: 7.5rem;
  height: auto;
}

.socials > li > a > i {
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

a {
  text-decoration: none;
  color: var(--color-primary-brown);
}

ol {
  list-style: none;
  display: flex;
  gap: 12px;
  padding: 0;
  align-items: center;
  margin: 0;
}
</style>
