<script setup></script>

<template>
  <div class="footer w-100">
    <div class="container">
      <div class="top d-flex justify-content-between align-items-center py-3">
        <div class="logo d-inline-block">
          <a href="">
            <h2>thisisLogo</h2>
          </a>
        </div>
        <ol class="socials">
          <li>
            <a href="">
              <i class="fa-brands fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa-brands fa-x-twitter"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </li>
        </ol>
      </div>

      <div class="divider"></div>

      <div class="bot w-100 d-flex justify-content-between align-items-center">
        <p class="p-0 m-0 text-start">
          Project Foodie © 2025. All rights reserved.
        </p>
        <ol class="d-flex justify-content-between my-3">
          <li>
            <a href="" class="fw-bold">Eleven</a>
          </li>
          <li>
            <a href="" class="fw-bold">Twelve</a>
          </li>
          <li><a href="" class="fw-bold"> Thirteen </a></li>
          <li>
            <a href="" class="fw-bold">Fourteen</a>
          </li>
          <li>
            <a href="" class="fw-bold">Fifteen</a>
          </li>
          <li>
            <a href="" class="fw-bold">Sixteen</a>
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

.socials > li > a > i {
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.divider {
  height: 1px;
  background-color: var(--color-primary-brown);
  opacity: 0.5;
  margin: 0;
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
