interface Message {
  user_id: number;
  message: string;
  created_at: string;
  read_at: string | null;
}

interface Conversation {
  user_ids: number[];
  messages: message[];
}