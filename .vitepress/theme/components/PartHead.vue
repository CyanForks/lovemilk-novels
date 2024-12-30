<template>
    <div :class="classWithNumber">
        <v-markdown :source="markdownText" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    no: {type: String, required: true},  // part number like a version number string
    title: {type: String, required: true},
    summary: {type: String, default: null},
})

const classWithNumber = `part-head-${props.no}`

const markdownText = `
# ${props.no} ${props.title}
${props.summary ? `> ${props.summary}  ` : ''}
`
</script>