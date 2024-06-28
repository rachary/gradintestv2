<script setup lang="ts">
import { computed } from 'vue';
import { formatName } from '@/formatters/name';
import { formatTime } from '@/formatters/date'
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{ 
  conversations: Conversation[],
  user: User | undefined
}>()

const authStore = useAuthStore()
const currentUser = authStore.getUserAuthentication

const conversations = computed(() => 
  props.conversations.filter(conversation => 
  conversation.user_ids.includes(props.user?.id || '') && conversation.user_ids.includes(currentUser?.id || ''))
)

</script>
<template>
  <div class="h-full relative">
    <div v-for="(conversation, index) in conversations" :key="index" class="flex flex-col gap-2 relative z-10 py-4 px-8">
      <div 
      v-for="chat in conversation.messages" :key="chat.user_id" 
      class="max-w-screen-xs w-fit bg-secondary-1 p-2 card relative chat-bubble chat-bubble-left" 
      :class="{'max-w-screen-xs w-fit bg-secondary-1 p-2 card self-end relative chat-bubble-right': chat.user_id == currentUser?.id}">
        <p v-if="chat.user_id === props.user?.id" class="text-xs font-semibold text-red-500">{{ formatName(props.user?.email || '') }}</p>
        <p v-else class="text-xs font-semibold text-blue-500 capitalize">{{ formatName(currentUser?.email ?? '') }}</p>
        <div class="flex items-end gap-1 mt-1">
          <p class="">{{ chat.message }}</p>
          <p class="text-end text-xs translate-y-1">{{ formatTime(chat.created_at) }}</p>
        </div>
      </div>

    </div>
  </div>
</template>
<style lang="postcss" scoped>
.chat-bubble-left {
  &:before {
    content: '';
    clip-path: polygon(100% 0, 0 0, 100% 100%);
    @apply absolute top-0 left-0 -translate-x-3/4 shadow-md;
    @apply w-5 h-5 bg-secondary-1;
  }
}
.chat-bubble-right {
  &:before {
    content: '';
    clip-path: polygon(100% 0, 0 0, 0 100%);
    @apply absolute !left-auto right-0 !translate-x-3/4 shadow-md;
    @apply w-5 h-5 bg-secondary-1;
  }
}
</style>