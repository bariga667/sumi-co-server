export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <a href="/" style={styles.link}>Вернуться на главную</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fef2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  card: {
    textAlign: "center" as const,
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  },
  link: {
    marginTop: "20px",
    display: "inline-block",
    color: "#2563eb",
    textDecoration: "underline",
    fontWeight: "bold" as const,
  },
};
