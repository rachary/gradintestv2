<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatName } from '@/formatters/name';

const props = defineProps<{ 
  profile: User
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
    <div class="w-[100vw] xl:w-[34.25rem] py-3 px-4 flex justify-between items-center">
      <p class="text-2xl font-extrabold text-primary-3">Settings</p>
      <button class="md:hidden block text-2xl text-primary-3 p-1 rounded-full mr-2 duration-300 hover:bg-primary-2" @click="emitToggle('chat')">
        <icon icon="carbon:return" ></icon>
      </button>
    </div>
    <button class="btn-menu py-8" @click="emitToggle('profile')">
      <div class="w-24">
        <img :src="props.profile.avatar" alt="user default" class="rounded-full w-full">
      </div>
      <div class="text-left">
        <p class="font-semibold text-primary-3 capitalize">{{ formatName(props.profile.email) }}</p>
        <p class="font-semibold text-primary-3">{{ props.profile.email }}</p>
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