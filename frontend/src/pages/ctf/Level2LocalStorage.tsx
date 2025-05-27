import { useEffect } from "react";

export default function Level2LocalStorage() {
  useEffect(() => {
    localStorage.setItem("flag", "sumictf{local_secret_found}");
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🔐 Level 2: Local Storage</h2>
        <p>
          Флаг не так просто увидеть... но он уже на этой странице. Может, стоит копнуть немного глубже?
        </p>
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>
          <b>Подсказка:</b> открой консоль (F12 → Console)
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
    width: "460px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    fontFamily: "sans-serif",
  },
};
