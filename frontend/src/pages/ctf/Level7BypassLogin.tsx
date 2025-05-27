import { useState } from "react";

export default function Level7BypassLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Уязвимость: сравнение с хардкодом на клиенте
    if (username === "admin" && password === "admin123") {
      setLoggedIn(true);
    } else {
      alert("Неверный логин или пароль");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {loggedIn ? (
          <>
            <h2>🎉 Доступ получен</h2>
            <p>Флаг: <strong>{"sumictf{login_bypassed}"}</strong>
            </p>
          </>
        ) : (
          <>
            <h2>🔐 Level 7: Bypass Login</h2>
            <p>Попробуй получить доступ к флагу... но пароль ты не знаешь.</p>

            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Войти
              </button>
            </form>

            <p style={{ marginTop: "10px", fontSize: "13px", color: "#666" }}>
              Подсказка: может, в коде страницы есть что-то интересное? 🔍
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fce7f3",
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
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
