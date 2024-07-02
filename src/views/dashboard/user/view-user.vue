<script setup lang="ts">
import ComponentUserlist from './component-userlist.vue'
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue'
import { useDark, useToggle } from '@vueuse/core';
import { useMessageStore } from '@/stores/message';
import { useAuthStore } from '@/stores/auth';

const messageStore = useMessageStore()
const authStore = useAuthStore()

const props = defineProps<{ 
  users: User[],
}>()
const searchUser = ref('')
const toggleMenu = ref(false)
const isActiveUnread = ref(true)

const emit = defineEmits<{
  (e: 'toggle', state: ToggleKeySidebar): void
  (e: 'logout'): void
}>()

const emitToggle = (state: ToggleKeySidebar) => {
  emit('toggle', state)
}

const emitLogout = () => {
  emit('logout')
}

const currentUser = computed(() => authStore.getUserAuthentication)

const filteredUsers = computed(() => {
  return props.users.filter(user => {
    const matchEmail = user.email.toLowerCase().includes(searchUser.value.toLowerCase())

    if (isActiveUnread.value) {
      return matchEmail
    } else {
      const messages = messageStore.getMessagesById(user.id, currentUser.value?.id || '')
      const unreadMessages = messages.some(msg => 
        msg.receiver_id !== user.id && msg.read_at === null)
      return matchEmail && unreadMessages
    }
  })
})

const isDark = useDark({
  onChanged(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
})
const toggleDark = useToggle(isDark)
</script>
<template>
  <div class="border-l border-gray-300 h-full xl:pr-1 select-none w-full flex flex-col justify-between">
    <div class="w-full py-3 px-4 flex justify-between items-center">
      <p class="text-2xl font-extrabold text-primary-3 dark:text-secondary-1">Chats</p>
      <div class="flex items-center gap-4">
        <div>
          <button class="px-1 rounded-full flex items-center gap-2 bg-blue-400 dark:bg-blue-950" @click="toggleDark()">
            <div class="relative rounded-full p-[1px] shadow-md">
              <div class="text-secondary-1 opacity-100 dark:opacity-0 duration-200">
                <icon icon="mdi:cloud" class="absolute text-xl bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2"></icon>
              </div>
              <div class="opacity-0 dark:opacity-100 rounded-full translate-x-full dark:translate-x-0 duration-200">
                <icon icon="emojione:full-moon" class="text-xl"></icon>
              </div>
            </div>
            <div class="relative rounded-full p-[1px] shadow-md">
              <div class="text-secondary-1 opacity-0 dark:opacity-100 duration-200">
                <icon icon="mdi:star" class="absolute text-[10px] bottom-1/2 right-1/2"></icon>
                <icon icon="mdi:star" class="absolute text-[6px] bottom-[14px] right-1"></icon>
                <icon icon="mdi:star" class="absolute text-[8px] bottom-1 right-2"></icon>
              </div>
              <div class="dark:opacity-0 rounded-full dark:-translate-x-full translate-x-0 duration-200">
                <icon icon="emojione:sun" class="text-2xl"></icon>
              </div>
            </div>
          </button>
        </div>
        <div class="relative flex items-center">
          <button title="Menu" class="p-1 rounded-full duration-300" :class="{ 'bg-primary-2 dark:bg-secondary-1': toggleMenu}" @click="toggleMenu = !toggleMenu">
            <icon icon="mdi:dots-vertical" class="text-primary-3 dark:text-secondary-1 text-3xl" :class="{ '!text-primary-3': toggleMenu}" ></icon>
          </button>
          <transition name="popup">
            <div v-if="toggleMenu" class="absolute z-10 bg-primary-2 dark:bg-primary-3 py-1 scale-100 shadow-card top-10 right-0">
              <button class="btn-menu " @click="emitToggle('profile')">
                <icon icon="mdi:user" class="text-2xl"></icon>
                <p class="">Profile</p>
              </button>
              <button class="btn-menu"  @click="emitToggle('setting')">
                <icon icon="mdi:settings-outline" class="text-2xl"></icon>
                <p class="">Setting</p>
              </button>
              <button class="btn-menu" @click="emitLogout">
                <icon icon="mdi:logout" class="text-2xl"></icon>
                <p class="">Logout</p>
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="px-1 pb-2 sm:pr-3 sm:pl-4">
      <div class="flex items-center">
        <label for="searchUser" class="cursor-pointer">
          <icon icon="mdi:search" class="pl-2 pr-1 h-10 rounded-l-md text-4xl bg-primary-1 dark:bg-secondary-1 text-secondary-1 dark:text-primary-3"></icon>
        </label>
        <input 
        id="searchUser" 
        v-model="searchUser"
        type="text" 
        class="bg-primary-1 dark:bg-secondary-1 w-full text-secondary-1 dark:text-primary-3 rounded-r-md placeholder:text-secondary-1 dark:placeholder:text-primary-3 py-2 pr-2 pl-1" 
        placeholder="Search user...">
      </div>
      <div class="space-x-4 mt-2 font-semibold">
        <button class="py-2 px-4 rounded-full duration-200 text-primary-3 dark:text-secondary-1" :class="{'bg-primary-1 dark:bg-primary-2 text-secondary-1': isActiveUnread }" @click="isActiveUnread = true">All</button>
        <button class="py-2 px-4 rounded-full duration-200 text-primary-3 dark:text-secondary-1" :class="{'bg-primary-1 dark:bg-primary-2 text-secondary-1': !isActiveUnread }" @click="isActiveUnread = false">Unread</button>
      </div>
    </div>
    <div class="h-full w-full overflow-y-scroll duration-200">
      <transition name="switch" mode="out-in">
        <component-userlist v-if="filteredUsers.length !== 0" :users="filteredUsers"></component-userlist>
        <p v-else class="text-center py-8 tracking-wider font-semibold text-primary-3 dark:text-secondary-1">User not found!</p>
      </transition>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.shadow-card {
  box-shadow: 0px 1.5px 3px 1px rgba(0,0,0,0.50);
  -webkit-box-shadow: 0px 1.5px 3px 1px rgba(0,0,0,0.50);
  -moz-box-shadow: 0px 1.5px 3px 1px rgba(0,0,0,0.50);
}
.btn-menu {
  @apply flex gap-2 px-8 py-1 text-secondary-1 hover:bg-slate-300 hover:bg-opacity-50 w-full
}
.popup-enter-active,
.popup-leave-active {
  @apply transition-all duration-200
}
.popup-enter-from,
.popup-leave-to {
  @apply opacity-0 scale-50 -translate-y-10 translate-x-7
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