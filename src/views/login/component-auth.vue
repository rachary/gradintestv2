<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';

const router = useRouter()
const account = reactive({
  username: '',
  password: ''
})
const authStore = useAuthStore()
const isVisible = ref(true)
const submit = () => {
  authStore.login(account.username)
  router.push({ name: 'home'})
}
</script>

<template>
  <form class="space-y-4 z-20 relative" @submit.prevent="submit">
    <div class="flex items-center py-3 px-4 card bg-primary-1">
      <icon icon="mdi:user-outline" class="text-3xl mr-3 text-secondary-1"></icon>
      <div class="flex flex-col w-full">
        <label for="username" class="text-xs text-secondary-1 tracking-wide">Username:</label>
        <input 
        id="username" 
        v-model="account.username" 
        class="border-b text-secondary-1 accent-transparent border-secondary-1 bg-primary-1 text-base w-full py-1 active:outline" 
        type="email" 
        required>
      </div>
    </div>
    <div class="flex items-center py-3 px-4 card bg-primary-1">
      <icon icon="mdi:shield-key-outline" class="text-3xl mr-3 text-secondary-1"></icon>
      <div class="flex flex-col w-full">
        <label for="password" class="text-xs text-secondary-1 tracking-wide">Password:</label>
        <input 
        id="password" 
        v-model="account.password" 
        class="border-b text-secondary-1 border-secondary-1 bg-primary-1 text-base w-full py-1 active:outline" 
        :type="isVisible ? 'password' : 'text'" 
        required>
      </div>
      <div class="cursor-pointer" @click="isVisible = !isVisible">
        <icon v-if="isVisible" icon="mdi:eye-off-outline" class="text-2xl ml-2 text-secondary-1" ></icon>
        <icon v-else icon="mdi:eye-outline" class="text-2xl ml-2 text-secondary-1" ></icon>
      </div>
    </div>
    <div class="text-center" type="submit">
      <button class=" text-primary-1 rounded-md hover:shadow-md hover:bg-primary-1 transition hover:card hover:text-secondary-1 tracking-wider font-semibold py-2 px-4 w-fit">Login</button>
    </div>

  </form>
</template>
<style lang="postcss" scoped>
</style>import type { useRoute } from 'vue-router';import type path from 'path';
import type { useRouter } from 'vue-router';

