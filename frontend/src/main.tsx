import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import moment from "moment";
import "moment/dist/locale/ru";

import "@master/css";

import "./assets/scss/index.scss";

import { PAGES } from "./constants/pages.ts";
import { PrivateRoute } from "./PrivateRoute";

import CTFLevelPage from "./pages/CTFLevelPage";
import CTFPage from "./pages/CTFPage";
// import CTFAdminPage from "./pages/CTFAdminPage";
import CTFLeaderboardPage from "./pages/CTFLeaderboardPage";
import CTFUserStatsPage from "./pages/CTFUserStatsPage";

import { AppLayout } from "./layouts/AppLayout.tsx";
import StudentLoginPage from "./pages/students/auth/StudentLoginPage";
import  {IndexPage} from "./pages/IndexPage.tsx";
import { StudentSingleCoursesPage } from "./pages/students/StudentSingleCoursesPage.tsx";
import { StudentMentorCoursesPage } from "./pages/students/StudentMentorCoursesPage.tsx";
import { StudentSchedulesPage } from "./pages/students/StudentSchedulesPage.tsx";

import { StudentProgressPage } from "./pages/students/StudentProgressPage.tsx";
import { StudentCoursesPage } from "./pages/students/StudentCoursesPage.tsx";
import  ProfilePage  from "./pages/ProfilePage.tsx";
import { StudentCompetitionsPage } from "./pages/students/StudentCompetitionsPage.tsx";
import { StudentCourseLessons } from "./pages/students/StudentCourseLessons.tsx";
import { StudentAuthRegistrationPage } from "./pages/students/auth/StudentAuthRegistrationPage.tsx";
import CTFTestWrite from "./pages/ctf/CTFTestWrite";
import CTFDoPage from "./pages/CTFDoPage";


moment.locale("ru");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
        <Route
            element={<StudentAuthRegistrationPage />}
            path={PAGES.AUTH.STUDENT}
          />
        <Route path="/ctf/levels/:id" element={<CTFLevelPage />} />
        <Route path="/ctf" element={<CTFPage />} />
        <Route path="/ctf/leaderboard" element={<CTFLeaderboardPage />} />
        <Route path="/ctf/user/:uid" element={<CTFUserStatsPage />} />
        <Route path="/ctf/do/:component" element={<CTFDoPage />} />
        {/* <Route path="/ctf/admin" element={<CTFAdminPage />} /> */}

        <Route path="/ctf/test-write" element={<CTFTestWrite />}/>
        <Route path="/login" element={<StudentLoginPage />} />
        <Route element={<AppLayout />}>
        <Route path="/portal" element={<IndexPage />} />
        <Route path="/portal" element={<PrivateRoute><IndexPage /></PrivateRoute>}/>
          
            

            <Route
              path={PAGES.DASHBOARD.PROFILE}
              element={<ProfilePage />}
            />
            <Route path={PAGES.DASHBOARD.STUDENTS.INDEX}>
              <Route
                path={PAGES.DASHBOARD.STUDENTS.COURSES}
                element={<StudentCoursesPage />}
              />
              <Route
                path={PAGES.DASHBOARD.STUDENTS.COURSE_LESSONS}
                element={<StudentCourseLessons />}
              />
              <Route
                path={PAGES.DASHBOARD.STUDENTS.SCHEDULES}
                element={<StudentSchedulesPage />}
              />
              <Route
                path={PAGES.DASHBOARD.STUDENTS.PROGRESS}
                element={<StudentProgressPage />}
              />
              <Route
                path={PAGES.DASHBOARD.STUDENTS.COMPETITIONS}
                element={<StudentCompetitionsPage />}
              />
            </Route>
            <Route path={PAGES.DASHBOARD.COURSES.INDEX}>
              <Route
                path={PAGES.DASHBOARD.COURSES.MENTOR}
                element={<StudentMentorCoursesPage />}
              />
              <Route
                path={PAGES.DASHBOARD.COURSES.SINGLE_COURSES}
                element={<StudentSingleCoursesPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);
