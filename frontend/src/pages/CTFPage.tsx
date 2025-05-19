import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

export default function CTFPage() {
  const [levels, setLevels] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const auth = getAuth();
  const user = auth.currentUser;

  // ── загрузка уровней + пользователя
  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "ctf_levels"));
      const arr: any[] = [];
      snap.forEach((d) => arr.push({ id: d.id, ...d.data() }));
      setLevels(arr.sort((a, b) => Number(a.id) - Number(b.id)));

      if (user) {
        const ref = doc(db, "users", user.uid);
        const usr = await getDoc(ref);
        usr.exists() && setUserData(usr.data());
      }
    })();
  }, [user]);

  // ── группируем по category
  const grouped = levels.reduce((acc: Record<string, any[]>, lvl) => {
    const cat = (lvl.category || "Прочее").toLowerCase();
    acc[cat] ||= [];
    acc[cat].push(lvl);
    return acc;
  }, {});

  // ── функция случайного/фикс-цвета для квадрата
  const getColor = (cat: string) => {
    const palette: Record<string, string> = {
      web: "#ef4444",
      osint: "#22c55e",
      crypto: "#0ea5e9",
      sql: "#8247e5",
      geo: "#f59e0b",
    };
    return palette[cat] || "#64748b";
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32, marginBottom: 30 }}>🏁 CTF&nbsp;Задания</h1>

      {Object.entries(grouped).map(([cat, arr]) => (
        <div key={cat} style={{ marginBottom: 50 }}>
          <h2 style={{ textTransform: "uppercase", marginBottom: 16 }}>{cat}</h2>

          {/* грид квадратиков */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {arr.map((lvl) => {
              const completed = userData?.completed?.includes(Number(lvl.id));
              return (
                <Link
                  key={lvl.id}
                  to={`/ctf/levels/${lvl.id}`}
                  style={{
                    width: 140,
                    height: 140,
                    background: getColor(cat),
                    borderRadius: 8,
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                    boxShadow: "0 2px 6px rgba(0,0,0,.15)",
                  }}
                >
                  <div style={{ fontSize: 42, fontWeight: 700 }}>{lvl.id}</div>
                  <div style={{ fontSize: 13, textAlign: "center", lineHeight: 1.25, padding: "0 4px" }}>
                    {lvl.title}
                  </div>
                  {completed && (
                    <div style={{ fontSize: 12, marginTop: 4, color: "#d1fae5" }}>✔</div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
