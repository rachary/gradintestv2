<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue';
import { formatName } from '@/formatters/name';

const props = defineProps<{ 
  user: User | undefined
}>()
const closeToggle = ref(false)
const searchToggle = ref(false)
const emit = defineEmits<{
  (e: 'searchToggle'): void
}>()

const emitToggle = () => {
  searchToggle.value = !searchToggle.value
  emit('searchToggle')
}
</script>
<template>
  <div  class="bg-primary-1 h-full flex justify-between items-center pl-3 pr-5 py-2 relative">
    <div class="flex items-center gap-4">
      <img :src="props.user?.avatar" class="w-12 rounded-full" alt="">
      <p class="text-secondary-1 capitalize">{{ formatName(props.user?.email || '') }}</p>
    </div>
    <div class="flex items-center space-x-4">
      <div>
        <button title="search message" class="p-1 rounded-full duration-300" :class="{ 'bg-secondary-1': searchToggle }" @click="emitToggle()">
          <icon icon="mdi:search" class="text-secondary-1 text-3xl cursor-pointer" :class="{ '!text-primary-1': searchToggle }"></icon>
        </button>
      </div>
      <div class="relative">
        <button title="close conversation" class="p-1 rounded-full duration-300" :class="{ 'bg-secondary-1': closeToggle}" @click="closeToggle = !closeToggle">
          <icon icon="mdi:dots-vertical" class="text-secondary-1 text-3xl" :class="{ '!text-primary-1': closeToggle}"></icon>
        </button>
        <transition name="popup">
          <div v-if="closeToggle" class="absolute z-10 right-0 shadow-md rounded-sm bg-secondary-1 py-1" @click="closeToggle = !closeToggle">
            <router-link :to="{ name: 'home'}" >
              <p class="text-xs py-2 px-4 hover:bg-slate-200 cursor-pointer text-primary-3">Close</p>
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.popup-enter-active,
.popup-leave-active {
  @apply opacity-50 transition 
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-0 scale-50 -translate-y-5 translate-x-1
}
</style>