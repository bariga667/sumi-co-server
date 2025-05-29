import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

interface UserProfile {
  firstName: string;
  lastName: string;
  telegramUsername: string;
  discordUsername: string;
  commandName: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          telegramUsername: data.telegramUsername || "",
          discordUsername: data.discordUsername || "",
          commandName: data.commandName || "",
        });
        setOriginalProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          telegramUsername: data.telegramUsername || "",
          discordUsername: data.discordUsername || "",
          commandName: data.commandName || "",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) =>
      prev ? { ...prev, [name]: value } : prev
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess("");
    setError("");
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !profile) return;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        telegramUsername: profile.telegramUsername,
        discordUsername: profile.discordUsername,
        commandName: profile.commandName,
      });
      setSuccess("Профиль обновлён!");
      setEditMode(false);
      setOriginalProfile(profile);
    } catch (err: any) {
      setError("Ошибка обновления профиля: " + err.message);
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    // Возвращаем прежние значения без перезагрузки
    setProfile(originalProfile);
    setEditMode(false);
    setSuccess("");
    setError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.profileCard}>
        {/* Если будет аватар - добавить сюда */}
        <div style={styles.avatarWrap}>
          <div style={styles.avatar}>
            {profile && profile.firstName
              ? profile.firstName[0].toUpperCase()
              : "?"}
          </div>
        </div>

        <h2 style={styles.userName}>
          {profile ? `${profile.firstName} ${profile.lastName}` : "Загрузка..."}
        </h2>
        <div style={styles.userRole}>Студент</div>

        <form onSubmit={handleSave} style={{ width: "100%" }}>
          <ProfileField
            label="Имя"
            name="firstName"
            value={profile?.firstName || ""}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Фамилия"
            name="lastName"
            value={profile?.lastName || ""}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Telegram"
            name="telegramUsername"
            value={profile?.telegramUsername || ""}
            editMode={editMode}
            onChange={handleChange}
            placeholder="@username"
          />
          <ProfileField
            label="Discord"
            name="discordUsername"
            value={profile?.discordUsername || ""}
            editMode={editMode}
            onChange={handleChange}
            placeholder="username#0000"
          />
          <ProfileField
            label="Название команды"
            name="commandName"
            value={profile?.commandName || ""}
            editMode={editMode}
            onChange={handleChange}
          />

          {editMode ? (
            <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
              <button type="submit" disabled={isSaving} style={styles.button}>
                {isSaving ? "Сохраняю..." : "Сохранить"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              type="button"
              style={styles.button}
              onClick={() => setEditMode(true)}
            >
              Редактировать
            </button>
          )}
        </form>

        {success && <div style={{ color: "#22c55e", marginTop: 14 }}>{success}</div>}
        {error && <div style={{ color: "#ef4444", marginTop: 14 }}>{error}</div>}
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  name,
  editMode,
  onChange,
  type = "text",
  placeholder = "",
}: any) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", marginBottom: 5, color: "#566F9E", fontWeight: 500 }}>
        {label}
      </label>
      {editMode ? (
        <input
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #bcc9df",
            borderRadius: 8,
            fontSize: 16,
            background: "#f6f8fc",
            color: "#222",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        />
      ) : (
        <div style={{
          background: "#f6f8fc",
          borderRadius: 8,
          padding: "12px",
          minHeight: 40,
          fontSize: 16,
          color: value ? "#222" : "#9ca3af",
          border: "1px solid #ececec"
        }}>
          {value || <span style={{ color: "#9ca3af" }}>Не указано</span>}
        </div>
      )}
    </div>
  );
}

const styles = {
   page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",
    fontFamily: "Inter, sans-serif"
  },
  profileCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "36px 32px",
    boxShadow: "0 6px 28px rgba(56,86,164,0.10)",
    width: 400,
    maxWidth: "95vw",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  avatarWrap: {
    marginBottom: 12,
    marginTop: -16,
  },
  avatar: {
    width: 70,
    height: 70,
    background: "#e6eefe",
    color: "#2563eb",
    borderRadius: "50%",
    fontSize: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    boxShadow: "0 2px 8px #2563eb22",
  },
  userName: {
    margin: "0 0 6px 0",
    fontSize: 26,
    fontWeight: 600 as const,
    color: "#22356f",
    textAlign: "center" as const,
  },
  userRole: {
    fontSize: 14,
    color: "#7d90b1",
    marginBottom: 20,
    textAlign: "center" as const,
  },
  button: {
    padding: "12px 32px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600 as const,
    cursor: "pointer",
    marginRight: 0,
    marginTop: 8,
    boxShadow: "0 2px 8px #2563eb22",
    transition: "background 0.18s",
  },
  cancelButton: {
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#e5e7eb",
    color: "#222",
    fontSize: 16,
    fontWeight: 600 as const,
    cursor: "pointer",
    marginLeft: 5,
    marginTop: 8,
    transition: "background 0.18s",
  },
};
