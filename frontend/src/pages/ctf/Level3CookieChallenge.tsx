import { useEffect } from "react";

export default function Level3CookieChallenge() {
  useEffect(() => {
    document.cookie = "flag=FLAG{cookie_monster}; path=/";
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🍪 Level 3: Cookie Challenge</h2>
        <p>
          Флаг установлен в браузере, но ты его не увидишь на экране.  
          Используй инструменты разработчика, чтобы найти его.
        </p>
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>
          Подсказка: <b>document.cookie</b>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#f3f4f6",
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
};
