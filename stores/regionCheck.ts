import { defineStore } from 'pinia'
import { ref } from "vue";

export const useRegionCheckStore = defineStore('lovemilk-region-check', ()=>{
    const ignoreUnsupportedRegion = ref(false)

    return { ignoreUnsupportedRegion }
}, {  // @ts-ignore
    persist: true
})
