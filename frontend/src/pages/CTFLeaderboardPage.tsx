import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserEntry = {
  uid: string;
  points: number;
  firstName?: string;
  lastName?: string;
};

export default function CTFLeaderboardPage() {
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data: UserEntry[] = [];

      snapshot.forEach((docSnap) => {
        const u = docSnap.data();
        data.push({
          uid: u.uid,
          points: u.points || 0,
          firstName: u.firstName || "Аноним",
          lastName: u.lastName || "",
        });
      });

      data.sort((a, b) => b.points - a.points);
      setUsers(data);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Загрузка лидерборда...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Рейтинг участников</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Место</th>
            <th style={styles.th}>Имя</th>
            <th style={styles.th}>Очки</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.uid}
              onClick={() => navigate(`/ctf/user/${user.uid}`)}
              style={{ ...styles.tr, cursor: "pointer" }}
            >
              <td style={styles.td}>
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index > 2 && index + 1}
              </td>
              <td style={styles.td}>
                {user.lastName} {user.firstName?.[0]}.
              </td>
              <td style={styles.td}>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "sans-serif",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
    textAlign: "center" as const,
  },
  table: {
    width: "100%",
    maxWidth: "700px",
    borderCollapse: "collapse" as const,
    backgroundColor: "#fff",
    boxShadow: "0 6px 12px rgba(0,0,0,0.05)",
  },
  th: {
    padding: "14px",
    background: "#e5e7eb",
    textAlign: "left" as const,
    fontWeight: "bold",
    fontSize: "16px",
    borderBottom: "1px solid #ccc",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    fontSize: "15px",
  },
  tr: {
    transition: "background-color 0.2s",
  },
};
