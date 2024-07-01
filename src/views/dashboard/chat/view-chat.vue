<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ComponentChatHeader from './component-chat-header.vue'
import ComponentChatConversation from './component-chat-conversation.vue'
import ComponentChatSearch from './component-chat-search.vue'
import { useMessageStore } from '@/stores/message';
import { computed, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';

const route = useRoute()
const userStore = useUserStore()
const authStore = useAuthStore()
const messageStore = useMessageStore()

messageStore.getMessagesFromLocalStorage()

const currentUser = authStore.getUserAuthentication || undefined

const user = computed(() => userStore.getUserById(String(route.params.id)))

const messageContainer = ref<HTMLDivElement | null>(null)

const inputMessage = ref('')

const searchMessage = ref(false)

const searchToggle = () => {
  searchMessage.value = !searchMessage.value
}

const submit = () => {
  messageStore.sendMessage(currentUser?.id || '', String(route.params.id), inputMessage.value)
  inputMessage.value = ''

  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}
</script>

<template>
  <div class="flex h-full">
    <div class="bg-yellow-50 w-full relative flex flex-col justify-between">
      <img src="/images/background-chat.jpg" class=" w-full absolute h-full object-cover opacity-30 z-0" alt="">
      <p class="absolute opacity-30 text-4xl text-primary-3 font-semibold w-full h-full flex items-center justify-center">gradintest</p>
      <div class="h-auto relative z-20">

        <component-chat-header :user="user" @search-toggle="searchToggle"></component-chat-header>
      </div>
      <div ref="conversationContainer" class="message-container h-full overflow-y-auto relative">
        <component-chat-conversation :user="user" :messages="messageStore.messages"></component-chat-conversation>
      </div>
      <form class="h-auto bg-primary-1 px-2 flex items-center relative z-10 py-1" @submit.prevent="submit">
        <input ref="input" v-model="inputMessage" v-focus type="text" placeholder="Type a message..." class="w-full py-2 px-2 rounded-md" required>
        <button type="submit" class="pr-2 pl-4" title="send message">
          <icon icon="mdi:paper-airplane" class="text-2xl text-secondary-1"></icon>
        </button>
      </form>
    </div>
    <transition name="slide-left">
      <div v-show="searchMessage" class="w-[720px]">
        <component-chat-search :user="user" :current-user="currentUser" @search-toggle="searchToggle"></component-chat-search>
      </div>
    </transition>
    </div>
</template>
<style lang="postcss" scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  @apply transition translate-x-0
}

.slide-left-enter-from,
.slide-left-leave-to {
  @apply translate-x-full
}
.slide-left.main-enter-active,
.slide-left.main-leave-active {
  @apply transition w-full duration-1000
}

.slide-left.main-enter-from,
.slide-left.main-leave-to {
  @apply w-[calc(100%-720px)]
}
</style>
