<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { formatName } from '@/formatters/name';
import { formatTime } from '@/formatters/date'

const props = defineProps<{ 
  conversations: Conversation[]
}>()
const userStore = useUserStore()
const authStore = useAuthStore()
const sender_id = authStore.auth.id
const email = authStore.auth.email
const route = useRoute()
const receiver_id = computed(() => {
  return route.params.id
})
const user = computed(() => {
  return userStore.users.find(user => user.id === receiver_id.value)
})
const messageStore = useMessageStore()
messageStore.loadConversations()
const conversations = computed(() => 
  props.conversations.filter(conv => 
  conv.user_ids.includes(receiver_id.value) && conv.user_ids.includes(sender_id))
)

</script>
<template>
  <div class="h-full relative">
    <div v-for="conversation in conversations" :key="conversation.messages.user_id" class="flex flex-col gap-2 relative z-10 py-4 px-8">

      <div 
      v-for="chat in conversation.messages" :key="chat.user_id" 
      class="max-w-screen-xs w-fit bg-secondary-1 p-2 card relative chat-bubble chat-bubble-left" 
      :class="{'max-w-screen-xs w-fit bg-secondary-1 p-2 card self-end relative chat-bubble-right': chat.user_id == sender_id}">
        <p v-if="chat.user_id === receiver_id" class="text-xs font-semibold text-red-500">{{ formatName(user.email) }}</p>
        <p v-else class="text-xs font-semibold text-blue-500">{{ formatName(email) }}</p>
        <div class=" flex items-end gap-1 mt-1">
          <p>{{ chat.message }}</p>
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