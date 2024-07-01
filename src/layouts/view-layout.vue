<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import ComponentSidebar from './component-sidebar.vue'
import { computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()
const messageStore = useMessageStore()

const router = useRouter()

onMounted(() => {
  messageStore.generateRandomMessages()
})
messageStore.getMessagesFromLocalStorage()
userStore.initializedUsers()
authStore.initializedAuthentication()

const auth = computed(() => authStore.getAuthentication)

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

const checkAuth = () => {
  if (auth.value) {
    router.push({ name: 'home'})
  }
}
watch(auth, () => checkAuth)
</script>

<template>
  <div class="w-full h-full opacity-10 bg-black z-10 absolute"></div>
  <img src="/images/background-1.jpg" alt="" class="w-full object-cover h-full absolute">
  <div class="h-screen w-full py-0 px-0 xl:py-5 xl:px-7 flex items-center justify-between">
    <div class="w-full h-full overflow-hidden xl:rounded-lg shadow-md z-20 relative flex">
      <div :class="{'hidden': isMobile && routeChat}" class="w-full xl:w-1/3">
        <component-sidebar></component-sidebar>
      </div>
      <div class="w-full xl:w-2/3 block" :class="{'hidden': isMobile && !routeChat}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>