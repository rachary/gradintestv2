<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatName } from '@/formatters/name';
import { computed } from 'vue';

const props = defineProps<{ 
  currentUser: User | undefined
}>()
const emit = defineEmits<{
  (e: 'toggle', state: ToggleKeySidebar): void
}>()

const emitToggle = (state: ToggleKeySidebar) => {
  emit('toggle', state)
}
</script>
<template>
  <div class="border-l border-gray-300 w-full h-full select-none flex flex-col">
    <div class="w-[100vw] xl:w-[34.25rem] py-3 px-4 flex justify-between items-center">
      <p class="text-2xl font-extrabold text-primary-3">Profile</p>
      <button class="md:hidden block text-2xl text-primary-3 p-1 rounded-full duration-300 mr-2" @click="emitToggle('chat')">
        <icon icon="carbon:return" ></icon>
      </button>
    </div>
    <div class="bg-primary-1 w-full flex items-center justify-center py-8">
      <div class="w-56">
        <img :src="props.currentUser?.avatar" alt="user default" class="rounded-full w-full">
      </div>
    </div>
    <div class="py-4 px-8 space-y-2 text-primary-3 ">
      <p>Your name</p>
      <p class="font-semibold text-xl capitalize">{{ formatName(props.currentUser?.email || '') }}</p>
    </div>
    <div class="py-4 px-8 space-y-2 text-primary-3 ">
      <p>Your email</p>
      <p class="font-semibold text-xl">{{ props.currentUser?.email }}</p>
    </div>
  </div>
</template>