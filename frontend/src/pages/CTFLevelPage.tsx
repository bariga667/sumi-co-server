import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function CTFLevelPage() {
  const { id } = useParams<{ id: string }>();
  const [level, setLevel] = useState<any>(null);
  const [flagInput, setFlagInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [failCount, setFailCount] = useState(0);

  useEffect(() => {
    const fetchLevel = async () => {
      if (!id) return;
      const ref = doc(db, "ctf_levels", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setLevel({ id, ...snap.data() });
      }
    };
    fetchLevel();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = flagInput.trim();

    console.log("Твой флаг:", trimmed);
    console.log("Ожидаемый флаг:", level.flag);


    if (trimmed === level.flag) {
      setStatus("correct");

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      // 👇 Устанавливаем начальные значения
      let prevData = {
        points: 0,
        completed: [] as number[],
        history: [] as object[],
        currentLevel: 1,
        uid: user.uid,
        email: user.email || "",
        firstName: "",
        lastName: "",
      };

      // 👇 Получаем существующие значения (если есть)
      if (snap.exists()) {
        const data = snap.data();
        prevData = {
          points: data.points || 0,
          completed: Array.isArray(data.completed) ? data.completed : [],
          history: Array.isArray(data.history) ? data.history : [],
          currentLevel: data.currentLevel || 1,
          uid: user.uid,
          email: data.email || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
        };
      }

      const updatedPoints = prevData.points + Number(level.points || 0);
      const updatedCompleted = [...new Set([...prevData.completed, Number(id)])];

      const newEntry = {
        level: Number(id),
        timestamp: new Date().toISOString(),
        points: Number(level.points),
        totalPoints: updatedPoints,
        failedAttempts: failCount,
        category: level.category || "CTF",
      };

      const updatedHistory = [...prevData.history, newEntry];
      console.log("История для записи:", updatedHistory);
      // 👇 Сохраняем данные в Firebase (включая history!)
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: prevData.email,
          firstName: prevData.firstName,
          lastName: prevData.lastName,
          points: updatedPoints,
          completed: updatedCompleted,
          currentLevel: level.nextLevel,
          history: updatedHistory,
        },
        { merge: true }
      );
    } else {
      setFailCount((f) => f + 1);
      setStatus("wrong");
    }
  };

  if (!level) return <p>Загрузка уровня...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>
        Уровень {level.id}: {level.title}
      </h2>
      {level.description && <p>{level.description}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={flagInput}
          onChange={(e) => setFlagInput(e.target.value)}
          placeholder="Флаг..."
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Проверить
        </button>
      </form>

      {status === "correct" && (
        <p style={{ color: "green" }}>✅ Верно! Прогресс сохранён</p>
      )}
      {status === "wrong" && (
        <p style={{ color: "red" }}>❌ Неверный флаг</p>
      )}
    </div>
  );
}
