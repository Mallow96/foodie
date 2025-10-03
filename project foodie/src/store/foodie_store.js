import { defineStore } from "pinia";
import jsonRest from "../restaurants_data.json";
import jsonUser from "../membership_data.json";
import { ref, computed } from "vue";
// import { useRouter, useRoute } from "vue-router";

//setup 語法
export const useFoodStore = defineStore("notes", () => {
  // ref() 就是 state 属性
  // const noteStore = useNoteStore();

  const restaurants = ref(jsonRest);
  const users = ref(jsonUser);

  const loggedInUser = ref(null);

  // computed() 就是 getters
  // 取得登入使用者的基本資訊（避免暴露密碼 hash 等）
  const getLoggedInUserBasicInfo = computed(() => {
    if (loggedInUser.value) {
      // 只回傳需要顯示的資料欄位
      const { realName, username, email, phone, createdAt, userId, lastLogin } =
        loggedInUser.value;
      return { realName, username, email, phone, createdAt, userId, lastLogin };
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

  loginUserByUsername("user1"); // <--- 執行假設登入

  return {
    restaurants,
    users,
    loggedInUser,
    getLoggedInUserBasicInfo,
    loginUserByUsername,
  };
});

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
