import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

export default function CTFPage() {
  const [levels, setLevels] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  type FlagStatus = "correct" | "wrong" | "already" | null;
  const [status, setStatus] = useState<{ [key: string]: FlagStatus }>({});


  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchLevels = async () => {
      const snap = await getDocs(collection(db, "ctf_levels"));
      const data: any[] = [];
      snap.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setLevels(data.sort((a, b) => Number(a.id) - Number(b.id)));
    };

    const fetchUser = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchLevels();
    fetchUser();
  }, [user]);

  const handleSubmit = async (levelId: string, correctFlag: string, points: number, nextLevel: number) => {
    const input = answers[levelId]?.trim();


    // 🛑 Проверка: если уже прошёл — прерываем
    if (userData?.completed?.includes(Number(levelId))) {
      setStatus((prev) => ({ ...prev, [levelId]: "already" }));
      return;
    }

    if (input === correctFlag) {
      setStatus((prev) => ({ ...prev, [levelId]: "correct" }));
    
      const userRef = doc(db, "users", user!.uid);
      const snap = await getDoc(userRef);
      const data = snap.data();
    
      const updatedPoints = (data?.points || 0) + points;
      const updatedCompleted = [...(data?.completed || []), Number(levelId)];
    
      // 👇 Добавляем новую запись в history
      const newEntry = {
        level: Number(levelId),
        timestamp: new Date().toISOString(),
        points,
        totalPoints: updatedPoints,
        failedAttempts: 0, // пока без счётчика ошибок, можно доработать
        category: "CTF",
      };
    
      const updatedHistory = [
        ...(Array.isArray(data?.history) ? data.history : []),
        newEntry,
      ];
    
      // 👇 Обновляем Firestore с history
      await setDoc(
        userRef,
        {
          ...data,
          points: updatedPoints,
          completed: Array.from(new Set(updatedCompleted)),
          currentLevel: nextLevel,
          history: updatedHistory,
        },
        { merge: true } // важно!
      );
    
      // 👇 Обновляем локальное состояние
      setUserData((prev: any) => ({
        ...prev,
        points: updatedPoints,
        completed: Array.from(new Set(updatedCompleted)),
        history: updatedHistory,
      }));
    
    } else {
      setStatus((prev) => ({ ...prev, [levelId]: "wrong" }));
    }
  };
  

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🏁 CTF Задания</h1>

      {levels.map((level) => {
        const isCompleted = userData?.completed?.includes(Number(level.id));
        const answer = answers[level.id] || "";

        return (
          <div
            key={level.id}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              marginBottom: "20px",
            }}
          >
            <h2>Уровень {level.id}: {level.title}</h2>

            <Link to={`/ctf/levels/${level.id}`} style={{ color: "#2563eb" }}>
              Перейти к заданию →
            </Link>

            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Введи флаг..."
                value={answer}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [level.id]: e.target.value }))}
                style={{
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginRight: "10px",
                }}
              />
              <button
                onClick={() =>
                  handleSubmit(level.id, level.flag, level.points, level.nextLevel)
                }
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Отправить
              </button>
            </div>

            {status[level.id] === "correct" && (
              <p style={{ color: "green", marginTop: "10px" }}>✅ Флаг верный! Уровень пройден</p>
            )}
            {status[level.id] === "wrong" && (
              <p style={{ color: "red", marginTop: "10px" }}>❌ Неверный флаг</p>
            )}
            {status[level.id] === "already" && (
              <p style={{ color: "gray", marginTop: "10px" }}>⚠️ Вы уже прошли это задание</p>
            )}
            {isCompleted && !status[level.id] && (
              <p style={{ color: "gray", marginTop: "10px" }}>⚡ Уровень уже пройден</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
