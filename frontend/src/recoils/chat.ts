import { atom } from "recoil";
import { ChatMessage } from "../types/chat";

export const chatSidebarIsShow = atom<boolean>({
  key: "chatSidebarIsShow",
  default: false,
});

export const chatMessages = atom<ChatMessage[]>({
  key: "chatMessages",
  default: [],
});
