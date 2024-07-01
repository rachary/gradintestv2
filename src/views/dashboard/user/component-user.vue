<script setup lang="ts">
import { formatName } from '@/formatters/name'
import { useAuthStore } from '@/stores/auth'
import { formatTime } from '@/formatters/date'
import { useMessageStore } from '@/stores/message'
import { computed, nextTick } from 'vue';

const props = defineProps<{ user: User }>()

const authStore = useAuthStore()
const currentUser = computed(() => authStore.getUserAuthentication)
const messageStore = useMessageStore()

const getLatestMessage = (user1: string, user2: string) => {
  return messageStore.getLatestMessages(user1, user2)
}
const markAsReadMessage = (user1: string, user2: string) => {
  messageStore.markAsReadMessage(user1, user2)

  setTimeout(() => {
    nextTick(() => {
    const messageContainer = document.querySelector('.message-container')
    if (messageContainer) {
      messageContainer.scrollIntoView({ behavior: 'smooth'})
      messageContainer.scrollTo({ top: messageContainer.scrollHeight, behavior: 'smooth' })
    }
  })
  }, 1)
}
</script>

<template>
  <div>
    <router-link :to="{ name: 'chat', params: { id: props.user.id}}" class="flex items-center hover:bg-slate-200 dark:hover:bg-primary-2" @click="markAsReadMessage(props.user.id, currentUser?.id || '')">
      <div class="min-w-8 xl:min-w-[4.5rem] ml-2 xl:ml-4 mr-2">
        <img :src="props.user.avatar" alt="" class="rounded-full w-12 xl:w-14">
      </div>
      <div class="border-b w-full border-gray-300 space-y-1 py-3 pr-4">
        <div class="text-base flex justify-between items-center">
          <p class="font-semibold text-primary-3 dark:text-secondary-1" >{{ (formatName(props.user.email)) }}</p>
          <p class="text-xs text-black dark:text-secondary-1">{{ formatTime(getLatestMessage(props.user.id, currentUser?.id || '')?.created_at || '') }}</p>
        </div>
        <div class="flex justify-between items-left gap-2 text-base h-full py-1">
          <div class="w-full text-black dark:text-secondary-1">
            <p v-if="getLatestMessage(props.user.id, currentUser?.id || '')" class="line-clamp-1">
              {{ getLatestMessage(props.user.id, currentUser?.id || '')?.message }}
            </p>
            <p v-else class="italic">Start chatting now!</p>
          </div>
          <p class=" text-xs text-right min-w-10" :class="{'bg-transparent': messageStore.countUnreadMessage(props.user.id)}">
            <span v-if="messageStore.countUnreadMessage(props.user.id)" class="rounded-full px-2 py-1 w-fit bg-primary-1 text-secondary-1 dark:bg-secondary-1 dark:text-primary-3">{{ messageStore.countUnreadMessage(props.user.id) }}</span>
          </p>
        </div>
      </div>
      <div>
      </div>
    </router-link>
  </div>
</template>

<style lang="postcss" scoped></style>