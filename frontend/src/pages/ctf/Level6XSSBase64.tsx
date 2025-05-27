import { useState, useEffect } from "react";

export default function Level6XSSBase64() {
  const [input, setInput] = useState("");

  useEffect(() => {
    // 👇 Скрываем base64-флаг в глобальной переменной
    (window as any).__hint =
      "VmpJd2VFNUhSa2RqUkZaU1ZrZDRTMVZVUW5kT2JIQkhXVE5vYWxKdGREWldWekI0WWtVd2VWbDZRbHBsYXpWUVYyMTRjMlJHU25WalIwWlhVbTEwTTFkdGVFOVRhelV6VUZRd1BRPT0=";
    console.log("🤫 Загадка где-то в переменных. Попробуй найти `__hint` в console.");
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🧪 Level 6: Обфусцированный base64 XSS</h2>
        <p>
          Флаг закодирован и спрятан. Используй свои знания JavaScript, чтобы
          расшифровать строку и вставить флаг в DOM.
        </p>

        <input
          type="text"
          placeholder="Введи XSS скрипт..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <div style={styles.outputBox}>
          <p>Вывод:</p>
          <div dangerouslySetInnerHTML={{ __html: input }} />
        </div>

        <div id="flag" style={styles.flag}></div>

        <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "14px" }}>
          Подсказка: Есть некая переменная <code>__hint</code> в <b>window</b>...
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#e0f2fe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "580px",
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
  outputBox: {
    marginTop: "20px",
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "8px",
    minHeight: "60px",
  },
  flag: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "#22c55e",
    fontSize: "18px",
  },
};
