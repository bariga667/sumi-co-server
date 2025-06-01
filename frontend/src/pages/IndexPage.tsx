import { FC } from "react";
import { useRecoilValue } from "recoil";
import { UserRole } from "../types/user";
import { userRecoilState } from "../recoils/user";
import { StudentIndexPage } from "./students/StudentIndexPage";

export const IndexPage: FC = () => {
  const user = useRecoilValue(userRecoilState);

  if (user === null) {
    // Пока профиль загружается или пользователь не авторизован
    return <div>Загрузка профиля...</div>;
  }

  if (user.role === UserRole.Student) {
    return <StudentIndexPage />;
  }

  return <div>Если вы видите это, то произошла какая-то ошибка!</div>;
};
