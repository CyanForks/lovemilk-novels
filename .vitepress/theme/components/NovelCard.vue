<template>
    <Card class="novel-card" :class="novelCardTheme" m="b-4 t-4" @click="handleClick" select-none>
        <template #title>《{{ props.title }}》</template>
        <template #content>
            <div m-t-2>
                {{ props.desc ?? '这作者很懒, 懒到甚至没有写简介?' }}
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import { computed } from 'vue';
import { useRouter, useData } from 'vitepress';
const { isDark } = useData()
const novelCardTheme = computed(() => isDark.value ? 'novel-card-dark' : 'novel-card-light')

const router = useRouter()

const props = defineProps({
    title: { type: String, required: true },
    desc: { type: String, default: '' },
    startRoute: { type: String, required: true }  // 必须使用绝对路由路径
})

function handleClick() {
    router.go(props.startRoute)
}
</script>

<style scoped>
.novel-card {
    cursor: auto;
    border: solid;
    border-width: 0px;
}

@keyframes border-fade-in-light {
    0% {
        border-color: transparent;
    }

    100% {
        border-color: #1b1b1f7f;
        box-shadow: 0 0 16rem 48px;
    }
}

@keyframes border-fade-out-light {
    100% {
        border-color: transparent;
    }

    0% {
        border-color: #1b1b1f7f;
        box-shadow: 0 0 16rem 48px;
    }
}

@keyframes border-fade-in-dark {
    0% {
        border-color: transparent;
    }

    100% {
        border-color: #ffffff7f;
        box-shadow: 0 0 16rem 4px;
    }
}

@keyframes border-fade-out-dark {
    100% {
        border-color: transparent;
    }

    0% {
        border-color: #ffffff7f;
        box-shadow: 0 0 16rem 4px;
    }
}

.novel-card-light {
    animation: border-fade-out-light .25s ease-out forwards;
}

.novel-card-light:hover {
    cursor: pointer;
    animation: border-fade-in-light .25s ease-out forwards;
}

.novel-card-dark {
    animation: border-fade-out-dark .25s ease-out forwards;
}

.novel-card-dark:hover {
    cursor: pointer;
    animation: border-fade-in-dark .25s ease-out forwards;
}
</style>