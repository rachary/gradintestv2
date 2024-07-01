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
      const currentUser = authStore.getUserAuthentication
      if (!currentUser) {
        return []
      }
      const latestMessages = state.users
        .filter(user => user.id !== currentUser?.id)
        .map(user => {
          const latestMessage = messageStore.messages
            .filter(msg => (msg.user_id === currentUser.id && msg.receiver_id === user.id) ||
                          (msg.user_id === user.id && msg.receiver_id === currentUser.id))
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
          return {
            user, latestMessage
          }  
        })

      return latestMessages.sort((a, b) => {
        if (!a.latestMessage) {
          return 1
        }
        if (!b.latestMessage) {
          return -1
        }
        return new Date(b.latestMessage.created_at).getTime() - new Date(a.latestMessage.created_at).getTime()
      }).map(item => item.user)
    },
  },
  actions: {
    initializedUsers() {
      const storedUsers = localStorage.getItem('users')
      if (!storedUsers) {
        this.generatedUsers()
      } else {
        this.users = JSON.parse(storedUsers)
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