<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue';
import { formatName } from '@/formatters/name';
import { formatTime } from '@/formatters/date';
import { useMessageStore } from '@/stores/message';

const props = defineProps<{ 
  user: User | undefined
  currentUser: User | undefined
}>()

const emit = defineEmits<{
  (e: 'searchToggle'): void
}>()

const emitToggle = () => {
  emit('searchToggle')
}
const messageStore = useMessageStore()

const searchMessage = ref('')

const filteredMessage = computed(() => {
  return messageStore.getMessagesById(props.user?.id || '', props.currentUser?.id || '')

})

const highlightText = (text: string): string => {
  return text.replace(searchMessage.value, `<span class="font-bold text-primary-1">${searchMessage.value}</span>`)
}
</script>

<template>
  <div class="h-full bg-secondary-1 py-2">
    <div class="pb-4 flex items-center gap-4 px-4">
      <button class="py-2" title="close search message" @click="emitToggle()">
        <icon icon="mdi:window-close" class="text-2xl"></icon>
      </button>
      <p class="">Search message</p>
    </div>
    <div class="flex items-center shadow-md pb-2 px-4">
      <label for="searchMessage" class="cursor-pointer">
        <icon icon="mdi:search" class="pl-2 pr-1 h-10 rounded-l-md text-4xl bg-primary-1 text-secondary-1"></icon>
      </label>
      <input 
      id="searchMessage" 
      v-model="searchMessage"
      v-focus
      type="text" 
      class="bg-primary-1 w-full text-secondary-1 rounded-r-md placeholder:text-secondary-1 py-2 pr-2 pl-1" 
      placeholder="Search message...">
    </div>
    <div class="h-full overflow-y-auto">
      <div v-if="searchMessage">
        <div v-for="chat in filteredMessage"  :key="chat.user_id">
          <div class="p-4 border-b ">
            <p class="text-xs">{{ formatTime(chat.created_at) }}</p>
            <p v-html="highlightText(chat.message)"></p>
          </div>
        </div>
      </div>
      <div v-else class="text-center my-20">
        <p class="text-slate-400">Search message within <span class="font-semibold text-primary-1">{{ formatName(props.user?.email || '') }}</span></p>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>