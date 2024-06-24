import { defineStore } from "pinia";
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from "./auth";


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
  }),
  getters: {
    getCurrentUser() {
      const authStore = useAuthStore()
      const currentUser = authStore.getAuthData
      return currentUser.currentUser
    },
    getUserList: (state) => {
      const authStore = useAuthStore()
      const userAuth = authStore.getAuthData.currentUser.id
      return state.users.filter(user => user.id !== userAuth)
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
      return this.users
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