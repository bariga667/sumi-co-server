import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase"; // путь подстрой под свой проект
import { useNavigate } from "react-router-dom";

export default function StudentForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Ссылка для сброса пароля отправлена на ваш email.");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("Пользователь с таким email не найден.");
      } else if (err.code === "auth/invalid-email") {
        setError("Введите корректный email.");
      } else {
        setError("Ошибка: " + err.message);
      }
    }
  };

return (
  <div style={styles.container}>
    <div style={styles.card}>
      <div style={styles.iconWrap}>
        <span style={styles.icon}>🔒</span>
      </div>
      <h2 style={styles.title}>Восстановление пароля</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Сбросить пароль
        </button>
      </form>
      {message && <div style={styles.success}>{message}</div>}
      {error && <div style={styles.error}>{error}</div>}

      <p style={styles.backLink}>
        <span onClick={() => navigate("/login")} style={styles.link}>
          Вернуться ко входу
        </span>
      </p>
    </div>
  </div>
);
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
  },
  card: {
    background: "#fff",
    padding: "32px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
    textAlign: "center" as const,
    animation: "fadeIn 0.8s"
  },
  iconWrap: {
    marginBottom: "12px"
  },
  icon: {
    fontSize: "2.5rem"
  },
  title: {
    marginBottom: "20px",
    fontWeight: "bold",
    fontSize: "24px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #bbb",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#2563eb 0%,#3b82f6 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold" as const,
    cursor: "pointer",
    boxShadow: "0 2px 8px #2563eb22",
    transition: "background 0.2s",
  },
  success: {
    color: "#22c55e",
    marginTop: "14px",
    fontSize: "15px"
  },
  error: {
    color: "#ef4444",
    marginTop: "14px",
    fontSize: "15px"
  },
  backLink: {
    marginTop: "22px",
    fontSize: "14px",
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
    cursor: "pointer"
  }
};

