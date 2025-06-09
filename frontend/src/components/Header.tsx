import { FC, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { MenuItem } from "primereact/menuitem";
import { Menu } from "primereact/menu";

import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  const [loading, setLoading] = useState(true); // добавим явную загрузку

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserName("Не авторизован");
        setPoints(null);
        setLoading(false);
        return;
      }
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserName(`${data.lastName} ${data.firstName[0]}.`);
        setPoints(data.points || 0);
      } else {
        setUserName("Нет данных");
        setPoints(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  return (
    <header className="root-header beautiful-shadow flex justify-content:space-between align-items:center bg:#566F9E padding:15|40">
      <img
        src={logoIcon}
        alt="logo"
        className="w:55 h:55 logo-hover"
        onClick={() => navigate(PAGES.DASHBOARD.PORTAL)}
      />

      <OverlayPanel ref={notificationsOverlayPanel}>
        <div className="value">
          <p className="f:18 f:bold">Уведомление</p>
        </div>
      </OverlayPanel>

      <div className="flex align-items:center gap:25">
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
            {loading ? "Загрузка..." : userName}
            <div className="f:14 f:normal mt:4">
              ⭐ {loading ? "Загрузка..." : (points !== null ? `${points} очков` : "-")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
