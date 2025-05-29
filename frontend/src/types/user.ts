export enum UserRole {
  Student,
  Mentor,
  Admin,
}

export interface IUser {
  id: number;
  ssoUserId: number;
  lastName: string;
  firstName: string;
  surname: string;
  points?: number;
  telegramUsername: string;
  discordUsername: string;
  commandId: number;
  commandName: string;
  direction: number;
  raining: number;
  role: UserRole;
}

export function firestoreToUser(data: any, fallbackId: number = 0): IUser {
  return {
    id: data.id ?? fallbackId,
    ssoUserId: data.ssoUserId ?? 0,
    lastName: data.lastName ?? "",
    firstName: data.firstName ?? "",
    surname: data.surname ?? "",
    points: data.points ?? 0,
    telegramUsername: data.telegramUsername ?? "",
    discordUsername: data.discordUsername ?? "",
    commandId: data.commandId ?? 0,
    commandName: data.commandName ?? "",
    direction: data.direction ?? 0,
    raining: data.raining ?? 0,
    role: typeof data.role === "number"
      ? data.role
      : (UserRole[data.role as keyof typeof UserRole] ?? UserRole.Student),
  };
}
