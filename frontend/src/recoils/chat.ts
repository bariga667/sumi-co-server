import { atom } from "recoil";

import { ChatMessage } from "../types/chat.ts";

export const chatSidebarIsShow = atom<boolean>({
  key: "chatSidebarIsShow",
  default: false,
});

export const chatMessages = atom<ChatMessage[]>({
  key: "chatMessages",
  default: [
    {
      id: 1,
      userID: 12,
      userName: "binur",
      body: "Hello, friend!",
      createdAt: new Date(),
      role: "User",
    },
    {
      id: 2,
      userID: 12,
      userName: "binur",
      body: "Hello, friend!",
      createdAt: new Date(),
      role: "User",
    },
    {
      id: 3,
      userID: 12,
      userName: "binur",
      body: "Hello, friend!",
      createdAt: new Date(),
      role: "User",
    },
    {
      id: 4,
      userID: 12,
      userName: "binur",
      body: "Hello, friend!",
      createdAt: new Date(),
      role: "User",
    },
    {
      id: 5,
      userID: 12,
      userName: "binur",
      body: "Hello, friend!",
      createdAt: new Date(),
      role: "User",
    },
  ],
});
