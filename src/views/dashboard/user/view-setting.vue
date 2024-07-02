<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatName } from '@/formatters/name';

const props = defineProps<{ 
  currentUser: User | undefined
}>()

const emit = defineEmits<{
  (e: 'toggle', state: ToggleKeySidebar): void
  (e: 'logout'): void
}>()

const emitToggle = (state: ToggleKeySidebar) => {
  emit('toggle', state)
}

const emitLogout = () => {
  emit('logout')
}
</script>
<template>
  <div class="border-l border-gray-300 h-full w-full select-none">
    <div class="w-full py-3 px-4 flex justify-between items-center">
      <p class="text-2xl font-extrabold text-primary-3 dark:text-secondary-1">Settings</p>
      <button class="md:hidden block text-2xl text-primary-3 p-1 rounded-full mr-2 duration-300 hover:bg-primary-2" @click="emitToggle('chat')">
        <icon icon="carbon:return" ></icon>
      </button>
    </div>
    <button class="btn-menu bg-primary-1 dark:bg-primary-2 py-8" @click="emitToggle('profile')">
      <div class="w-24">
        <img :src="props.currentUser?.avatar" alt="user default" class="rounded-full w-full">
      </div>
      <div class="text-left">
        <p class="font-semibold text-primary-3 dark:text-secondary-1 capitalize">{{ formatName(props.currentUser?.email || '') }}</p>
        <p class="font-semibold text-primary-3 dark:text-secondary-1">{{ props.currentUser?.email }}</p>
      </div>
    </button>
    <div class="">
      <button title="logout" class="btn-menu text-red-500" @click="emitLogout()">
        <icon icon="mdi:logout" class="text-2xl"></icon>
        <p class="text-xl border-b border-gray-300 w-full text-left py-4">Logout</p>
      </button>
    </div>

  </div>
</template>
<style lang="postcss" scoped>
.btn-menu {
 @apply flex pl-4 items-center gap-4 w-full hover:bg-gray-200
}
</style>