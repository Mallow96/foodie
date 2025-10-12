<script setup>
import accountAside from "../components/account_aside.vue";

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useFoodStore } from "../store/foodie_store";
import { useRouter } from "vue-router";

const router = useRouter();
const useStore = useFoodStore();
const { getReservationInfo } = storeToRefs(useStore);

const hasReservation = ref();
const reservationCount = ref(useStore.getReservationInfo.length);
const noDataModal = ref(null);
const cancelModal = ref(null);
const selectedReservation = ref(null);

onMounted(() => {
  noDataModal.value = new bootstrap.Modal(
    document.getElementById("noDataModal")
  );

  if (reservationCount.value > 0) {
    console.log("有預訂資料");
    hasReservation.value = true;
  } else {
    console.log("無預訂資料");
    hasReservation.value = false;
    showModal();
  }
});

// 顯示無資料彈跳視窗
const showModal = () => {
  noDataModal.value.show();
};

// 點擊回首頁按鈕
const directHome = () => {
  noDataModal.value.hide();
  router.push("/");
};

const onCancel = (bookingId) => {
  cancelModal.value = new bootstrap.Modal(
    document.getElementById("cancelModal")
  );
  cancelModal.value.show();
  selectedReservation.value = bookingId;
  console.log("selectedReservation:", selectedReservation.value);
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
        v-for="reservation in getReservationInfo"
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
            <button class="cancel-btn" @click="onCancel(reservation.bookingId)">
              取消
            </button>
            <button class="edit-btn">修改</button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- 查無訂單 -->
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

  <!-- 取消訂單 -->
  <div class="modal" tabindex="-1" id="cancelModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- 取消 標題 -->
        <div class="modal-header">
          <h5 class="modal-title">查無訂位紀錄</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- 取消 內容 -->
        <div class="modal-body">
          <div class="modal-body-container">
            <p class="text-center">請確認您的聯絡資訊</p>

            <div class="body-top">
              <h4>restaurantName</h4>
              <h4>date:</h4>
              <h4>n位</h4>
            </div>

            <div class="divider"></div>

            <div class="body-bot">
              <div class="row">
                <div class="w-25">訂位人姓名</div>
                <div class="w-75">name</div>
              </div>
              <div class="row">
                <div class="w-25">訂位人電話</div>
                <div class="w-75">09123456</div>
              </div>
              <div class="row">
                <div class="w-25">訂位人Email</div>
                <div class="w-75">email@email.com</div>
              </div>
              <div class="row">
                <div class="w-25">備註</div>
                <div class="w-75 note-display">note</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 取消 按鈕 -->
        <div class="modal-footer">
          <button type="button" class="btn btn-back">關閉</button>
          <button type="button" class="btn btn-next">確認取消</button>
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
  background-color: var(--color-brown-50);

  &:hover {
    background-color: var(--color-beige-200);
  }
}

.edit-btn {
  color: var(--color-dbrown-300);
}

.cancel-btn {
  color: var(--color-dbrown-200);
}

.btn-home {
  background-color: var(--color-primary-brown);
  color: white;

  &:hover {
    background-color: var(--color-brown-300);
  }
}

.modal-footer {
  flex-wrap: nowrap;

  button {
    font-size: 1.5rem;
    width: 100%;
    padding: 0.5rem 0;
  }
}

.modal-body-container {
  border: 1px solid var(--color-brown-300);
  padding: 1rem;
  border-radius: 0.5rem;
}

.divider {
  margin: 1rem;
}

.body-top,
.body-bot {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.body-top {
  text-align: center;
}

.body-bot {
  /* text-align: center; */
  padding: 1rem 0;
}

.btn-back {
  color: var(--color-dbrown-300);
  background-color: var(--color-yellow-200);

  &:hover {
    background-color: var(--color-beige-200);
  }
}

.btn-next {
  color: var(--color-primary-dbrown);
  background-color: var(--color-primary-yellow);

  &:hover {
    background-color: var(--color-yellow-300);
  }
}
</style>
