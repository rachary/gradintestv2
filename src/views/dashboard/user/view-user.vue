<script setup lang="ts">
import ComponentUserlist from './component-userlist.vue'
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { Icon } from '@iconify/vue'

const router = useRouter()
const userStore = useUserStore()
const users = computed(() => userStore.getUserList)
const route = useRoute()
const searchUser = ref('')
const toggleMenu = ref(false)

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

watch(searchUser, () => {
  router.push({ query: {...route.query, search: searchUser.value ?? undefined}})
})
</script>
<template>
  <div class="border-l border-gray-300 h-full xl:pr-1 select-none flex flex-col justify-between">
    <div class="w-full py-3 px-4 flex justify-between items-center">
      <p class="text-2xl font-extrabold text-primary-3">Chats</p>
      <div class="relative flex items-center">
        <button title="Menu" class="p-1 rounded-full duration-300" :class="{ 'bg-primary-2': toggleMenu}" @click="toggleMenu = !toggleMenu">
          <icon icon="mdi:dots-vertical" class="text-primary-3 text-3xl" ></icon>
        </button>
        <transition name="popup">
          <div v-if="toggleMenu" class="absolute z-10 bg-primary-2 py-1 scale-100 shadow-card top-10 right-0">
            <button class="btn-menu" @click="emitToggle('profile')">
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
    <div class="px-1 sm:px-4">
      <div class="flex items-center">
        <label for="searchUser" class="cursor-pointer">
          <icon icon="mdi:search" class="pl-2 pr-1 h-10 rounded-l-md text-4xl bg-primary-1 text-secondary-1"></icon>
        </label>
        <input 
        id="searchUser" 
        v-model="searchUser"
        type="text" 
        class="bg-primary-1 w-full text-secondary-1 rounded-r-md placeholder:text-secondary-1 py-2 pr-2 pl-1" 
        placeholder="Search user...">
      </div>
    </div>
    <div class="flex gap-2 px-4 py-2">
      <p class="bg-primary-1 py-1 px-3 rounded-full text-secondary-1">All</p>
      <p class="bg-gray-100 py-1 px-3 rounded-full text-black">Unread</p>
    </div>
    <div class="h-full w-full overflow-y-scroll">
      <component-userlist :users="users"></component-userlist>
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
  @apply flex gap-2 px-8 py-1 text-secondary-1 hover:bg-slate-300 hover:bg-opacity-50
}
.popup-enter-active,
.popup-leave-active {
  @apply opacity-50 transition
}

.popup-enter-from,
.popup-leave-to {
  @apply opacity-0 scale-50 -translate-y-10 translate-x-10
}
</style>