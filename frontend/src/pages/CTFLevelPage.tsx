import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { PAGES } from "../constants/pages";

export default function CTFLevelPage() {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [flagInput, setFlagInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "already">("idle");
  const [failCount, setFailCount] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  // Загрузка задания и данных пользователя
  useEffect(() => {
    (async () => {
      if (!id) return;
      setLoading(true);

      try {
        const ref = doc(db, "ctf_levels", id);
        const snap = await getDoc(ref);
        if (snap.exists()) setLevel({ id, ...snap.data() });
        else setLevel(null);

        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const usrSnap = await getDoc(userRef);
          if (usrSnap.exists()) setUserData(usrSnap.data());
          else setUserData(null);
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setLevel(null);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Обновление данных пользователя из Firestore
  const refreshUserData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const usrSnap = await getDoc(userRef);
      if (usrSnap.exists()) setUserData(usrSnap.data());
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!level) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Пожалуйста, войдите в систему.");
      return;
    }

    if (userData?.completed?.includes(Number(id))) {
      setStatus("already");
      return;
    }

    const trimmed = flagInput.trim();

    if (trimmed === level.flag) {
      setStatus("correct");

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        const prev = snap.exists()
          ? snap.data()
          : { currentLevel: 1, points: 0, completed: [], history: [] };

        const updatedPoints = (prev.points || 0) + (level.points || 0);
        const updatedCompleted = [...new Set([...(prev.completed || []), Number(id)])];

        const newHistoryEntry = {
          level: Number(id),
          timestamp: new Date().toISOString(),
          points: level.points,
          totalPoints: updatedPoints,
          failedAttempts: failCount,
          category: level.category || "CTF",
        };

        const updatedHistory = [...(prev.history || []), newHistoryEntry];

        await setDoc(
          userRef,
          {
            ...prev,
            uid: user.uid,
            currentLevel: level.id,
            points: updatedPoints,
            completed: updatedCompleted,
            history: updatedHistory,
          },
          { merge: true }
        );

        await refreshUserData();
      } catch (error) {
        console.error("Ошибка при сохранении прогресса:", error);
        alert("Ошибка при сохранении результатов. Попробуйте позже.");
      }
    } else {
      setStatus("wrong");
      setFailCount((c) => c + 1);
    }
  };

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

  if (loading) return <p style={{ padding: 40 }}>Загрузка…</p>;
  if (!level) return <p style={{ padding: 40 }}>Уровень не найден</p>;

  const isCompleted = userData?.completed?.includes(Number(level.id));

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 560,
        margin: "0 auto",
        fontFamily: "sans-serif",
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 32px #0001",
        borderTop: `8px solid ${getColor((level.category || "").toLowerCase())}`,
      }}
    >
      <Link to={PAGES.CTF.INDEX} style={{ color: "#2563eb", textDecoration: "none" }}>
        ← Назад к списку
      </Link>
      <h2 style={{ marginTop: 20 }}>
        🧩 Уровень {level.id}: {level.title}
      </h2>
      {level.points && (
        <div style={{ marginBottom: 6, color: "#64748b" }}>
          Стоимость: {level.points} очк.
        </div>
      )}
      <div style={{ marginBottom: 12, fontStyle: "italic", color: "#64748b" }}>
        {level.category && <>Категория: {level.category}</>}
      </div>
      {level.description && (
        <p style={{ marginTop: 0, marginBottom: 18 }}>{level.description}</p>
      )}

      {level.component && (
        <Link
          to={`/ctf/do/${level.component}`}
          style={{
            display: "inline-block",
            margin: "18px 0",
            padding: "10px 22px",
            background: "#f1f5f9",
            borderRadius: 8,
            fontWeight: 500,
            color: "#2563eb",
            textDecoration: "none",
            boxShadow: "0 2px 8px #0001",
          }}
        >
          🔗 Перейти к заданию
        </Link>
      )}

      {!isCompleted && (
        <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
          <input
            type="text"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            placeholder="Флаг…"
            style={{
              width: "100%",
              padding: 10,
              border: "1px solid #cbd5e1",
              borderRadius: 6,
              marginBottom: 10,
              fontSize: 15,
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 24px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Проверить
          </button>
        </form>
      )}

      {(status === "correct" || isCompleted) && (
        <p style={{ color: "green", marginTop: 12 }}>✅ Уровень уже пройден.</p>
      )}
      {status === "wrong" && (
        <p style={{ color: "red", marginTop: 12 }}>
          ❌ Неверный флаг &nbsp;({failCount})
        </p>
      )}
      {status === "already" && (
        <p style={{ color: "gray", marginTop: 12 }}>⚡ Вы уже проходили этот уровень.</p>
      )}
    </div>
  );
}
