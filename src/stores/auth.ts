import { faker } from "@faker-js/faker";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from 'uuid';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null as User | null,
    users: [] as User[],
    auth: [] as User[]
  }),
  actions: {
    loadAuth() {
      const dataAuth = localStorage.getItem('auth')
      if (dataAuth) {
        const auth = JSON.parse(dataAuth)
        this.auth = auth.user
      }
    },
    login(email: string) {
      const storedData = localStorage.getItem('users')
      if (storedData){
        const userData = JSON.parse(storedData)
        const user = userData.find(u => u.email === email)
        if (user) {
            this.user = {
              id: user.id,
              email: user.email,
              avatar: user.avatar
            }
          const storeUser = userData.filter(e => e.email !== user.email)
          localStorage.setItem('users', JSON.stringify(storeUser))
          } else {
            this.createNewUser(email)
          }
        } else {
          this.createNewUser(email)
      }
      this.isLoggedIn = true
      localStorage.setItem('auth', JSON.stringify({ isLoggedIn: this.isLoggedIn, user: this.user}))
    },
    createNewUser(email: string) {
      const newUser: Users = {
        id: uuidv4(),
        email: email,
        avatar: faker.image.avatar()
      }
      this.user = newUser
    },
    logout() {
      const storedAuth = localStorage.getItem('auth')
      const storedUsers = localStorage.getItem('users')
      if (storedUsers) {
        this.users = JSON.parse(storedUsers)
        if (storedAuth) {
          const auth = JSON.parse(storedAuth)
          const user = auth.user
          this.users.push(user)
        }
      }
      this.isLoggedIn = false
      localStorage.setItem('users', JSON.stringify(this.users))
      localStorage.setItem('auth', JSON.stringify({ isLoggedIn: this.isLoggedIn, user: null}))
    }
  }
})