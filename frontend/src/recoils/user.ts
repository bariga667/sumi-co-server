import { atom } from "recoil";

import { IUser, UserRole } from "../types/user.ts";

export const userRecoilState = atom<IUser>({
  key: "user",
  default: {
    id: 1,
    ssoUserId: 123,
    lastName: "Бәкір",
    firstName: "Бинұр",
    surname: "Қанатұлы",
    role: UserRole.Admin,
    telegramUsername: "Binur",
    discordUsername: "Binur#0500",
    commandId: 4560,
    commandName: "Fen1x",
    direction: 1,
    raining: 75,
  },
});
