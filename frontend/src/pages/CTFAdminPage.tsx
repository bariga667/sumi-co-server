// import { collection, setDoc, doc } from "firebase/firestore";
// import { db } from "../firebase";

// const levelData = {
//     11: { 
//     title: "Discord Investigation",
//     description: "Одинокая ссылка указывает на место, где всё происходит. В этом сервере, между реакциями и сообщениями, кто-то оставил след. Не в приветствии, так в описании. Не в описании, так в никнейме.\nlink to discord - https://discord.gg/JNjgEdH4Zf",
//     flag: "sumictf{welcome_to_discord}",
//     points: 50,
//     category: "osint",
//   },
//   12: { 
//     title: "Google Docs: Скрытый след",
//     description: "Кто-то загрузил документ и думал, что этого никто не заметит. Он его отредактировал. Сохранил. Всё, что когда-либо было написано, — осталось в структуре.\nlink - https://docs.google.com/document/d/1lu0nIpLM-ddihcgTmTYvOZYzQir1Lcqd/edit?usp=sharing",
//     flag: "sumictf{you_found_me_in_xml}",
//     points: 100,
//     category: "misc",
//   },
//   13: { 
//     title: "PWN: Открытый доступ",
//     description: "Они оставили доступ открытым. Никто не подумал, что кто-то просто догадается. Иногда флаг не спрятан глубоко. Он просто там... в 1(user) и 2(root).\nLink - https://drive.google.com/file/d/1TNrEiSJ-Gnqx9Pi3wxwRQSq-taiPhBu1/view?usp=sharing\n1. user - 9046628504775551\n2. root - 4359537020406305",
//     flag: "sumictf{pr0f1l3s_4r3_n0t_s4f3}",
//     points: 150,
//     category: "pwn",
//   },
//   14: { 
//     title: "Telegram: Поиск лидера",
//     description: "Организации часто говорят громко, но лидеры предпочитают тишину. Он не кричал о себе, но ник его стоит знать. Тебе оставили только дверь — остальное найдёшь сам.",
//     flag: "sumictf{mereibek_004}",
//     points: 100,
//     category: "osint",
//   },
//   15: { 
//     title: "SteamID",
//     description: "Цифры кажутся безликими, но каждый из них — это история. Иногда, чтобы найти след, нужно просто пройти по нему. Один ID, один профиль — и всё встанет на свои места.\nID - 76561198410358351",
//     flag: "sumictf{pr0f1l3s_4r3_n0t_s4f3}",
//     points: 70,
//     category: "osint",
//   },
//   16: { 
//     title: "Geo OSINT",
//     description: "Среди снега, пустоты и утренней тишины — место, где рейтинг почти идеален. Ты знаешь, где искать: просто задай нужный вопрос в нужном месте.\nlink - https://drive.google.com/file/d/1OgbOI9yYbyWyZ-xCwiqmRfGvBkga-cW4/view?usp=sharing",
//     flag: "sumictf{ReCodeTau_2024}",
//     points: 120,
//     category: "osint",
//   },
//   17: { 
//     title: "Git Photo",
//     description: "Кто-то оставил фото. Не совсем случайно. Листай, читай, смотри в глаза тому, кто молчит. Всё уже сказано раньше, просто нужно найти, кто это сказал — и когда.\nlink - https://drive.google.com/file/d/17KvaEWsuEQ7D2cISxVBA_cdHDdzZkB8h/view?usp=sharing\n\nЕсли появилось проблема с нахождением, поищи в задаче steamID",
//     flag: "sumictf{october_2023}",
//     points: 100,
//     category: "osint",
//   },
//   18: { 
//     title: "Git Crypto",
//     description: "Сообщение пришло короткое. Слишком структурное, чтобы быть случайным. Похоже на кодировку, но не на ту, что учат в школе. Здесь каждый символ знает своё место.\nШифр - 3-2.3-1.3-3.8-1.10-1.6-2.3-1.4-1...8-1.4-2...6-1.9-1.7-1...3-3.1-2.6-3..",
//     flag: "sumictf{decipher_if_you_can}",
//     points: 200,
//     category: "crypto",
//   },
//   19: { 
//     title: "Git Hidden",
//     description: "Сайт — это живой организм. Кто-то что-то поменял. Не всегда это видно на поверхности, но код помнит всё. Иногда достаточно вернуться на пару шагов назад.",
//     flag: "sumictf{never_give_up}",
//     points: 150,
//     category: "osint",
//   },
//   20: { 
//     title: "Base Bytes",
//     description: "Иногда ответ — это просто число. Не бинарное. Не сложное. И да, оно буквально в основе всего: направлений, сторон, ходов.\nkey = 100\nШифр текст = SQddWGsDWgRQa0cHQE1WT1JAV11ZQUc#\n-----------------------------------------------------------------------\nШифратор:\nimport base64\n\ndef x(data, k):\n    return bytes([b ^ k[i % len(k)] for i, b in enumerate(data)])\n\ndef twist(s):\n    return s[::-1]\n\ndef morph(b):\n    return b.replace(b'=', b'#').replace(b'+', b'_').replace(b'/', b'-')\n\nmsg = b\"\" \nk = b\"\"\n\nstep1 = x(msg, k)\nstep2 = twist(step1)\nstep3 = base64.b64encode(step2)\nfinal = morph(step3)\n\nprint(final.decode())\n-----------------------------------------------------------------------",
//     flag: "sumictf{byt3s_d0n7_li3}",
//     points: 110,
//     category: "crypto",
//   },
//   21: { 
//     title: "CEA BAS",
//     description: "Его любимое число — 13. Ему нравились латинские буквы. И он знал, что даже самое древнее можно спрятать под самым банальным.\nШифр текст - Zmh6dnBnc3twbnJmbmVfbmFxX29uZnJ9Cg",
//     flag: "sumictf{fzvngs{pnrfnv_naqx_onfr}}",
//     points: 180,
//     category: "crypto",
//   },
//   22: { 
//     title: "Gravity Colors",
//     description: "Каждый цвет здесь — не просто пиксель. Это — часть сообщения. Вопрос в том, какой это код: RGB, байты, или что-то проще?\nlink - https://drive.google.com/file/d/1kLUpXDBaQ86QqCzTpTCIY4g_5bFsevcS/view?usp=sharing",
//     flag: "sumictf{encoded_trail}",
//     points: 130,
//     category: "crypto",
//   },
//   23: { 
//     title: "Hexahue Matrix",
//     description: "Это не мозаика. Это матрица. Повтори путь по цвету, и ты прочтёшь его послание. Серые оттенки могут означать конец, но они же и дают начало.\nlink - https://drive.google.com/file/d/1GtL_w7jjnBs79Q7D1I7fBmZF9MLXDJvk/view?usp=sharing",
//     flag: "sumictf{cryp70_und0n3}",
//     points: 130,
//     category: "crypto",
//   },
//   24: { 
//     title: "Interactive Crypto",
//     description: "Иногда нужно просто ввести то, что он хотел услышать. А если не догадаешься — он всё равно скажет, но только в бинарном виде.\nlink - https://drive.google.com/file/d/1nqo7-7B4OiATUVZSzqKBQclDSBhjSp6G/view?usp=sharing",
//     flag: "sumictf{talk_2_term1nal}",
//     points: 140,
//     category: "crypto",
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
//         Загрузить c 11 до 24 уровней
//       </button>
//     </div>
//   );
// }
