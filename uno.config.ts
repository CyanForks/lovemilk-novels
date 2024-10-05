import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
    presets: [
        presetAttributify({ /* preset options */ }),
        presetUno(),
    ],
})
