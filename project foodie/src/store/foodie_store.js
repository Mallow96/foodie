import { defineStore } from "pinia";
import jsonRest from "../restaurants_data.json";
import jsonUser from "../membership_data.json";
import jsonReserve from "../reservation_data.json";
import { ref, computed } from "vue";

// import { useRouter, useRoute } from "vue-router";

//setup 語法
export const useFoodStore = defineStore(
  "notes",
  () => {
    // ref() 就是 state 属性
    // const noteStore = useNoteStore();

    const restaurants = ref(jsonRest);
    const users = ref(jsonUser);
    const reservations = ref(jsonReserve);

    const loggedInUser = ref(null);
    const reservationData = ref(null);

    const testFoodImages = ref([
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/103e6b95-ebea-4499-ab78-8a12c3260db4.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/49b0993f-3b3d-4e54-86a6-7a1f9576d140.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7c95fb14-79db-4e25-a11c-4625a25ec718.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b0fa1fd8-7b8c-42c0-a46c-c0d4f1e48970.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/6b96d76a-3259-47e3-86b9-441a4adaa89c.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c719966b-606c-4bc8-b174-157d8d64e288.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/7e477cc1-d5f7-4711-9ef3-cb2d8c085f08.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/1a386717-441d-4dbd-b493-97992864747e.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/150bbb9f-65bf-4c76-b760-42a5eea33172.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/07651fb8-92d0-4e4b-b84d-d965c02d4463.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/23b3b3a3-5ed9-4a82-b7db-54777b1ca73f.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b8530c78-f075-4f46-ab5d-962a704fd88e.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/03da4e5c-9d4b-4dfb-8a05-1600103b77c6.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/bfdee97f-6fbe-4a6e-958a-4088686de189.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/c8562d09-7b19-4efe-967a-16b080f63200.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/8074c32f-caf2-4790-a55f-dd45245d0cf1.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/e76eb96c-7c32-4f46-abe9-dcac6bcb91dd.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/040aad80-4e4d-4707-9e60-e569b423dd4e.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/fb67731f-7751-495a-8a5f-0a0ba6b03f40.png",
      "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/806bc095-1b75-4066-b93d-439a9c77ec4b.png",
    ]);

    // computed() 就是 getters
    // 取得登入使用者的基本資訊（避免暴露密碼 hash 等）
    const getLoggedInUserBasicInfo = computed(() => {
      if (loggedInUser.value) {
        // 只回傳需要顯示的資料欄位
        const {
          realName,
          username,
          email,
          phone,
          createdAt,
          userId,
          lastLogin,
          likedRestaurants,
          reviewAmount,
        } = loggedInUser.value;
        return {
          realName,
          username,
          email,
          phone,
          createdAt,
          userId,
          lastLogin,
          likedRestaurants,
          reviewAmount,
        };
      }
      return null;
    });

    const getReservationInfo = computed(() => {
      if (reservationData.value) {
        // 只回傳需要顯示的資料欄位
        const {
          bookingId,
          userId,
          restaurantId,
          date,
          time,
          partySize,
          notes,
          customerName,
          customerPhone,
          customerEmail,
        } = reservationData.value;
        return {
          bookingId,
          userId,
          restaurantId,
          date,
          time,
          partySize,
          notes,
          customerName,
          customerPhone,
          customerEmail,
        };
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

    function getRestaurantInfo(id) {
      return (
        restaurants.value.find((r) => r.id === id) || {
          id: "",
          name: "",
          address: "",
          contactPhone: "",
        }
      );
    }

    const restaurantsWithImg = computed(() => {
      return restaurants.value.map((restaurant, index) => ({
        ...restaurant,
        imageUrl: testFoodImages.value[index % testFoodImages.value.length],
      }));
    });

    const newReservation = (
      restaurantId,
      date,
      dayOfWeek,
      time,
      partySize,
      name,
      phone,
      email,
      note
    ) => {
      if (name == null || phone == null || partySize == null) {
        return false;
      } else {
        reservations.value.push({
          bookingId: `B${String(reservations.value.length + 1).padStart(
            3,
            "0"
          )}`,
          userId: loggedInUser.value.userId,
          restaurantId: restaurantId,
          restaurantName: getRestaurantInfo(restaurantId).name,
          date: date,
          dayOfWeek: dayOfWeek,
          time: time,
          partySize: partySize,
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          note: note,
          createdAt: new Date().toISOString().split("T")[0],
          status: "已預約",
        });
        console.log(reservations.value);
      }
    };

    const results = ref([]);
    function search(keyword) {
      const kw = keyword.trim().toLowerCase();
      if (!kw) {
        results.value = [];
        return;
      }
      results.value = restaurantsWithImg.value.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(kw);
        const addressMatch = item.address.toLowerCase().includes(kw);
        const dishesMatch =
          Array.isArray(item.signatureDishes) &&
          item.signatureDishes.some((dish) => dish.toLowerCase().includes(kw));

        return nameMatch || addressMatch || dishesMatch;
      });
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
      getReservationInfo,
      getRestaurantInfo,
      results,
      search,
      testFoodImages,
      restaurantsWithImg,
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
