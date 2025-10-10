import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";


const userJSON = "/membership_data.json";
const restaurantJSON = "/restaurants_data.json";
const reservationJSON = "/reservation_data.json";

//setup 語法
export const useFoodStore = defineStore(
  "notes",
  () => {
    // ref() 就是 state 属性

    const router = useRouter();

    const users = ref(null);
    const loggedInUser = ref(null);

    const restaurants = ref(null);
    const reservations = ref(null);

    const isLoading = ref(false);
    const dataError = ref(null);

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
    const hasLoadedMembers = computed(() => {
      return !!(
        users.value &&
        Array.isArray(users.value) &&
        users.value.length > 0
      );
    });

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
      if (reservations.value) {
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
        } = reservations.value;
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
    async function fetchAllData() {
      isLoading.value = true;
      dataError.value = null;

      try {
        console.log(`Debug: 嘗試請求會員資料: ${userJSON}`);
        const memberResponse = await axios.get(userJSON);
        users.value = memberResponse.data;
        console.log("會員資料已成功載入。");

        console.log(`Debug: 嘗試請求餐廳資料: ${restaurantJSON}`);
        const restaurantResponse = await axios.get(restaurantJSON);
        restaurants.value = restaurantResponse.data;
        console.log("✅ 餐廳資料載入成功。");

        console.log(`Debug: 嘗試請求預約資料: ${reservationJSON}`);
        const reservationResponse = await axios.get(reservationJSON);
        reservations.value = reservationResponse.data;
        console.log("✅ 預約資料載入成功。");

        console.log("所有 JSON 資料已成功載入並分類。");
      } catch (err) {
        console.error("載入資料時發生錯誤或請求未成功發出:", err.message);
        dataError.value = "無法載入部分或所有資料，請檢查檔案路徑。";
        users.value = null;
        restaurants.value = null;
        reservations.value = null;
      } finally {
        isLoading.value = false;
      }
    }

    const loginUserByUsername = (username) => {
      if (!hasLoadedMembers.value) {
        console.error("錯誤: 會員資料尚未載入，無法執行登入。");
        return false;
      }

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
    };

    function getRestaurantInfo(id) {
      return (
        restaurantsWithImg.value.find((r) => r.id === id) || {
          id: "",
          name: "",
          address: "",
          contactPhone: "",
          rating: "",
          reviewCount: "",
          imageUrl: "",
        }
      );
    }

    const restaurantsWithImg = computed(() => {
      return restaurants.value.map((restaurant, index) => ({
        ...restaurant,
        imageUrl: testFoodImages.value[index % testFoodImages.value.length],
      }));
    });

    // 將 reservations 裡每筆資料，結合對應餐廳的 imageUrl
    const reservationsWithImg = computed(() =>
      reservations.value.map((resv) => {
        // 找到該筆 reservation 的餐廳物件
        const restaurant = restaurantsWithImg.value.find(
          (r) => r.id === resv.restaurantId
        );
        return {
          ...resv,
          // 如果有找到，就加上 imageUrl，否則留空字串
          restaurantImage: restaurant?.imageUrl || "",
        };
      })
    );

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

    // const cancelReservation = (id) => {
    //   const index = notes.findIndex((note) => note.id === id);
    //   notes.splice(index, 1);
    // };

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

const directUnfinished = ()=>{
  router.push('/this-page-is-developing')
    }

    const randomIdGenerator = (count, minNum, maxNum) => {
      // 檢查範圍是否足夠生成所需數量的 ID
      if (maxNum - minNum + 1 < count) {
        console.error(
          `錯誤：範圍 (共 ${
            maxNum - minNum + 1
          } 個) 太小，無法生成 ${count} 個唯一 ID。`
        );
        return [];
      }



      const uniqueIds = new Set(); // 使用 Set 來高效地儲存和檢查 ID 的唯一性
      const totalPossible = maxNum - minNum + 1; // 總共可能的 ID 數量

      // 方法 1：隨機抽取法（適用於需要的數量較少時）
      while (uniqueIds.size < count) {
        // 1. 生成範圍內的隨機數字
        // Math.random() * (max - min + 1) -> 產生 0 到 (max - min) 之間的數
        // Math.floor(...) + min -> 確保是 min 到 max 之間的整數
        const randomNum =
          Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

        // 2. 組裝成 ID 格式
        const newId = `r${randomNum}`;

        // 3. 將新的 ID 加入 Set。Set 只會儲存唯一的值，如果 ID 已存在，size 不會增加
        uniqueIds.add(newId);
      }

      // 將 Set 轉換回陣列並回傳
      return Array.from(uniqueIds);
    };

    return {
      restaurants,
      users,
      reservations,

      loggedInUser,
      getLoggedInUserBasicInfo,
      isLoading,
      dataError,
      hasLoadedMembers,
      getReservationInfo,
      results,
      testFoodImages,
      restaurantsWithImg,
      reservationsWithImg,
      fetchAllData,
      loginUserByUsername,
      newReservation,
      getRestaurantInfo,
      search,
      directUnfinished,
      randomIdGenerator,
      
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
