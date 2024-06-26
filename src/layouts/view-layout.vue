<script setup lang="ts">
import { useRoute } from 'vue-router';
import ComponentSidebar from './component-sidebar.vue'
import { computed, watch } from 'vue';

const route = useRoute()

const isMobile = computed(() => {
  return window.innerWidth < 1280
})
const routeChat = computed(() => {
  return route.name === 'chat'
})
watch(route, () => {
  if (isMobile.value && route.name === 'chat') {
    document.querySelector('div')?.scrollIntoView({ behavior: 'smooth'})
  }
})
</script>

<template>
  <div class="w-full h-full opacity-10 bg-black z-10 absolute"></div>
  <img src="/images/background-1.jpg" alt="" class="w-full object-cover h-full absolute">
  <div class="h-screen w-full py-0 px-0 xl:py-5 xl:px-7 flex items-center justify-between">
    <div class="w-full h-full overflow-hidden xl:rounded-lg shadow-md z-20 relative flex">
      <div :class="{'hidden': isMobile && routeChat}" class="w-full xl:w-1/2">
        <component-sidebar></component-sidebar>
      </div>
      <div class="w-full block" :class="{'hidden': isMobile && !routeChat}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
</style>