import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CTFTestWrite() {
  const testWrite = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return alert("⚠️ Сначала войди!");

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const prev = snap.exists() ? snap.data() : {};

    const updatedHistory = [
      ...(Array.isArray(prev.history) ? prev.history : []),
      {
        level: 999,
        points: 777,
        timestamp: new Date().toISOString(),
        failedAttempts: 3,
        category: "TestWrite"
      }
    ];

    await setDoc(ref, {
      ...prev,
      history: updatedHistory,
    });

    alert("✅ Тестовая история добавлена!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>🧪 Тест записи history в Firestore</h2>
      <button
        onClick={testWrite}
        style={{ padding: "12px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px" }}
      >
        ➕ Добавить тестовую history
      </button>
    </div>
  );
}
