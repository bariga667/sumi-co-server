export default function Level8Robots() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>🤖 Level 8: Robots.txt</h2>
          <p>
            Некоторые страницы скрываются от поисковых систем...
            Но это не значит, что ты не можешь найти их сам.
          </p>
          <p style={{ fontStyle: "italic", fontSize: "14px", marginTop: "10px" }}>
            Подсказка: <code>/robots.txt</code> может многое рассказать...
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
      width: "500px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      textAlign: "center" as const,
      fontFamily: "sans-serif",
    },
  };
  