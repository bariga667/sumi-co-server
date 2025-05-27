import { useEffect, useState } from "react";

const API = "http://localhost:3001"; // Адрес backend

export default function Level5XSSBackend() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");

  // Загрузка комментариев
  useEffect(() => {
    fetch(`${API}/comments`, { credentials: "include" })
      .then(r => r.json())
      .then(setComments);
  }, []);

  // Добавление комментария
  const addComment = async () => {
    if (!input) return;
    const res = await fetch(`${API}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
      credentials: "include"
    });
    if (res.ok) {
      setMsg("Комментарий добавлен!");
      setInput("");
      // Перезагрузить комментарии
      fetch(`${API}/comments`, { credentials: "include" })
        .then(r => r.json())
        .then(setComments);
    } else {
      setMsg("Ошибка при добавлении");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>💉 Level 5: XSS через backend</h2>
        <p>
          Всё, что ты напишешь, отправится на сервер и будет отрисовано для всех.
          Попробуй внедрить XSS, чтобы украсть флаг у админа!
        </p>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введи payload..."
          style={styles.input}
        />
        <button style={styles.button} onClick={addComment}>
          Отправить
        </button>
        <div style={styles.outputBox}>
          <p>Комментарии:</p>
          {comments.map((c, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid #eee", margin: "8px 0", padding: "5px" }}
              dangerouslySetInnerHTML={{ __html: c }}
            />
          ))}
        </div>
        <p style={{ color: "#aaa" }}>{msg}</p>
        <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "14px" }}>
          <b>Цель:</b> Флаг доступен только для админа по <code>/flag</code>!<br />
          Реальный XSS — укради флаг через админ-бота!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fef9c3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "560px",
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
    padding: "10px 20px",
    borderRadius: "8px",
    background: "#fee440",
    border: "none",
    fontWeight: "bold",
    marginBottom: "10px",
    cursor: "pointer",
  },
  outputBox: {
    marginTop: "20px",
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "8px",
    minHeight: "60px",
    textAlign: "left" as const
  },
};
