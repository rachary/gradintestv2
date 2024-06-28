import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useAuthStore = defineStore('auth', {
  state: () => ({
  }),
  getters: {
    getAuthentication: () => {
      const storedAuth = localStorage.getItem('authentication')
      let isAuthenticated = null
      if (storedAuth) {
        const authentication = JSON.parse(storedAuth)
        isAuthenticated = authentication.isAuthenticated
      }
      return isAuthenticated
    },
    getUserAuthentication: () => {
      const storedAuth = localStorage.getItem('authentication')
      let user = null as User | null
      if (storedAuth) {
        const authentication = JSON.parse(storedAuth)
        user = authentication.user
      }
      return user
    }
  },
  actions: {
    login(userEmail: string) {
      const userStore = useUserStore()
      const user = userStore.getUserByEmail(userEmail)
      let currentUser = null as User | null
      if (user) {
        currentUser = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        }
      } else {
        currentUser = userStore.addUser(userEmail)
      }
      const isAuthenticated = true
      localStorage.setItem('authentication', JSON.stringify({ isAuthenticated: isAuthenticated, user: currentUser }))
    },
    logout() {
      const isAuthenticated = false
      localStorage.setItem('authentication', JSON.stringify({ isAuthenticated: isAuthenticated, user: null }))
    },
  }
})