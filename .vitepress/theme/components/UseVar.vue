<template>
    {{ value }}
</template>

<script setup lang="ts">
const props = defineProps<{
    k: string,
}>()

import { vars } from '../vars';
import { useRoute  } from 'vitepress';

const route = useRoute()
const novelName = route.data.relativePath.split('/', 1)[0]
const k = props.k

let _obj = vars?.[novelName]
const _split_k = k.split('.')
for (const keyName of _split_k) {
    if (!_obj) {
        break
    }
    _obj = _obj?.[keyName]
}

const value = _obj ?? `${novelName}.${k}`
</script>
