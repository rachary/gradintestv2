import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    authData: null as Auth | null
  }),
  getters: {
  },
  actions: {
    getAuthData() {
      const storedAuth = localStorage.getItem('authentication')
      if (storedAuth) {
        this.authData = JSON.parse(storedAuth)
      }
      return this.authData
    },
    login(userEmail: string) {
      const userStore = useUserStore()
      const user = userStore.getUserByEmail(userEmail)
      let currentUser
      if (user) {
        currentUser = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        }
      } else {
        currentUser = userStore.addUser(userEmail)
      }
      this.isLoggedIn = true
      localStorage.setItem('authentication', JSON.stringify({ userAuth: this.isLoggedIn, currentUser: currentUser }))
    },
    logout() {
      this.isLoggedIn = false
      this.authData = null
      localStorage.setItem('authentication', JSON.stringify({ userAuth: this.isLoggedIn, currentUser: null }))
    },
  }
})