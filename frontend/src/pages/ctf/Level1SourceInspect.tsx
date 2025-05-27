export default function Level1SourceInspect() {
    return (
        <>
        <div style={{ display: "none" }}>{"sumictf{view_source_123}"}</div>


      
  
        <div style={styles.container}>
          <div style={styles.card}>
            <h2>📜 Level 1: Source Inspection</h2>
            <p>
              Добро пожаловать! Чтобы получить флаг, тебе нужно внимательно изучить
              содержимое этой страницы.
            </p>
            <p style={{ marginTop: "10px", fontStyle: "italic" }}>
              Иногда ответ скрыт на самом виду...
            </p>
          </div>
        </div>
      </>
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
      width: "400px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      textAlign: "center" as const,
      fontFamily: "sans-serif",
    },
  };
  