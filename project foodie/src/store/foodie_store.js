import { defineStore } from "pinia";
import jsonRest from "../restaurants_data.json";
import jsonUser from "../membership_data.json";
import jsonReserve from "../reservation_data.json";
import { ref, computed } from "vue";
// import { useRouter, useRoute } from "vue-router";

//setup 語法
export const useFoodStore = defineStore("notes", () => {
  // ref() 就是 state 属性
  // const noteStore = useNoteStore();

  const restaurants = ref(jsonRest);
  const users = ref(jsonUser);
  const reservations = ref(jsonReserve);

  const loggedInUser = ref(null);

  // computed() 就是 getters
  // 取得登入使用者的基本資訊（避免暴露密碼 hash 等）
  const getLoggedInUserBasicInfo = computed(() => {
    if (loggedInUser.value) {
      // 只回傳需要顯示的資料欄位
      const { realName, username, email, phone, createdAt, userId, lastLogin, likedRestaurants,reviewAmount } =
        loggedInUser.value;
      return { realName, username, email, phone, createdAt, userId, lastLogin, likedRestaurants,reviewAmount };
    }
    return null;
  });


  // function() 就是 actions
  // 根據 username 設定登入使用者
  function loginUserByUsername(username) {
    const user = users.value.find((m) => m.username === username);
    if (user) {
      loggedInUser.value = user;
      console.log(`User ${username} logged in successfully.`);
      return true;
    } else {
      console.error(`User ${username} not found.`);
      loggedInUser.value = null; // 清空狀態
      return false;
    }
  }

    const newReservation = (restaurant, date, dayOfWeek, time, partySize, name, phone, email, note) => {
        if (name == null || phone == null || partySize ==null) {return false}
        else{
          reservations.value.push({
            bookingId: `B${String(reservations.value.length + 1).padStart(3, '0')}`,
            userId: loggedInUser.value.userId,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            date: date,
            dayOfWeek: dayOfWeek,
            time: time,
            partySize: partySize,
            customerName: name,
            customerPhone: phone,
            customerEmail: email,
            note: note,
            createdAt: new Date().toISOString().split('T')[0],
            status: '已預約'
            })
            console.log(reservations.value);
          }
        }


  loginUserByUsername("user1"); // <--- 執行假設登入

  return {
    restaurants,
    users,
    loggedInUser,
    getLoggedInUserBasicInfo,
    loginUserByUsername,
    newReservation,
    reservations,
  };
}, 
{ persist: true } // 啟用持久化
);

// option語法
// export const useFruitStore = defineStore('fruits', {
//     state: () => ({
//         name: "水蜜桃",
//         price: 100
//     }),

//     getters: {
//     },

//     actions: {

//     },
// })
