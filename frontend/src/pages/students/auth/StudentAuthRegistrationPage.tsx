import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useFormik } from "formik";
import * as Yup from "yup";

export const StudentAuthRegistrationPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(255).required(),
      firstName: Yup.string().min(1).max(255).required(),
      lastName: Yup.string().min(1).max(255).required()
    }),
    onSubmit: async () => {
      const userCredential = await createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password);
      const user = userCredential.user;
  
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: formik.values.email,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        currentLevel: 1,
        points: 0,
        completed: [],
        history: []
      });
  
      navigate("/portal");
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

          <input
            name="lastName"
            type="text"
            placeholder="Фамилия"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />
          
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={formik.values.password}
            onChange={formik.handleChange}
            style={styles.input}
            required
          />

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
