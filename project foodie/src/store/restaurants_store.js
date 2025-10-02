import { defineStore } from "pinia";
import jsonRest from "../restaurants_data.json";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

//setup 語法
export const useRestStore = defineStore("notes", () => {
  // ref() 就是 state 属性
  // const noteStore = useNoteStore();

  const restaurants = ref(jsonRest);

  // computed() 就是 getters

  // function() 就是 actions

  return { restaurants };
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
