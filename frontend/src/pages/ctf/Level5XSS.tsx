import { useEffect } from "react";

export default function LevelXSSUrl() {
  useEffect(() => {
    (window as any).__xssFlag = "sumictf{xss_simple_pwn}";
  }, []);

  const params = new URLSearchParams(window.location.search);
  const comment = params.get("comment") || "";

  // Проверка на правильный payload (точный или любой XSS)
  const expected = `<img src=x onerror="alert(window.__xssFlag)">`;
  const isSolved = comment.trim() === expected;

  return (
    <div className="fullscreen-task">
      <div style={styles.card}>
        <h2>🌐 XSS через URL</h2>
        <p>
          Всё, что ты укажешь в параметре <code>comment</code> в адресной строке, появится ниже как HTML.
          <br />
          <b>Задача:</b> Через XSS получи флаг из <code>window.__xssFlag</code>!
        </p>
        <div style={styles.outputBox}>
          <p>Результат:</p>
          {isSolved ? (
            <div style={{ fontWeight: "bold", color: "#059669", fontSize: 18 }}>
              Флаг: <code>sumictf&#123;xss_simple_pwn&#125;</code>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: comment }} />
          )}
        </div>
        <p style={{ marginTop: 12, color: "#888" }}>
          <b>Подсказка:</b> XSS — это не только &lt;script&gt;...
        </p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    width: 540,
    maxWidth: "95vw",
    boxShadow: "0 8px 32px #0001",
    textAlign: "center" as const,
    fontFamily: "sans-serif",
  },
  outputBox: {
    marginTop: 18,
    background: "#f3f4f6",
    padding: 10,
    borderRadius: 8,
    minHeight: 60,
  },
};
