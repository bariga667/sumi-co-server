import { useState } from "react";

export default function Level9HiddenField() {
  const [flagVisible, setFlagVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const isAdmin = formData.get("isAdmin");

    if (isAdmin === "true") {
      setFlagVisible(true);
    } else {
      alert("Ты не админ. Попробуй ещё раз.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🛡️ Level 9: Hidden Admin Check</h2>
        <p>Ты можешь получить флаг только как админ.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Имя..." style={styles.input} />
          {/* Уязвимость: скрытое поле, но не проверяется на сервере */}
          <input type="hidden" name="isAdmin" value="false" />

          <button type="submit" style={styles.button}>Войти</button>
        </form>

        {flagVisible && (
          <p style={styles.flag}>{"FLAG{hidden_form_master}"}</p>
        )}

        <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "13px" }}>
          Подсказка: иногда стоит смотреть код страницы 👀
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#f1f5f9",
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
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
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
  flag: {
    marginTop: "20px",
    color: "#16a34a",
    fontWeight: "bold",
    fontSize: "18px",
  },
};
