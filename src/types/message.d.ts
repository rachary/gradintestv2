interface Message {
  user_id: string
  message: string
  created_at: string
  read_at: string | null
}

interface Conversation {
  user_ids: string[]
  messages: message[]
}