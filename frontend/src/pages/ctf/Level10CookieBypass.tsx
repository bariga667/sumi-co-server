import { useEffect, useState } from "react";

export default function Level10CookieBypass() {
  const [showFlag, setShowFlag] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc: any, pair) => {
      const [key, value] = pair.split("=");
      acc[key] = value;
      return acc;
    }, {});
  
    // Только если куки нет вообще
    if (!cookies.isAdmin) {
      document.cookie = "isAdmin=false; path=/";
    }
  
    if (cookies.isAdmin === "true") {
      setShowFlag(true);
    }
  }, []);
  

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🍪 Level 10: Cookie Bypass</h2>
        <p>
          Чтобы получить флаг, тебе нужно быть админом.  
          К сожалению, обычные пользователи не могут его увидеть...
        </p>

        {showFlag ? (
          <p style={styles.flag}>{"FLAG{cookie_monster_pwn}"}</p>
        ) : (
          <p style={{ marginTop: "20px", fontStyle: "italic", fontSize: "14px" }}>
            Подсказка: может, в куках что-то интересное? 😉
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fff7ed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "480px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    fontFamily: "sans-serif",
  },
  flag: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "#dc2626",
    fontSize: "18px",
  },
};
