import { defineStore } from 'pinia'
import { ref } from "vue";

export const useAnalyticsStore = defineStore('lovemilk-analytics', ()=>{
    const agreed = ref(false)

    return { agreed }
}, {  // @ts-ignore
    persist: true
})
