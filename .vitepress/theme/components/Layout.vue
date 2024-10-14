<script setup>
import DefaultTheme from 'vitepress/theme'

import Analytics from './Analytics.vue';

const { Layout } = DefaultTheme
</script>

<template>
  <Analytics />
  <ClientOnly>
    <Layout />
  </ClientOnly>
</template>