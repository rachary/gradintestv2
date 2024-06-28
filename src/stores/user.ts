import { defineStore } from "pinia";
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from "./auth";
import { useMessageStore } from "./message";


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
  }),
  getters: {
    getUserList: (state) => {
      const authStore = useAuthStore()
      const messageStore = useMessageStore()
      messageStore.getConversations()
      const auth = authStore.getUserAuthentication
      return state.users
      .filter(user => user.id !== auth?.id)
      .map(user => {
        const latestMessage = messageStore.getLatestMessage(user.id, auth?.id || '')?.created_at
        return {
          ...user,
          recentMessage: latestMessage ? latestMessage : null,
        }
      })
      .sort((a, b) => {
        if (a.recentMessage && b.recentMessage) {
          return new Date(b.recentMessage).getTime() - new Date(a.recentMessage).getTime()
        } else if (a.recentMessage) {
          return -1
        } else if (b.recentMessage) {
          return 1
        } else {
          return 0
        }
      })
    },
  },
  actions: {
    initializedUsers() {
      const storedUsers = localStorage.getItem('users')
      if (storedUsers) {
        this.users = JSON.parse(storedUsers)
      } else {
        this.generatedUsers()
      }
    },
    getUserById(userId: string) {
      const user = this.users.find(user => user.id === userId)
      return user
    },
    getUserByEmail(userEmail: string) {
      const user = this.users.find(user => user.email === userEmail)
      return user
    },
    addUser(userEmail: string) {
      const user: User = {
        id: uuidv4(),
        email: userEmail,
        avatar: faker.image.avatar()
      }
      this.users.push(user)
      localStorage.setItem('users', JSON.stringify(this.users))
      return user
    }, 
    generatedUsers() {
      for (let i = 0; i < 20; i++) {
        this.users.push({
          id: uuidv4(),
          email: faker.internet.email(),
          avatar: faker.image.avatar()
        })
      }
      localStorage.setItem('users', JSON.stringify(this.users))
    },

  }
})