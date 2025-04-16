export const PAGES = {
  AUTH: {
    STUDENT: "/",
    STUDENT_THANKS: "/auth/student-thanks",
  },
  DASHBOARD: {
    INDEX: "/",
    PROFILE: "/profile",
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
