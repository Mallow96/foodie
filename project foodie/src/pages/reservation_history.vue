<script setup>
import accountAside from "../components/account_aside.vue";

import { ref, onMounted } from "vue";
import { useFoodStore } from "../store/foodie_store";
import { useRouter } from "vue-router";

const router = useRouter();
const useStore = useFoodStore();

const hasReservation = ref();
const reservationCount = ref(useStore.reservationsWithImg.length);
let noDataModal;

onMounted(() => {
  noDataModal = new bootstrap.Modal(document.getElementById("noDataModal"));

  if (reservationCount.value > 0) {
    console.log("有預訂資料");
    hasReservation.value = true;
  } else {
    console.log("無預訂資料");
    hasReservation.value = false;
    showModal();
  }
});

const showModal = () => {
  noDataModal.show();
};

const directHome = () => {
  noDataModal.hide();
  router.push("/");
};
</script>

<template>
  <div class="row">
    <aside class="col-3">
      <accountAside></accountAside>
    </aside>

    <main class="col-9">
      <h2 class="mb-4">訂位紀錄</h2>
      <div v-if="!hasReservation" class="warning-text">
        <h3 class="no-reservation">查無訂位紀錄</h3>
      </div>
      <div
        class="reservation-card"
        v-for="reservation in useStore.reservationsWithImg"
        :key="reservation.bookingId"
      >
        <div class="reservation-img">
          <img :src="reservation.restaurantImage" alt="餐廳圖片" />
        </div>

        <div class="reservation-content">
          <div class="reservation-info">
            <h3 class="reservation-subtitle">
              {{ useStore.getRestaurantInfo(reservation.restaurantId).name }}
            </h3>
            <div class="reservation-details">
              <div class="reservation-date">
                <p class="card-text">{{ reservation.date }}</p>
                <p>{{ reservation.time }}</p>
                <p>{{ reservation.partySize }} 位</p>
              </div>
              <p class="reservation-address">
                {{
                  useStore.getRestaurantInfo(reservation.restaurantId).address
                }}
              </p>
              <p class="reservation-phone">
                <i class="fa-solid fa-phone"></i>
                {{
                  useStore.getRestaurantInfo(reservation.restaurantId)
                    .contactPhone
                }}
              </p>

              <!-- <p>備註: {{ reservation.note }}</p> -->
              <!-- <p>餐廳id: {{ reservation.restaurantId }}</p> -->
            </div>
          </div>

          <div class="reservation-actions">
            <button class="edit-btn">修改</button>
            <button class="cancel-btn">取消</button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div class="modal" tabindex="-1" id="noDataModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">查無訂位紀錄</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>尚未找到任何預訂紀錄，請確認您有訂位成功。</p>
          <p>若有問題，請聯繫客服。</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-home" @click="directHome">
            回首頁
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
main {
  padding: 0 1rem;
}

.warning-text {
  height: 100%;
  place-content: center;
  h3 {
    text-align: center;
  }
}

.reservation-card {
  background: white;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  margin-bottom: 20px;
  padding: 32px;
}

.reservation-img {
  width: 220px;
  height: 220px;
}

.reservation-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reservation-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: relative;
  margin: 0;
  padding: 0;
}

.reservation-info {
  flex: 1;
  margin-left: 40px;
}

.reservation-subtitle {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 16px 0;
}

.reservation-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reservation-date,
.reservation-address,
.reservation-phone {
  font-size: 16px;
  margin: 0;
  display: flex;
  gap: 1rem;
}

.reservation-phone {
  display: flex;
  align-items: center;
  gap: 8px;
}

.reservation-phone i {
  color: #4f0201;
}

.reservation-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: auto;
}

.edit-btn,
.cancel-btn {
  width: 80px;
  height: 40px;
  padding: 0;
  font-weight: 600;
  color: #f0e7d3;
  border: none;
  border-radius: 100px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.edit-btn {
  background-color: #b89d8a;
}

.cancel-btn {
  background-color: #966f53;
}

.btn-home {
  background-color: var(--color-primary-brown);
  color: white;

  &:hover {
    background-color: var(--color-brown-300);
  }
}
</style>
