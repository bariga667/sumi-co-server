export default function SecretFlag88() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>🔓 Ты нашёл скрытую страницу!</h2>
          <p style={styles.flag}>{"FLAG{robots_are_not_safe}"}</p>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      height: "100vh",
      background: "#fff1f2",
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
    flag: {
      marginTop: "20px",
      color: "#10b981",
      fontSize: "18px",
      fontWeight: "bold",
    },
  };
  