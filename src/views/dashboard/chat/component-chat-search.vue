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
  const messages = messageStore.getMessagesById(props.user?.id || '', props.currentUser?.id || '')
  return messages
    .filter(msg => msg.message.toLowerCase().includes(searchMessage.value.toLowerCase()))
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
})

const highlightText = (text: string): string => {
  const searchRegExp = new RegExp(searchMessage.value, 'gi')
  return text.replace(searchRegExp, `<span class="font-bold text-primary-1">${searchMessage.value}</span>`)
}
</script>

<template>
  <div class="h-full bg-secondary-1 dark:bg-primary-3 duration-200 py-2">
    <div class="pb-4 flex items-center gap-4 px-4">
      <button class="py-2" title="close search message" @click="emitToggle()">
        <icon icon="mdi:window-close" class="text-2xl dark:text-secondary-1"></icon>
      </button>
      <p class="dark:text-secondary-1">Search message</p>
    </div>
    <div class="flex items-center shadow-md pb-2 px-4">
      <label for="searchMessage" class="cursor-pointer">
        <icon icon="mdi:search" class="pl-2 pr-1 h-10 rounded-l-md text-4xl bg-primary-1 dark:bg-secondary-1 text-secondary-1 dark:text-primary-3"></icon>
      </label>
      <input 
      id="searchMessage" 
      v-model="searchMessage"
      v-focus
      type="text" 
      class="bg-primary-1 dark:bg-secondary-1 w-full text-secondary-1 dark:text-primary-3 rounded-r-md placeholder:text-secondary-1 dark:placeholder:text-primary-3 py-2 pr-2 pl-1" 
      placeholder="Search message...">
    </div>
    <div class="h-full overflow-y-auto relative">
      <transition name="switch" mode="out-in">
        <div v-if="searchMessage">
          <transition-group tag="ul" name="list">
            <li v-for="(chat, index) in filteredMessage" :key="index" class="p-4 border-b ">
              <p class="text-xs dark:text-secondary-1">{{ formatTime(chat.created_at) }}</p>
              <p class="dark:text-secondary-1" v-html="highlightText(chat.message)"></p>
            </li>
          </transition-group>

          <div class="absolute opacity-0 w-full flex justify-center my-20" :class="{'opacity-100 delay-300': filteredMessage.length === 0}">
            <p class=" dark:text-secondary-1">No message found!</p>
          </div>
        </div>
        <div v-else class="text-center my-20">
          <div v-if="filteredMessage.length !== 0">
            <p class="text-slate-400">Search message within <span class="font-semibold text-primary-1 dark:text-secondary-1">{{ formatName(props.user?.email || '') }}</span></p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.list-enter-active,
.list-leave-active {
  @apply transition-all ease-in 
}
.list-enter-from,
.list-leave-to {
  @apply opacity-0 -translate-x-full
}

.switch-enter-active,
.switch-leave-active {
  @apply transition-all duration-200 
}

.switch-enter-from,
.switch-leave-to {
  @apply opacity-0 translate-y-10 
}

</style>