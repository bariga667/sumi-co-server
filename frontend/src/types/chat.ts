export interface ChatMessage {
  id: string;
  userID: string;
  userName: string;
  body: string;
  createdAt: Date;
  role: "User" | "Admin";
}
