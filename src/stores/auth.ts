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
      } else {
        localStorage.setItem('authentication', JSON.stringify({ is_authenticated: false, user: null }))
      }
    },

    login(userEmail: string) {
      const userStore = useUserStore()
      const user = userStore.getUserByEmail(userEmail)
      let currentUser = null
      if (user) {
        currentUser = {
          id: user.id,
          email: user.email,
          avatar: user.avatar
        }
      } else {
        currentUser = userStore.addUser(userEmail)
      }
      localStorage.setItem('authentication', JSON.stringify({ is_authenticated: true, user: currentUser }))
    },

    logout() {
      localStorage.setItem('authentication', JSON.stringify({ is_authenticated: false, user: null }))
    },
  }
})