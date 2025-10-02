import { defineStore } from "pinia";
import { ref, computed, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

//setup 語法
export const useRestStore = defineStore("notes", () => {
  // ref() 就是 state 属性
  // const noteStore = useNoteStore();

  // computed() 就是 getters

  // function() 就是 actions

  return {};
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
