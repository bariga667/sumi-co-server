import { FC, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRecoilState } from "recoil";
import moment from "moment";
import CryptoJS from "crypto-js";

import { ref, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

import { chatSidebarIsShow } from "../../recoils/chat";
import { ChatMessage } from "../../types/chat";
import { realtimeDb } from "../../firebase";

const secretKey = "mySuperSecret123";

export const ChatSidebar: FC = () => {
  const [isShow, setIsShow] = useRecoilState(chatSidebarIsShow);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");

  const sendMessage = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !inputText.trim()) return;

    const encryptedText = CryptoJS.AES.encrypt(inputText.trim(), secretKey).toString();
    const chatRef = ref(realtimeDb, "Chat/messages");

    await push(chatRef, {
      senderId: user.email?.split("@")[0] || user.uid,
      text: encryptedText,
      timestamp: Date.now(),
    });

    setInputText("");
  };

  useEffect(() => {
    const chatRef = ref(realtimeDb, "Chat/messages");

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return setMessages([]);

      const messagesArray = Object.entries(data).map(([key, value]: any) => {
        let decryptedText = "";

        try {
          const bytes = CryptoJS.AES.decrypt(value.text, secretKey);
          decryptedText = bytes.toString(CryptoJS.enc.Utf8);
          if (!decryptedText) throw new Error("Empty");
        } catch (err) {
          decryptedText = "[некорректное сообщение]";
        }

        return {
          id: key,
          userID: value.senderId,
          userName: value.senderId,
          body: decryptedText,
          createdAt: new Date(value.timestamp || Date.now()),
          role: "User" as "User",
        };
      });

      messagesArray.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      setMessages(messagesArray.slice(-100));
    });

    return () => unsubscribe();
  }, []);

  return (
    <Sidebar visible={isShow} position="right" onHide={() => setIsShow(false)} className="w:20rem@md w:30rem@lg">
      <div className="h:full flex flex:col">
        <div className="flex:1 overflow:auto p:10">
          {messages.map((msg) => (
            <div key={msg.id} className="bg:#fff mb:10 p:10 r:8 shadow-sm">
              <strong>{msg.userName}</strong>
              <p>{msg.body}</p>
              <small className="f:12 f:gray">{moment(msg.createdAt).format("HH:mm:ss")}</small>
            </div>
          ))}
        </div>
        <div className="p:10 flex gap:10">
          <InputText
            className="flex:1"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите сообщение..."
          />
          <Button icon="pi pi-send" className="p-button-success" onClick={sendMessage} />
        </div>
      </div>
    </Sidebar>
  );
};
