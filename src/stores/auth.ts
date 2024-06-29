import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authentication: null as Authentication | null
  }),
  getters: {
    getAuthentication: (state) => {
      return state.authentication?.is_authenticated
    },
    getUserAuthentication: (state) => {
      return state.authentication?.user
    },
  },
  actions: {
    initializedAuthentication() {
      const storedAuth = localStorage.getItem('authentication')
      if (storedAuth) {
        this.authentication = JSON.parse(storedAuth)
      }
      console.log(this.authentication)
    },
    login(userEmail: string) {
      const userStore = useUserStore()
      const user = userStore.getUserByEmail(userEmail)
      let currentUser = this.getUserAuthentication
      if (user) {
        currentUser = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        }
      } else {
        currentUser = userStore.addUser(userEmail)
      }
      localStorage.setItem('authentication', JSON.stringify({ isAuthenticated: this.getAuthentication, user: currentUser }))
    },
    logout() {
      localStorage.setItem('authentication', JSON.stringify({ isAuthenticated: this.getAuthentication, user: null }))
    },
  }
})