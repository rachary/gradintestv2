import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  getters: {
    getAuthData() {
      const storedAuth = localStorage.getItem('authentication')
      let authData = null
      if (storedAuth) {
        authData = JSON.parse(storedAuth)
      }
      return authData
    }
  },
  actions: {
    login(userEmail: string) {
      const userStore = useUserStore()
      const user = userStore.getUserByEmail(userEmail)
      if (user) {
        userStore.currentUser = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        }
      } else {
        userStore.currentUser = userStore.addUser(userEmail)
      }
      this.isLoggedIn = true
      localStorage.setItem('authentication', JSON.stringify({ userAuth: this.isLoggedIn, currentUser: userStore.currentUser }))
    },
    logout() {
      this.isLoggedIn = false
      localStorage.setItem('authentication', JSON.stringify({ userAuth: this.isLoggedIn, currentUser: null }))
    },
  }
})