import { defineStore } from "pinia";

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: [] as Message[],
    conversations: [] as Conversation[]
  }),
  actions: {
    getConversations() {
      const dataConversations = localStorage.getItem('conversations')
      if (dataConversations) {
        this.conversations = JSON.parse(dataConversations)
        }
    },
    findConversationsById(messageInput: string, user_1: string, user_2: string) {
      const findConversationById = this.conversations.find(conversation => 
        conversation.user_ids.includes(user_1) && conversation.user_ids.includes(user_2)
      )
      if (findConversationById) {
        this.addConversation(messageInput, user_1, user_2)
        } else {
          this.addConversation(messageInput, user_1, user_2)
        }
      localStorage.setItem('conversations', JSON.stringify(this.conversations))
    },
    addConversation(messageInput: string, user_1: string, user_2: string) {
      this.conversations.push({
        user_ids: [user_1, user_2],
        messages: this.newMessage(messageInput, user_2)
      })
    },
    newMessage(messageInput: string, user: string) {
      const recentDate = new Date().toString()
      const message = []
      message.push({
        user_id: user,
        message: messageInput,
        created_at: recentDate,
        read_at: null,
      })
      return message
    },
    getLatestMessage(user1: string, user2: string) {
      let latestMessage: Message | null = null
      this.conversations.forEach(conversation => {
        if (conversation.user_ids.includes(user1) && conversation.user_ids.includes(user2)) {
          const sortedMessages = conversation.messages.slice().sort((a, b) => 
          b.created_at.getTime() - a.created_at.getTime())
          if (sortedMessages.length > 0) {
            latestMessage = sortedMessages[0]
          }
        }
      });
      return latestMessage
    },
    markMessagesAsRead(user1: string, user2: string) {
      const recentDate = new Date().toString();
      this.conversations.forEach(conversation => {
        if (conversation.user_ids.includes(user1) && conversation.user_ids.includes(user2)) {
          conversation.messages.forEach(message => {
            if (message.user_id !== user2 && message.read_at == null) {
              message.read_at = recentDate;
            }
          });
        }
      });
      localStorage.setItem('conversations', JSON.stringify(this.conversations))
    },
    countUnreadMessages(user1: string, user2: string) {
      let unreadCount = 0;
      this.conversations.forEach(conversation => {
        if (conversation.user_ids.includes(user1) && conversation.user_ids.includes(user2)) {
          conversation.messages.forEach(message => {
            if (message.user_id !== user2 && message.read_at == null) {
              unreadCount++
            }
          });
        }
      });
      return unreadCount;
    }
  }
})