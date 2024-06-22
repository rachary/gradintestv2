import { defineStore } from "pinia";

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: [] as Message[],
    conversations: [] as Conversation[]
  }),
  actions: {
    loadConversations() {
      const dataConversations = localStorage.getItem('conversations')
      if (dataConversations) {
        this.conversations = JSON.parse(dataConversations)
        }
    },
    findConversationsById(inputMessage: string, user_1: number, user_2: number) {
      const findConversationById = this.conversations.find(conv => 
        conv.user_ids.includes(user_1) && conv.user_ids.includes(user_2)
      )
      if (findConversationById) {
        this.createConversation(inputMessage, user_1, user_2)
        } else {
          this.createConversation(inputMessage, user_1, user_2)
        }
      localStorage.setItem('conversations', JSON.stringify(this.conversations))
    },
    createConversation(inputMessage: string, user_1: number, user_2: number) {
      this.conversations.push({
        user_ids: [user_1, user_2],
        messages: this.newMessage(inputMessage, user_2)
      })
    },
    newMessage(inputMessage: string, user: number) {
      const recentDate = new Date()
      const message = []
      message.push({
        user_id: user,
        message: inputMessage,
        created_at: recentDate.toString(),
        read_at: null,
      })
      return message
    }
  }
})