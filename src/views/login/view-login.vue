<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import ComponentAuth from './component-auth.vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { VueWriter } from 'vue-writer'

const userStore = useUserStore()
userStore.initializedUsers()
const authStore = useAuthStore()
authStore.getAuthData()
const isAuth = computed(() => authStore.authData?.userAuth) 
console.log(isAuth.value)
</script>

<template>
  <main>
    <div class="flex w-full h-screen">
      <div class="w-full md:w-1/2 bg-primary-1 h-full flex items-center justify-center">
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
      <div class="w-1/2 h-full bg-secondary-1 items-center justify-center hidden md:flex">
        <div class="w-1/2 relative hidden xl:flex">
          <img src="/images/laptop.png" alt="" class="w-full">
          <img src="/images/1.png" alt="" class="absolute top-4  right-[60px] w-[75%] object-fill h-[62%]">
          <img src="/images/2.png" alt="" class="absolute top-4  right-[60px] w-[75%] object-fill h-[62%]">
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="postcss" scoped>
</style>