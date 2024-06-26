<script setup lang="ts">
import { formatName } from '@/formatters/name'
import { useAuthStore } from '@/stores/auth';
import { useMessageStore } from '@/stores/message';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { formatTime } from '@/formatters/date'

const props = defineProps<{ users: User[] }>()
const route = useRoute()

const filteredUsers = computed<User[]>(() => {
  return props.users.filter((user) => 
    user.email.toLowerCase().includes(route.query.search ? String(route.query.search).toLowerCase() : '')
  )
})
const authStore = useAuthStore()
const currentUser = authStore.authData?.currentUser
const messageStore = useMessageStore()

const markAsRead = (user1: string, user2: string) => {
  messageStore.markMessagesAsRead(user1, user2)
}
const fetchLatestMessage = (user1: string, user2: string) => {
    if (user1 !== null && user2 !== null) {
      return messageStore.getLatestMessage(user1, user2)
    } else {
      return null
    }
}
const fetchUnreadMessage = (user1: string, user2: string) => {
  if (user1 !== null && user2 !== null) {
      return messageStore.countUnreadMessages(user1, user2)
    } else {
      return null
    }
}
</script>

<template>
  <div v-for="user in filteredUsers" :key="user.id" class="w-full">
    <router-link :to="{ name: 'chat', params: { id: user.id}}" class="flex items-center hover:bg-gray-200" @click="markAsRead(user.id, currentUser?.id || '')">
      <div class="min-w-8 xl:min-w-[4.5rem] ml-2 xl:ml-4 mr-2">
        <img :src="user.avatar" alt="" class="rounded-full w-12 xl:w-14">
      </div>
      <div class="border-b w-full border-gray-300 space-y-1 py-3 pr-4">
        <div class="text-base flex justify-between items-center">
          <p class="font-semibold text-primary-3">{{ formatName(user.email) }}</p>
          <p class="text-xs">{{ formatTime(fetchLatestMessage(user.id, currentUser?.id || '')?.created_at) }}</p>
        </div>
        <div class="flex justify-between items-left gap-2 text-base h-full py-1">
          <p class="truncate w-[74vw] xl:w-[20.75vw]">
            <span v-if="fetchLatestMessage(user.id, currentUser?.id || '')">{{ fetchLatestMessage(user.id, currentUser?.id || '')?.message }}</span>
            <span v-else class="italic "> Start chatting now!</span>
          </p>
          <p class=" text-xs text-center min-w-10 " :class="{'bg-transparent': fetchUnreadMessage(user.id, currentUser?.id || '') === 0}">
            <span v-if="fetchUnreadMessage(user.id, currentUser?.id || '')" class="rounded-full px-2 py-1 w-fit bg-primary-1 text-secondary-1">{{ fetchUnreadMessage(user.id, currentUser?.id || '') }}</span>
          </p>
        </div>
      </div>
      <div>
      </div>
    </router-link>
  </div>
</template>
<style lang="postcss" scoped></style>