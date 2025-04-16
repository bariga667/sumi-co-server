import { useState, useEffect } from "react";

export default function Level5XSS() {
  const [input, setInput] = useState("");

  useEffect(() => {
    // Прячем флаг в глобальную переменную
    (window as any).__xssFlag = "FLAG{xss_simple_pwn}";
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>💉 Level 5: Simple XSS</h2>
        <p>
          Уязвимость здесь простая: всё, что ты введёшь, отрисуется как HTML.  
          Попробуй внедрить скрипт, чтобы вывести флаг.
        </p>

        <input
          type="text"
          placeholder="Введи XSS-пэйлоад..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />

        <div style={styles.outputBox}>
          <p>Вывод:</p>
          <div dangerouslySetInnerHTML={{ __html: input }} />
        </div>

        <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "14px" }}>
          Подсказка: <code>window.__xssFlag</code> содержит флаг 😉
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
  outputBox: {
    marginTop: "20px",
    background: "#f3f4f6",
    padding: "10px",
    borderRadius: "8px",
    minHeight: "60px",
  },
};
