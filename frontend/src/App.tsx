import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect, ReactNode } from "react";
import { auth } from "./firebase";

import StudentLoginPage from "./pages/students/auth/StudentLoginPage";
import { StudentAuthRegistrationPage } from "./pages/students/auth/StudentAuthRegistrationPage";
import { IndexPage } from "./pages/IndexPage";
import NotFoundPage from "./pages/NotFoundPage";

import { ChatButtonFixed } from "./components/chat/ChatButtonFixed";
import { ChatSidebar } from "./components/chat/ChatSidebar";
import { ref, set } from "firebase/database";
import { realtimeDb } from "./firebase";
import { useSyncUser } from "./hooks/useSyncUser";



// ✅ PrivateRoute — защищённый маршрут
function PrivateRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  if (user === undefined) return <div>Загрузка...</div>;
  return user ? children : <Navigate to="/login" />;
}

// ✅ Добавим редирект при авто-входе
function AutoRedirectOnLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const currentPath = location.pathname;

      if (user) {
        const safeUserEmail = user.email?.split("@")[0] || "default_user";
      
        const userRef = ref(realtimeDb, `userInfo/${safeUserEmail}`);
      
        set(userRef, {
          userEmail: user.email || "default_email",
          userPassword: "default_password",         // ⚠️ только если реально доступен
          userFullName: user.displayName || "default_name",
          userPoints: 0,
          commandID: "cm_123456",                   // или подтягивай откуда надо
        });
      
        if (currentPath === "/" || currentPath === "/login") {
          navigate("/portal");
        }
      }      
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return null;
}


  export default function App() {
    const loading = useSyncUser();
    if (loading) {
    return <div>Загрузка...</div>; // глобальный спиннер или заставка
  }
    return (
      <Router>
        <AutoRedirectOnLogin /> {/* 🔁 слушаем и редиректим */}
        <Routes>
          <Route path="/" element={<StudentAuthRegistrationPage />} />
          <Route path="/login" element={<StudentLoginPage />} />
          <Route path="/portal" element={<PrivateRoute><IndexPage /></PrivateRoute>} />

          {/* 👇 Добавляем 404 */}
          <Route path="*" element={<NotFoundPage />} />

          <ChatButtonFixed />
          <ChatSidebar />
        </Routes>
      </Router>
    );
  }

