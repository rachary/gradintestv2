<script setup lang="ts">
import { computed } from 'vue'
import { formatName } from '@/formatters/name'
import { formatTime } from '@/formatters/date'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{ 
  messages: Messages[],
  user: User | undefined
}>()

const authStore = useAuthStore()

const currentUser = computed(() => authStore.getUserAuthentication)

const user = computed(() => props.user)

const filteredMessages = computed(() => {
  if (!currentUser.value || !user.value) {
    return []
  }

  return props.messages
    .filter(
      msg => (msg.user_id === currentUser.value?.id && msg.receiver_id === user.value?.id) ||
             (msg.user_id === user.value?.id && msg.receiver_id === currentUser.value?.id)
    )
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
})
</script>

<template>
  <div class="h-full relative">
    <div v-for="(message, index) in filteredMessages" :key="index" class="message-container flex flex-col gap-2 relative z-10 py-4 px-8">
      <transition name="fade-down">
        <div v-if="message.user_id === currentUser?.id" class="max-w-screen-xs w-fit bg-secondary-1 dark:bg-primary-2 p-2 card self-end relative chat-bubble chat-bubble-right">
          <p class="text-xs font-semibold text-blue-500 capitalize dark:text-secondary-1">{{ formatName(currentUser?.email ?? '') }}</p>
          <div class="flex items-end gap-1 mt-1">
            <p class="dark:text-secondary-1">{{ message.message }}</p>
            <p class="text-end text-xs translate-y-1 dark:text-secondary-1">{{ formatTime(message.created_at) }}</p>
          </div>
        </div>
        <div v-else class="max-w-screen-xs w-fit bg-secondary-1 dark:bg-primary-2 p-2 card relative chat-bubble-left">
          <p class="text-xs font-semibold text-red-500 dark:text-secondary-1">{{ formatName(props.user?.email || '') }}</p>
          <div class="flex items-end gap-1 mt-1">
            <p class="dark:text-secondary-1">{{ message.message }}</p>
            <p class="text-end text-xs translate-y-1 dark:text-secondary-1">{{ formatTime(message.created_at) }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.chat-bubble-left {
  &:before {
    content: '';
    clip-path: polygon(100% 0, 0 0, 100% 100%);
    @apply absolute left-0 -translate-x-3/4 shadow-md;
    @apply w-5 h-5 bg-secondary-1 dark:bg-primary-2;
  }
}
.chat-bubble-right {
  &:before {
    content: '';
    clip-path: polygon(100% 0, 0 0, 0 100%);
    @apply absolute !left-auto right-0 !translate-x-3/4 shadow-md;
    @apply w-5 h-5 bg-secondary-1 dark:bg-primary-2;
  }
}
.fade-down-enter-active,
.fade-down-leave-active {
  @apply opacity-50 transition translate-y-0
}

.fade-down-enter-from,
.fade-down-leave-to {
  @apply opacity-0 translate-y-full
}
</style>