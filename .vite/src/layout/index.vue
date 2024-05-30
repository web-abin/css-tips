<template>
  <div class="layout" theme="light">
    <Header></Header>

    <div class="content"></div>
  </div>
</template>

<script setup>
import { useSystemStore } from '@/store/system.js'
import Header from './Header.vue'

const systemStore = useSystemStore()
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--system-bg);
  .content {
  }
}
</style>
