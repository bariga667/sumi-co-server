import { FC } from "react";
import { useRecoilState } from "recoil";

import { UserRole } from "../types/user.ts";
import { userRecoilState } from "../recoils/user.ts";

import { StudentIndexPage } from "./students/StudentIndexPage.tsx";

export const IndexPage: FC = () => {
  const [user] = useRecoilState(userRecoilState);

  if (user.role === UserRole.Student) {
    return <StudentIndexPage />;
  }

  return <div>Если вы видите это, то прозошло какая то ошибка!</div>;
};
