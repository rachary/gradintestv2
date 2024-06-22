<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ComponentChatHeader from './component-chat-header.vue'
import ComponentChatConversation from './component-chat-conversation.vue'
import ComponentChatSearch from './component-chat-search.vue'
import { useMessageStore } from '@/stores/message';
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const messageStore = useMessageStore()
const inputMessage = ref('')
const route = useRoute()
const authStore = useAuthStore()
authStore.loadAuth()

const sender_id = authStore.auth.id
const receiver_id = route.params.id

const submit = () => {
  messageStore.findConversationsById(inputMessage.value, receiver_id, sender_id)
  inputMessage.value = ''
  }

</script>
<template>
  <div class="flex h-full">
    <div class=" bg-yellow-50 w-full relative flex flex-col justify-between">
      <img src="/images/background-chat.jpg" class=" w-full absolute h-full object-cover opacity-30 z-0" alt="">
      <p class="absolute opacity-30 text-4xl text-primary-3 font-semibold w-full h-full flex items-center justify-center">gradintest</p>
      <div class="h-auto relative z-20">
        <component-chat-header></component-chat-header>
      </div>
      <div class="h-full overflow-y-auto relative" >
        <component-chat-conversation :conversations="messageStore.conversations"></component-chat-conversation>
      </div>
      <form class="h-auto bg-primary-1 px-2 flex items-center relative z-10 py-1" @submit.prevent="submit">
        <input v-model="inputMessage" type="text" placeholder="Type a message..." class="w-full py-2 px-2 rounded-md" required>
        <button type="submit" class="pr-2 pl-4">
          <icon icon="mdi:paper-airplane" class="text-2xl text-secondary-1"></icon>
        </button>
      </form>
    </div>
    <!-- <component-chat-search></component-chat-search> -->
  </div>
</template>
<style lang="postcss" scoped>
  
</style>