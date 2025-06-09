import { useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase"; // путь проверь сам!

function PrivateRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("onAuthStateChanged", firebaseUser);
      setUser(firebaseUser);
      setIsAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoute;
