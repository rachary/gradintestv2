<script setup lang="ts">
import { formatName } from '@/formatters/name'
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ users: User[] }>()
const route = useRoute()
const newMessage = ref(false)
const filteredUsers = computed<User[]>(() => {
  return props.users.filter((user) => 
    user.email.toLowerCase().includes(route.query.search ? String(route.query.search).toLowerCase() : '')
  )
})
const userStore = useUserStore()
const currentUser = userStore.currentUser
const messageStore = useMessageStore()
</script>

<template>
    <div v-for="user in filteredUsers" :key="user.id" class="w-full">
      <router-link :to="{ name: 'chat', params: { id: user.id}}" class="flex items-center hover:bg-gray-200" @click="messageStore.markMessagesAsRead(user.id, currentUser?.id || '')">
        <div class="min-w-8 xl:min-w-[4.5rem] ml-2 xl:ml-4 mr-2">
          <img :src="user.avatar" alt="" class="rounded-full w-12 xl:w-14">
        </div>
        <div class="border-b w-full border-gray-300 space-y-1 py-3 pr-4">
          <div class="text-base flex justify-between items-center">
            <p class="font-semibold">{{ formatName(user.email) }}</p>
            <p class="text-xs">Yesterday</p>
          </div>
          <div class="flex justify-between items-left gap-2 text-base h-full py-1">
            <p class="truncate w-[74vw] xl:w-[20.75vw]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet harum dicta odit quos. Odit adipisci vitae repudiandae culpa quibusdam ipsam.</p>
            <p class="px-2 py-1 text-xs rounded-full  bg-primary-1 text-secondary-1 block" :class="{ 'block': newMessage }">2</p>
          </div>
        </div>
        <div>
        </div>
      </router-link>
    </div>
</template>
<style lang="postcss" scoped>

</style>