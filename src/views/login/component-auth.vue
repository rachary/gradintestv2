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
const passwordVisible = ref(false)
const submit = () => {
  authStore.login(account.username)
  router.push({ name: 'home'})
}
</script>

<template>
  <form class="space-y-4 z-20 relative" @submit.prevent="submit">
    <div class="flex items-center py-3 px-4 border-2 group card bg-primary-1 border-primary-1 focus-within:bg-secondary-1">
      <icon icon="mdi:user-outline" class="text-3xl mr-3 text-secondary-1 group-focus-within:text-primary-1"></icon>
      <div class="flex flex-col w-full">
        <label for="username" class="text-xs text-secondary-1 tracking-wide group-focus-within:text-primary-1">Username:</label>
        <input 
        id="username" 
        v-model="account.username"
        v-focus 
        class="border-b text-secondary-1 border-secondary-1 bg-primary-1 text-base w-full py-1 focus:bg-transparent focus:text-primary-1 focus:border-primary-1" 
        type="email" 
        required>
      </div>
    </div>
    <div class="flex items-center py-3 px-4 card group bg-primary-1 border-2 border-primary-1 focus-within:bg-secondary-1">
      <icon icon="mdi:shield-key-outline" class="text-3xl mr-3 text-secondary-1 group-focus-within:text-primary-1"></icon>
      <div class="flex flex-col w-full">
        <label for="password" class="text-xs text-secondary-1 tracking-wide group-focus-within:text-primary-1">Password:</label>
        <input 
        id="password" 
        v-model="account.password" 
        class="border-b text-secondary-1 border-secondary-1 bg-primary-1 text-base w-full py-1 focus:text-primary-1 focus:bg-secondary-1 focus:border-primary-1" 
        :type="passwordVisible ? 'text' : 'password'" 
        required>
      </div>
      <div class="cursor-pointer text-secondary-1 group-focus-within:text-primary-1" @click="passwordVisible = !passwordVisible">
        <icon v-if="!passwordVisible" icon="mdi:eye-off-outline" class="text-2xl ml-2"></icon>
        <icon v-else icon="mdi:eye-outline" class="text-2xl ml-2"></icon>
      </div>
    </div>
    <div class="text-center" type="submit">
      <button class=" text-primary-1 rounded-md hover:shadow-md hover:bg-primary-1 transition hover:card hover:text-secondary-1 tracking-wider font-semibold py-2 px-4 w-fit">Login</button>
    </div>

  </form>
</template>
<style lang="postcss" scoped>
</style>