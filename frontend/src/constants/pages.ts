export const PAGES = {
  AUTH: {
    STUDENT: "/",
    STUDENT_THANKS: "/auth/student-thanks",
  },
  CTF: {
    INDEX: "/ctf",
    LEVEL: "/ctf/levels/:id",
    LEADERBOARD: "/ctf/leaderboard",
    USER_STATS: "/ctf/user/:uid",
    DO: "/ctf/do/:component",
    ADMIN: "/ctf/admin",
    SECRET_FLAG: "/secret-flag-88",
    TEST_WRITE: "/ctf/test-write",
  },
  DASHBOARD: {
    INDEX: "/",
    PROFILE: "/profile",
    PORTAL: "/portal", 
    STUDENTS: {
      INDEX: "/students",
      COURSES: "/students/courses",
      COURSE_LESSONS: "/students/courses/lessons/:lessonId",
      PROGRESS: "/students/progress",
      SCHEDULES: "/students/schedules",
      SUBJECT_GRADES: "/students/subject-grades",
      COMPETITIONS: "/students/competitions",
    },
    COURSES: {
      INDEX: "/courses",
      MENTOR: "/courses/mentor",
      SINGLE_COURSES: "/courses/single-courses",
    },
  },
};
