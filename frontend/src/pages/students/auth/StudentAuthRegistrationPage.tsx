import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { userRecoilState } from "../../../recoils/user";
import { IUser, UserRole, firestoreToUser } from "../../../types/user";
import { PAGES } from "../../../constants/pages";

export const StudentAuthRegistrationPage = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userRecoilState);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Введите корректный email").required("Email обязателен"),
      password: Yup.string().min(6, "Минимум 6 символов").max(255, "Максимум 255 символов").required("Пароль обязателен"),
      firstName: Yup.string().min(1, "Имя обязательно").max(255, "Максимум 255 символов").required("Имя обязательно"),
      lastName: Yup.string().min(1, "Фамилия обязательна").max(255, "Максимум 255 символов").required("Фамилия обязательна")
    }),
    onSubmit: async () => {
      try {
        // 1. Создаём пользователя в Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password);
        const user = userCredential.user;

        // 2. Готовим объект IUser (заполняй как нужно)
        const newUser: IUser = {
          id: Date.now(),
          ssoUserId: 0,
          lastName: formik.values.lastName,
          firstName: formik.values.firstName,
          surname: "",
          points: 0,
          telegramUsername: "",
          discordUsername: "",
          commandId: 0,
          commandName: "",
          direction: 0,
          raining: 0,
          role: UserRole.Student,
          // добавь email если нужно
        };

        // 3. Записываем в Firestore
        await setDoc(doc(db, "users", user.uid), newUser);

        // 4. Читаем обратно из Firestore (на всякий случай) и кладём в Recoil-atom через мэппер
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(firestoreToUser(userSnap.data(), Date.now()));
        }

        navigate(PAGES.DASHBOARD.PORTAL);
      } catch (error: any) {
        // Тут отлавливаем ошибку, если почта уже используется
        if (error.code === "auth/email-already-in-use") {
          formik.setFieldError("email", "Почта уже занята");
        } else {
          alert("Ошибка регистрации: " + error.message);
        }
      }
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Регистрация</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            name="firstName"
            type="text"
            placeholder="Имя"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{formik.errors.firstName}</div>
          )}

          <input
            name="lastName"
            type="text"
            placeholder="Фамилия"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{formik.errors.lastName}</div>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{formik.errors.email}</div>
          )}

          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{formik.errors.password}</div>
          )}

          <button type="submit" style={styles.button}>
            Зарегистрироваться
          </button>

          <p style={{ marginTop: "20px", fontSize: "14px" }}>
            Уже есть аккаунт?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                cursor: "pointer",
                marginLeft: "4px",
              }}
            >
              Войти
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold" as const,
    cursor: "pointer",
  },
};
