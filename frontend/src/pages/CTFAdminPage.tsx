// import { collection, setDoc, doc } from "firebase/firestore";
// import { db } from "../firebase";

// const levelData = {
//   1: {
//     title: "View Source",
//     description: "Флаг спрятан в исходном коде страницы. Попробуй Ctrl+U.",
//     flag: "FLAG{view_source_123}",
//     points: 50,
//     nextLevel: 2,
//   },
//   2: {
//     title: "LocalStorage",
//     description: "Флаг сохранён в localStorage. Но не отображается на экране.",
//     flag: "FLAG{local_secret_found}",
//     points: 100,
//     nextLevel: 3,
//   },
//   3: {
//     title: "Cookie Challenge",
//     description: "Флаг спрятан в куке. Но ты его не увидишь без DevTools.",
//     flag: "FLAG{cookie_monster}",
//     points: 100,
//     nextLevel: 4,
//   },
//   4: {
//     title: "Console Function",
//     description: "Открой консоль. Там может быть что-то... вызываемое 👀",
//     flag: "FLAG{console_wizard}",
//     points: 150,
//     nextLevel: 5,
//   },
//   5: {
//     title: "XSS Injection",
//     description: "Если можешь выполнить JS-код, ты получишь флаг.",
//     flag: "FLAG{xss_simple_pwn}",
//     points: 150,
//     nextLevel: 6,
//   },
//   6: {
//     title: "Obfuscated Base64",
//     description: "Флаг зашифрован и должен быть расшифрован через eval(atob()).",
//     flag: "FLAG{x8ss_base64}",
//     points: 200,
//     nextLevel: 7,
//   },
//   7: {
//     title: "Login Bypass",
//     description: "Нужен доступ администратора. Но пароль тебе никто не даст.",
//     flag: "FLAG{login_bypassed}",
//     points: 200,
//     nextLevel: 8,
//   },
//   8: {
//     title: "robots.txt",
//     description: "Не все страницы индексируются... Иногда надо глянуть на /robots.txt.",
//     flag: "FLAG{robots_are_not_safe}",
//     points: 100,
//     nextLevel: 9,
//   },
//   9: {
//     title: "Hidden Form Field",
//     description: "Есть скрытое поле, которое мешает получить флаг.",
//     flag: "FLAG{hidden_form_master}",
//     points: 150,
//     nextLevel: 10,
//   },
//   10: {
//     title: "Cookie Auth Bypass",
//     description: "Сделай себя админом через куки и получи флаг.",
//     flag: "FLAG{cookie_monster_pwn}",
//     points: 200,
//     nextLevel: 11,
//   },
// };

// export default function CTFAdminPage() {
//   const uploadLevels = async () => {
//     try {
//       for (const [id, data] of Object.entries(levelData)) {
//         await setDoc(doc(db, "ctf_levels", id), data);
//       }
//       alert("✅ Уровни успешно загружены в Firestore!");
//     } catch (error) {
//       console.error("Ошибка при загрузке уровней:", error);
//       alert("❌ Ошибка при загрузке. Проверь консоль.");
//     }
//   };

//   return (
//     <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
//       <h2>📤 Загрузить уровни в Firestore</h2>
//       <button
//         onClick={uploadLevels}
//         style={{
//           marginTop: "20px",
//           padding: "12px 20px",
//           backgroundColor: "#2563eb",
//           color: "#fff",
//           border: "none",
//           borderRadius: "6px",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         Загрузить 10 уровней
//       </button>
//     </div>
//   );
// }
