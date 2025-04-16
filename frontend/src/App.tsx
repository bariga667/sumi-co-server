import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { useState, useEffect, ReactNode } from "react";
import { auth } from "./firebase";

import StudentLoginPage from "./pages/students/auth/StudentLoginPage";
import { StudentAuthRegistrationPage } from "./pages/students/auth/StudentAuthRegistrationPage";
import { IndexPage } from "./pages/IndexPage";
import NotFoundPage from "./pages/NotFoundPage";


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

      if (user && (currentPath === "/" || currentPath === "/login")) {
        navigate("/portal");
      }
    });

    return () => unsubscribe();
  }, [navigate, location]);

  return null;
}

  export default function App() {
    return (
      <Router>
        <AutoRedirectOnLogin /> {/* 🔁 слушаем и редиректим */}
        <Routes>
          <Route path="/" element={<StudentAuthRegistrationPage />} />
          <Route path="/login" element={<StudentLoginPage />} />
          <Route path="/portal" element={<PrivateRoute><IndexPage /></PrivateRoute>} />

          {/* 👇 Добавляем 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    );
  }

