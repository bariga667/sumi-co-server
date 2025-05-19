import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function CTFLevelPage() {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [flagInput, setFlagInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "already">("idle");
  const [failCount, setFailCount] = useState(0);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      if (!id) return;
      // Загружаем задание
      const ref = doc(db, "ctf_levels", id);
      const snap = await getDoc(ref);
      if (snap.exists()) setLevel({ id, ...snap.data() });

      // Загружаем данные пользователя
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const usrSnap = await getDoc(userRef);
        if (usrSnap.exists()) setUserData(usrSnap.data());
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!level) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    // Если уже пройден
    if (userData?.completed?.includes(Number(id))) {
      setStatus("already");
      return;
    }

    const trimmed = flagInput.trim();
    if (trimmed === level.flag) {
      setStatus("correct");
      // Добавляем баллы только если уровень ещё не пройден
      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const prev = snap.exists() ? snap.data() : {
        currentLevel: 1,
        points: 0,
        completed: [],
        history: [],
      };

      const updatedPoints = (prev.points || 0) + (level.points || 0);
      const updatedCompleted = [...(prev.completed || []), Number(id)];
      const newHistoryEntry = {
        level: Number(id),
        timestamp: new Date().toISOString(),
        points: level.points,
        totalPoints: updatedPoints,
        failedAttempts: failCount,
        category: level.category || "CTF",
      };

      await setDoc(
        userRef,
        {
          ...prev,
          uid: user.uid,
          currentLevel: level.nextLevel,
          points: updatedPoints,
          completed: Array.from(new Set(updatedCompleted)),
          history: [...(prev.history || []), newHistoryEntry],
        },
        { merge: true }
      );

      // Обновляем локальное состояние
      setUserData((prev: any) => ({
        ...prev,
        points: updatedPoints,
        completed: Array.from(new Set(updatedCompleted)),
        history: [...(prev.history || []), newHistoryEntry],
      }));

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
      <Link to="/ctf" style={{ color: "#2563eb", textDecoration: "none" }}>← Назад к списку</Link>
      <h2 style={{ marginTop: 20 }}>🧩 Уровень {level.id}: {level.title}</h2>
      {level.points && <div style={{ marginBottom: 6, color: "#64748b" }}>Стоимость: {level.points} очк.</div>}
      <div style={{ marginBottom: 12, fontStyle: "italic", color: "#64748b" }}>
        {level.category && <>Категория: {level.category}</>}
      </div>
      {level.description && (<p style={{ marginTop: 0, marginBottom: 18 }}>{level.description}</p>)}

      {/* Кнопка-ссылка на задание */}
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

      {/* Форма для флага */}
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

      {/* Сообщения об ошибках и успехах */}
      {status === "correct" && (
        <p style={{ color: "green", marginTop: 12 }}>
          ✅ Верно! Уровень пройден.
        </p>
      )}
      {status === "wrong" && (
        <p style={{ color: "red", marginTop: 12 }}>
          ❌ Неверный флаг &nbsp;({failCount})
        </p>
      )}
      {(status === "already" || isCompleted) && (
        <p style={{ color: "gray", marginTop: 12 }}>
          ⚡ Уровень уже пройден
        </p>
      )}
    </div>
  );
}
