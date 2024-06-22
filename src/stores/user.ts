import { defineStore } from "pinia";
import { faker } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as Users[]
  }),
  actions: {
    initializedUsers() {
      const users = localStorage.getItem('users')
      if (users) {
        this.users = JSON.parse(users)
      } else {
        this.generatedUsers()
      }
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
    } 
  }
})