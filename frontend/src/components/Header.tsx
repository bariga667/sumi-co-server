import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
// import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import logoIcon from "../assets/svg/logo.svg";
import { PAGES } from "../constants/pages.ts";

export const Header: FC = () => {
  const notificationsOverlayPanel = useRef<OverlayPanel | null>(null);
  const navigate = useNavigate();
  const avatarMenuRef = useRef<Menu | null>(null);

  const [userName, setUserName] = useState("Загрузка...");
  const [points, setPoints] = useState<number | null>(null);

  const avatarMenuItems: MenuItem[] = [
    {
      label: "Личный кабинет",
      icon: "pi pi-user",
      command: () => navigate(PAGES.DASHBOARD.PROFILE),
    },
    {
      label: "Выйти",
      icon: "pi pi-sign-out",
      command: async () => {
        const auth = getAuth();
        await auth.signOut();
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    const fetchUserInfo = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserName(`${data.lastName} ${data.firstName[0]}.`);
        setPoints(data.points || 0);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <header className="root-header beautiful-shadow flex justify-content:space-between align-items:center bg:#566F9E padding:15|40">
      <img
        src={logoIcon}
        alt="logo"
        className="w:45 h:45 cursor:pointer"
        onClick={() => navigate("/portal")}
      />

      <OverlayPanel ref={notificationsOverlayPanel}>
        <div className="value">
          <p className="f:18 f:bold">Уведомление</p>
        </div>
      </OverlayPanel>

      <div className="flex align-items:center gap:25">
        {/* <div
          className="notifications-button flex justify-content:center align-items:center bg:#ffffff w:45 h:45 round cursor:pointer"
          onClick={(e) => notificationsOverlayPanel.current?.toggle(e)}
        >
          <i className="pi pi-bell f:#566F9E f:18 p-overlay-badge">
            <Badge
              value="5"
              severity="danger"
              className="top:-3px right:-3px"
            />
          </i>
        </div> это у нас иконка уведомлений, пока убрал так как не нужен*/}

        <Menu
          id="popup_avatar_menu"
          model={avatarMenuItems}
          ref={avatarMenuRef}
          popup
          className="f:14"
        />

        <div
          className="username cursor:pointer"
          aria-controls="popup_avatar_menu"
          aria-haspopup
          onClick={(event) => avatarMenuRef.current?.toggle(event)}
        >
          <Avatar
            icon="pi pi-user"
            shape="circle"
            className="w:45 h:45 f:#566F9E bg:#fff f:18 mr:10"
          />

          <div className="f:#ffffff f:bold">
            {userName}
            <div className="f:14 f:normal mt:4">
              ⭐ {points !== null ? `${points} очков` : "Загрузка..."}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
