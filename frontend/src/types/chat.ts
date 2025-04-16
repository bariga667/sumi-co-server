export interface ChatMessage {
  id: number;
  userID: number;
  userName: string;
  body: string;
  createdAt: Date;
  role: string;
}
