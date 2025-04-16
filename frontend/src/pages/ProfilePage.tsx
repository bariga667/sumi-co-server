import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function ProfilePage() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const fullName = `${data.firstName} ${data.lastName}`;
        setName(fullName);
      }
    };

    fetchName();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <span style={styles.name}>
          {name ? `Салам, ${name}!` : "Загрузка..."}
        </span>
      </div>

      <div style={styles.content}>
        <h2>Добро пожаловать в профиль</h2>
        <p>Здесь в будущем может быть информация об учебе, очках и настройках.</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative" as const,
    padding: "40px",
    fontFamily: "sans-serif",
    minHeight: "100vh",
    background: "#f3f4f6",
  },
  header: {
    position: "absolute" as const,
    top: "20px",
    right: "20px",
  },
  name: {
    background: "#fff",
    padding: "10px 16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    color: "#2563eb",
    fontWeight: "bold" as const,
  },
  content: {
    marginTop: "80px",
  },
};
