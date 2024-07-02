<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import ViewProfile from '@/views/dashboard/user/view-profile.vue'
import ViewUser from '@/views/dashboard/user/view-user.vue'
import ViewSetting from '@/views/dashboard/user/view-setting.vue'
import { computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const authStore = useAuthStore()
const router = useRouter()
const userStore = useUserStore()

const currentUser = computed(() => authStore.getUserAuthentication || undefined)

const users = computed(() => userStore.getUserList)

const isTouchDevice = ref(false)

const logout = () => {
  authStore.logout()
  router.push({ name: 'login'})
}

const toggleState = ref<ToggleSidebar>({
  profile: false,
  chat: true,
  setting: false
})

const hoverState = ref<ToggleSidebar>({
  profile: false,
  chat: false,
  setting: false
})


onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
})

const toggle = (state: ToggleKeySidebar) => {
  for (const s in toggleState.value) {
    toggleState.value[s as ToggleKeySidebar] = false
  }
  toggleState.value[state] = true
} 

const handleMouse = (state: ToggleKeySidebar) => {
  if(!isTouchDevice.value) {
    hoverState.value[state] = true
  }
}

const handleTouch = (state: ToggleKeySidebar) => {
  isTouchDevice.value = true
  hoverState.value[state] = false
}
</script>

<template>
  <div class="w-full h-full flex bg-secondary-1 dark:bg-primary-3 duration-200 ease-in-out">
    <div class="hidden md:flex p-4 bg-primary-1 dark:bg-primary-3 duration-200 ease-in-out flex-col items-center justify-between">
      <div class="flex items-center">
        <button class="relative p-2 rounded-full" :class="{ 'active': toggleState.chat }" @mouseover="handleMouse('chat')" @mouseleave="hoverState.chat = false" @touchstart="handleTouch('chat')" @click="toggle('chat')">
          <icon icon="mdi:message-text-outline" class="text-2xl text-primary-3 dark:text-secondary-1" :class="{ '!text-primary-3': toggleState.chat }"></icon>
        </button>
        <transition name="popup">
          <p v-if="hoverState.chat" class="title-hover">Chats</p>
        </transition>
      </div>
      <div class="space-y-4">
        <div class="flex items-center">
          <button class="relative p-1 rounded-full" :class="{ 'active': toggleState.setting }" @mouseover="handleMouse('setting')" @mouseleave="hoverState.setting = false" @touchstart="handleTouch('setting')" @click="toggle('setting')">
            <icon icon="mdi:settings-outline" class="text-3xl text-primary-3 dark:text-secondary-1" :class="{ '!text-primary-3': toggleState.setting }"></icon>
          </button>
          <transition name="popup">
            <p v-if="hoverState.setting" class="title-hover">Settings</p>
          </transition>
        </div>
        <div class="flex items-center">
          <button class="relative rounded-full p-1" :class="{ 'active': toggleState.profile }" @mouseover="handleMouse('profile')" @mouseleave="hoverState.profile = false" @touchstart="handleTouch('profile')" @click="toggle('profile')" >
            <img :src="currentUser?.avatar" alt="" class="w-8 h-8 rounded-full">
          </button>
          <transition name="popup">
            <p v-if="hoverState.profile" class="title-hover">Profile</p>
          </transition>
        </div>
      </div>
    </div>
    <div v-if="toggleState.profile" class="w-full">
      <view-profile :current-user="currentUser" @toggle="toggle"></view-profile>
    </div>
    <div v-if="toggleState.chat" class="w-full">
      <view-user :users="users" @logout="logout" @toggle="toggle"></view-user>
    </div>
    <div v-if="toggleState.setting" class="w-full">
      <view-setting :current-user="currentUser" @logout="logout" @toggle="toggle"></view-setting>
    </div>

  </div>
</template>
<style lang="postcss" scoped>
.active {
  @apply bg-secondary-1 transition;
}
.title-hover {
  @apply delay-150 absolute ml-1 translate-x-2/3 scale-100 bg-primary-2 dark:bg-secondary-1 rounded-full text-secondary-1 dark:text-primary-3 py-1 px-3
}
.popup-enter-active,
.popup-leave-active {
  @apply opacity-100 transition
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-0 translate-x-1/3 scale-50
}
</style>

