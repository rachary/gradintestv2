<script setup lang="ts">
import { formatName } from '@/formatters/name';
const props = defineProps<{ 
  conversation: Message[],
  email: string,
  senderId: number,
  receiverId: number
}>()
</script>
<template>
        <div 
     
      class="max-w-screen-xs w-fit bg-secondary-1 p-2 card relative chat-bubble" 
      :class="{'max-w-screen-xs w-fit bg-secondary-1 p-2 card self-end relative chat-bubble-right': props.conversation.user_id == props.senderId}">
        <p v-if="props.conversation.user_id === props.receiverId" class="font-semibold text-red-500">{{ formatName(props.email) }}</p>
        <p v-else class="font-semibold text-blue-500">{{ formatName(email) }}</p>
        <div class=" flex items-end gap-1 mt-1">
          <p>{{ props.conversation.message }}</p>
          <p class="text-end text-xs translate-y-1">{{ props.conversation.created_at }}</p>
        </div>
      </div>
</template>