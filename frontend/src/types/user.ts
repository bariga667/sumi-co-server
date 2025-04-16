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

export enum UserRole {
  Student,
  Mentor,
  Admin,
}
