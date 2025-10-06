<script setup>
import accountAside from "../components/account_aside.vue";
</script>

<template>
  <div class="row">
    <aside class="col-3">
      <accountAside></accountAside>
    </aside>
    <main class="col-9">
      <h2 class="mb-4">Reservation History</h2>
      <div
        class="card mb-3"
        v-for="reservation in $store.reservations"
        :key="reservation.id"
      >
        <div class="card-body">
          <h5 class="card-title">{{ reservation.restaurantName }}</h5>
          <p class="card-text">
            Date: {{ reservation.date }}<br />
            Time: {{ reservation.time }}<br />
            Guests: {{ reservation.guests }}<br />
            Status: {{ reservation.status }}
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
