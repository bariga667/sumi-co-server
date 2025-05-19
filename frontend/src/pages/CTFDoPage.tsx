import { useParams, Link } from "react-router-dom";
import { CTF_TASK_COMPONENTS } from "./ctf";

export default function CTFDoPage() {
  const { component } = useParams<{ component: string }>();
  const TaskComponent = component ? CTF_TASK_COMPONENTS[component] : null;

  return (
    <div style={{ padding: 40, width: "100%", minHeight: "100vh", background: "#f2f4fa", margin: "0 auto", borderRadius: 18 }}>
      <Link to="/ctf" style={{ color: "#2563eb", textDecoration: "none" }}>← Назад к заданиям</Link>
      <h2 style={{ marginTop: 20, marginBottom: -140 }}>Интерактивное задание</h2>
      {TaskComponent ? (
        <TaskComponent />
      ) : (
        <p>Задание не найдено</p>
      )}
    </div>
  );
}
