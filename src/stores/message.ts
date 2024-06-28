import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import { useUserStore } from "./user";

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: [] as Message[],
    conversations: [] as Conversation[]
  }),
  getters: {

  },
  actions: {
    getConversations() {
      const dataConversations = localStorage.getItem('conversations')
      if (dataConversations) {
        this.conversations = JSON.parse(dataConversations)
        }
    },
    getFilterMessage(user1: string, user2: string) {
      const filterMessage = this.conversations.filter(conversation => 
        conversation.user_ids.includes(user1) && conversation.user_ids.includes(user2)
      )
      return filterMessage
    },
    findConversationsById(messageInput: string, user1: string, user2: string) {
      const findConversationById = this.conversations.find(conversation => 
        conversation.user_ids.includes(user1) && conversation.user_ids.includes(user2)
      )
      if (findConversationById) {
        this.addConversation(messageInput, user1, user2)
        } else {
          this.addConversation(messageInput, user1, user2)
        }
      localStorage.setItem('conversations', JSON.stringify(this.conversations))
    },
    addConversation(messageInput: string, user1: string, user2: string) {
      this.conversations.push({
        user_ids: [user1, user2],
        messages: this.newMessage(messageInput, user2)
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
    generateRandomMessage() {
      const randomMessages = [
        'Hello there!',
        'How are you?',
        'Whats up?',
        'Good morning!',
        'Good night!',
        'See you soon!',
        'Take care!',
        'Have a great day!'
      ];
      const randomIndex = Math.floor(Math.random() * randomMessages.length);
      return randomMessages[randomIndex];
    },
    addMessageToConversation(conversation: Conversation, messageInput: string, user: string) {
      const message = this.newMessage(messageInput, user);
      conversation.messages.push(...message);
      localStorage.setItem('conversations', JSON.stringify(this.conversations));
    },
    generateMessagesForAllConversations() {
      const userStore = useUserStore()
      const authStore = useAuthStore()
      const users = userStore.users
      const currentUser = authStore.getUserAuthentication
      users.forEach(user1 => {
        users.forEach(user2 => {
          if (user1 !== user2) {
            const findConversation = this.conversations.find(conversation => 
              conversation.user_ids.includes(user1.id) && conversation.user_ids.includes(user2.id)
            )
            for (let i = 0; i < 5; i++) {
              const randomMessage = this.generateRandomMessage();
              const randomUser = user1.id
              this.addMessageToConversation(findConversation!, randomMessage, randomUser);
            }
          }
        })
      })

      localStorage.setItem('conversations', JSON.stringify(this.conversations));
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