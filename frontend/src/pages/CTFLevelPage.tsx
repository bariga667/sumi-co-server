import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function CTFLevelPage() {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [flagInput, setFlagInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [failCount, setFailCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLevel = async () => {
      if (!id) return;
      const ref = doc(db, "ctf_levels", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setLevel({ id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchLevel();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmed = flagInput.trim();

    console.log(trimmed, level, level.flag);

    if (trimmed === level.flag) {
      setStatus("correct");

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);
      const previous = snap.exists() ? snap.data() : {
        currentLevel: 1,
        points: 0,
        completed: [],
        history: []
      };

      const updatedPoints = (previous.points || 0) + (level.points || 0);
      const updatedCompleted = [...(previous.completed || []), Number(id)];

      const updatedHistory = [
        ...(Array.isArray(previous.history) ? previous.history : []),
        {
          level: Number(id),
          timestamp: new Date().toISOString(),
          points: level.points,
          totalPoints: updatedPoints,
          failedAttempts: failCount,
          category: level.category || "CTF"
        }
      ];

      console.log(updatedHistory);

      await setDoc(userRef, {
        ...previous,
        uid: user.uid,
        currentLevel: level.nextLevel,
        points: updatedPoints,
        completed: Array.from(new Set(updatedCompleted)),
        history: updatedHistory
      });

      setTimeout(() => {
        navigate(`/ctf/${level.nextLevel}`);
      }, 2000);
    } else {
      setStatus("wrong");
      setFailCount((prev) => prev + 1);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (!level) return <p>Уровень не найден</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>🧩 Уровень {level.id}: {level.title}</h2>
      {level.description && <p>{level.description}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={flagInput}
          onChange={(e) => setFlagInput(e.target.value)}
          placeholder="Флаг..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Проверить</button>
      </form>

      {status === "correct" && <p style={{ color: "green" }}>✅ Верно! Переход к следующему уровню...</p>}
      {status === "wrong" && <p style={{ color: "red" }}>❌ Неверный флаг</p>}
    </div>
  );
}
