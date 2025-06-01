import { atom } from "recoil";
import { IUser } from "../types/user.ts";

// Атом состояния пользователя.
// По умолчанию null, пока не загружен или не авторизован пользователь.
export const userRecoilState = atom<IUser | null>({
  key: "user",
  default: null,
});

