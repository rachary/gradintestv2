<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { faker } from '@faker-js/faker'
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { formatName } from '@/formatters/name';

const closeToggle = ref(false)
const authStore = useAuthStore()
</script>
<template>
  <div  class="bg-primary-1 h-full flex justify-between items-center pl-3 pr-5 py-1 relative">
    <div class="flex items-center gap-4">
      <img :src="faker.image.avatar()" class="w-12 rounded-full" alt="">
      <p class="text-secondary-1">TES</p>
    </div>
    <div class="flex items-center space-x-4">
      <icon icon="mdi:search" class="text-secondary-1 text-2xl cursor-pointer"></icon>
      <div class="relative">
        <icon icon="mdi:dots-vertical" class="text-secondary-1 text-3xl cursor-pointer" @click="closeToggle = !closeToggle" ></icon>
        <transition name="slide-down" mode="out-in">
          <div v-if="closeToggle" class="absolute z-10 right-0 shadow-md rounded-sm bg-secondary-1 py-1" @click="closeToggle = !closeToggle">
            <router-link   :to="{ name: 'home'}" >
              <p class="text-xs py-2 px-4 hover:bg-slate-200 cursor-pointer">Close</p>
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
  
</style>