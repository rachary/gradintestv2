<script setup lang="ts">
import ComponentAuth from './component-auth.vue';
import { useUserStore } from '@/stores/user';
import { VueWriter } from 'vue-writer'

const userStore = useUserStore()
userStore.initializedUsers()
</script>

<template>
  <main>
    <div class="flex h-screen">
      <div class="w-full sm:w-1/2 bg-primary-1 h-full flex items-center justify-center absolute">
        <h1 class="font-lato text-secondary-1 py-2 px-4 text-5xl inset-0 absolute">gradin<vue-writer class="text-primary-2" :array="['Hello', 'World']"></vue-writer></h1>
        <div class="card w-96 bg-secondary-1 ">
          <div class="p-8 space-y-4">
            <p class="text-base font-semibold text-center">Log in to enjoy the application.</p>
            <div>
              <component-auth></component-auth>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 bg-secondary-1 block sm:hidden"></div>
    </div>
  </main>
</template>
<style lang="postcss" scoped>
</style>