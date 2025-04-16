import { FC } from "react";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRecoilState } from "recoil";
import moment from "moment";

import { chatMessages, chatSidebarIsShow } from "../../recoils/chat.ts";
import { ChatMessage } from "../../types/chat.ts";

export const ChatSidebar: FC = () => {
  const [isShow, setIsShow] = useRecoilState<boolean>(chatSidebarIsShow);

  const [messages] = useRecoilState<ChatMessage[]>(chatMessages);

  return (
    <Sidebar
      visible={isShow}
      position="right"
      onHide={() => setIsShow(false)}
      className="w:full w:20rem@md w:30rem@lg"
    >
      <div className="w:full h:full flex flex:col flex:1">
        <div className="flex flex:col mt:auto rel">
          <div className="messages mb:70 w:full flex flex:col">
            {messages.map((message) => (
              <div
                key={message.id}
                className="message bg:#fff mb:40 mb:0:last-child"
              >
                <p>{message.userName}</p>

                <p>{message.body}</p>

                <p>{moment(message.createdAt).format("HH:mm:ss")}</p>
              </div>
            ))}
          </div>

          <div className="inputs w:full abs bottom:0">
            <div className="p-inputgroup flex-1">
              <Button
                icon="pi pi-check"
                className="p-button-success"
              />
              <InputText placeholder="Vote" />
              <Button
                icon="pi pi-times"
                className="p-button-danger"
              />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
