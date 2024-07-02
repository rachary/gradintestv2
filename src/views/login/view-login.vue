<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import ComponentAuth from './component-auth.vue'
import { useUserStore } from '@/stores/user'
import { VueWriter } from 'vue-writer'
import { useRouter } from 'vue-router'
import { computed, watch } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

userStore.initializedUsers()
authStore.initializedAuthentication()

const auth = computed(() => authStore.getAuthentication)

const checkAuth = () => {
  if (auth.value) {
    router.push({ name: 'home'})
  }
}

checkAuth()

watch(auth, () => checkAuth)
</script>

<template>
  <main>
    <div class="flex w-full h-screen">
      <div class="w-full md:w-1/2 bg-primary-1 dark:bg-primary-3 h-full flex items-center justify-center">
        <h1 class="font-lato text-secondary-1 py-2 px-4 text-5xl inset-0 absolute flex">gradin <span><vue-writer class="text-primary-2" :array="['test', 'chat']"></vue-writer></span></h1>
        <div class="card w-96 bg-secondary-1 ">
          <div class="p-8 space-y-4">
            <p class="text-base font-semibold text-center">Log in to enjoy the application.</p>
            <div>
              <component-auth></component-auth>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-full bg-secondary-1 dark:brightness-75 duration-200 items-center justify-center hidden md:flex">
        <img src="/images/laptop.jpg" alt="" class="h-full w-full object-cover">
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
</style>