<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { formatName } from '@/formatters/name';
import { formatTime } from '@/formatters/date';

const props = defineProps<{ 
  conversations: Conversation[],
  user: User | undefined
  currentUser: User | undefined
}>()

const emit = defineEmits<{
  (e: 'searchToggle'): void
}>()

const route = useRoute()
const router = useRouter()

const emitToggle = () => {
  emit('searchToggle')
}

const searchMessage = ref('')
const filteredMessage = computed(() => {
  return props.conversations.filter(conversation =>
    conversation.user_ids.includes(props.user?.id || '') && conversation.user_ids.includes(props.currentUser?.id || '')
  )
  // .map(conversation => ({
  //   ...conversation,
  //   messages: conversation.messages.filter(msg =>
  //     msg.message.toLowerCase().includes(searchMessage.value.toLowerCase())
  //   )
  // }))
})

const highlightText = (text: string): string => {
  if (!searchMessage.value) return text;

  const regex = new RegExp(searchMessage.value, 'gi');
  return text.replace(regex, `<p class="font-bold">${searchMessage.value}</p>`);
};
</script>
<template>
  <div class="w-[520px] h-full bg-secondary-1 py-2">
    <div class="pb-4 flex items-center gap-4 px-4">
      <button class="py-2" @click="emitToggle()">
        <icon icon="mdi:window-close" class="text-2xl"></icon>
      </button>
      <p class="">Search message</p>
    </div>
    <div class="flex items-center shadow-md pb-2 px-4">
      <label for="searchUser" class="cursor-pointer">
        <icon icon="mdi:search" class="pl-2 pr-1 h-10 rounded-l-md text-4xl bg-primary-1 text-secondary-1"></icon>
      </label>
      <input 
      id="searchUser" 
      v-model="searchMessage"
      type="text" 
      class="bg-primary-1 w-full text-secondary-1 rounded-r-md placeholder:text-secondary-1 py-2 pr-2 pl-1" 
      placeholder="Search message...">
    </div>
    <div v-for="(conversation, index) in filteredMessage" :key="index" class="h-full overflow-y-auto">
      {{ conversation.messages }}
      <div v-for="chat in conversation.messages" :key="chat.user_id">
        <div v-if="searchMessage" class="p-4 border-b ">
          <p class="text-xs">{{ formatTime(chat.created_at) }}</p>
          <p class="text-primary-1">{{ chat.message }}</p>
        </div>
        <div v-else class="text-center my-20">
          <p>Search message within {{ formatName(props.user?.email || '') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
  
</style>