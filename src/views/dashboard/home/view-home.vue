<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <main>
    <div class="hidden w-full h-screen relative xl:flex items-center bg-center bg-cover bg-transparent justify-center bg-[url('/images/background-2.jpg')]">
      <div class="absolute text-xs bottom-16 text-secondary-2 flex items-center gap-1">
        <icon icon="mdi:lock" class=""></icon>
        <p class="">Your personal messages are end-to-end encrypted</p>
      </div>
      <div class="text-center -translate-y-5">
        <h1 class="font-lato text-[4rem] text-primary-2">gradintest</h1>
        <p class="text-secondary-2 text-xs">Start exciting conversations with your friends now!</p>
      </div>
    </div>
  </main>
</template>
<style lang="postcss" scoped>

</style>