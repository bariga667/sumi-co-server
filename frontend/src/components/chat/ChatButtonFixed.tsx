import { FC } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { useRecoilState } from "recoil";

import { chatSidebarIsShow } from "../../recoils/chat.ts";

export const ChatButtonFixed: FC = () => {
  const [, setIsShow] = useRecoilState(chatSidebarIsShow);

  return (
    <div
      className="fixed bottom:45 right:45 p:15 flex justify-content:center align-items:center bg:#566f9e bg:#3a4b6b:hover f:#fff rbr:20 r:5 cursor:pointer"
      onClick={() => setIsShow(true)}
    >
      <IoIosChatboxes size={27} />

      <span className="ml:10 f:16px font:bold">Чат</span>
    </div>
  );
};
