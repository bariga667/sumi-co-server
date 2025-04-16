import { useEffect } from "react";

export default function Level4ConsoleTrap() {
  useEffect(() => {
    // 👇 создаём функцию вручную в глобальной области
    (window as any).getFlag = () => {
      return "FLAG{console_wizard}";
    };

    console.log("%cДобро пожаловать в консоль...", "color: #0ea5e9; font-weight: bold;");
    console.log("%cПопробуй вызвать скрытую функцию 😉", "color: #64748b;");
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>🧠 Level 4: Console Trap</h2>
        <p>
          У этой страницы вроде бы ничего особенного... но те, кто умеет пользоваться консолью,
          смогут раскрыть её секрет.
        </p>
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>
          Подсказка: <b>F12 → Console</b>
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
    width: "520px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    textAlign: "center" as const,
    fontFamily: "sans-serif",
  },
};
