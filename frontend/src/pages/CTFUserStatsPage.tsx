import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#ef4444", "#10b981"];
const CATEGORY_COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

export default function CTFUserStatsPage() {
  const { uid } = useParams();
  const [history, setHistory] = useState<any[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "users", uid!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setHistory(data.history || []);
        setName(`${data.firstName} ${data.lastName}`);
      }
    };
    fetchData();
  }, [uid]);

  const totalPoints = history[history.length - 1]?.totalPoints || 0;

  const pieFails = [
    { name: "Ошибки", value: history.reduce((sum, h) => sum + h.failedAttempts, 0) },
    { name: "Успешно", value: history.length },
  ];

  const pieCategories = Object.entries(
    history.reduce((acc, h) => {
      acc[h.category] = (acc[h.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-2">{name}</h2>
        <p className="text-center text-lg text-slate-600 mb-10">🏆 {totalPoints} очков</p>

        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-slate-700">📈 Рост очков</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <XAxis dataKey="timestamp" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="totalPoints" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">🎯 Процент ошибок</h3>
            <PieChart width={300} height={250}>
              <Pie
                data={pieFails}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieFails.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">📚 Категории заданий</h3>
            <PieChart width={300} height={250}>
              <Pie
                data={pieCategories}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieCategories.map((_, index) => (
                  <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
