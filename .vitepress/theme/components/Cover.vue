<template>
    <div class="cover">
        <v-markdown :source="markdownText" />
        <Button :style="props.startStyle" :severity="props.startSeverity" :label="props.startText" @click="handleClick" />
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vitepress';

const router = useRouter()

const props = defineProps({
    title: {type: String, required: true},
    copyright: {type: String, default: '[Copyright © 2024 Lovemilk, All Rights Reserved.](https://aka.lovemilk.top/68)'},
    statement: {type: String, default: '本文纯属虚构, 文中出现的个人, 组织, 团体与现实无关, 与本网站所用技术和托管平台无关'},
    startText: {type: String, default: '即刻开始阅读'},
    startRoute: {type: String, required: true},  // 必须使用绝对路由路径
    startSeverity: {type: String, default: 'success'},
    startStyle: {type: String, default: 'width: 100%; margin: auto; margin-top: 16px;'},
})

// 尾随2空格换行, 切勿删除
const markdownText = `
# ${props.title}
> ${props.statement}  
> ${props.copyright}  
`

function handleClick() {
    // router.go 可以不刷新页面, 加载更快
    router.go(props.startRoute)
    // window.location.assign(props.startLink)
}
</script>
