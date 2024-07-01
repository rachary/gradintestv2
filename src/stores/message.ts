import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserStore } from "./user";
import { faker } from "@faker-js/faker";

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [] as Messages[],
  }),
  getters: {
    countUnreadMessage: (state) => (receiver_id: string) => {
      const authStore = useAuthStore()
      const currentUser = authStore.getUserAuthentication
      if (!currentUser?.id) {
        return 0
      }
      return state.messages.filter(msg => 
        msg.receiver_id === currentUser.id &&
        msg.user_id === receiver_id &&
        !msg.read_at
      ).length
    },

    getLatestMessages: (state) => (user1: string, user2: string): Messages | undefined => {
      const messages = state.messages.filter(msg => 
        (msg.user_id === user1 && msg.receiver_id === user2) ||
        (msg.user_id === user2 && msg.receiver_id === user1)
      )
      return messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
    },

  },
  actions: {
    getMessagesFromLocalStorage() {
      const dataMessages = localStorage.getItem('messages')
      if (dataMessages) {
        this.messages = JSON.parse(dataMessages)
        }
    },

    sendMessage(user_id: string, receiver_id: string, message: string) {
      const newMessage: Messages = {
        user_id,
        receiver_id,
        message,
        created_at: new Date().toString(),
        read_at: null
      }
      this.messages.push(newMessage)
      this.saveMessageToLocalStorage()
    },

    generateRandomMessages() {
      const authStore = useAuthStore();
      const userStore = useUserStore();
      const messages = [
        'Hello!',
        'How are you?',
        'Good morning!',
        'Good night!',
        'What are you doing?',
        'Have a great day!',
        'See you soon!',
        'Take care!',
        'Thank you!',
        'You’re welcome!',
      ]

      userStore.getUserList.forEach(user => {
        if (user.id !== authStore.getUserAuthentication?.id) {
          const randomNumber = Math.floor(Math.random() * 5) + 1
          
          const randomMessage = Array(randomNumber).fill(null).map(() => ({
            message: messages[Math.floor(Math.random() * messages.length)],
            created_at: faker.date.recent().toString()
          }))
          randomMessage.forEach(({message, created_at}) => {
            const randomMessages: Messages = {
              user_id: user.id,
              receiver_id: authStore.getUserAuthentication?.id || '',
              message,
              created_at: created_at,
              read_at: null
            }
            this.messages.push(randomMessages)
          })
        }
      })
      this.saveMessageToLocalStorage()
    },

    markAsReadMessage(sender_id: string, receiver_id: string) {
      const authStore = useAuthStore()
      const currentUser = authStore.getUserAuthentication
      if (currentUser?.id === receiver_id) {
        this.messages.map(msg => {
          if (msg.user_id === sender_id && msg.receiver_id === receiver_id && !msg.read_at) {
            msg.read_at = new Date().toString()
          }
        })
      }
      this.saveMessageToLocalStorage()
    },

    saveMessageToLocalStorage() {
      localStorage.setItem('messages', JSON.stringify(this.messages))
    },
  }
})