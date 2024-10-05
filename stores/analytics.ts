// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from "vue";

export const useAnalyticsStore = defineStore('analytics', ()=>{
    const agreed = ref(false)

    return { agreed }
}, {
    persist: true
})
