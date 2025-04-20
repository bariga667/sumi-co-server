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

// import CTFLevelPage from "./pages/CTFLevelPage";
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

import Level1SourceInspect from "./pages/ctf/Level1SourceInspect";
import Level2LocalStorage from "./pages/ctf/Level2LocalStorage";
import Level3CookieChallenge from "./pages/ctf/Level3CookieChallenge";
import Level4ConsoleTrap from "./pages/ctf/Level4ConsoleTrap";
import Level5XSS from "./pages/ctf/Level5XSS";
import Level6XSSBase64 from "./pages/ctf/Level6XSSBase64";
import Level7BypassLogin from "./pages/ctf/Level7BypassLogin";
import Level8Obfuscation from "./pages/ctf/Level8Obfuscation";
import SecretFlag88 from "./pages/ctf/SecretFlag88";
import Level9HiddenField from "./pages/ctf/Level9HiddenField";
import Level10CookieBypass from "./pages/ctf/Level10CookieBypass";

import CTFTestWrite from "./pages/ctf/CTFTestWrite";

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
        {/* <Route
         path="/ctf/:id" element={<CTFLevelPage />} 
        /> */}
        <Route
         path="/ctf/leaderboard" element={<CTFLeaderboardPage />} 
        />
        <Route
         path="/ctf" element={<CTFPage />} 
        />
        {/* <Route 
          path="/ctf/admin" element={<CTFAdminPage />} 
        /> */}
        <Route
         path="/ctf/user/:uid" element={<CTFUserStatsPage />} 
        />



          <Route
          path="/ctf/levels/1" element={<Level1SourceInspect />} 
          />
          <Route
           path="/ctf/levels/2" element={<Level2LocalStorage />} 
          />
          <Route
           path="/ctf/levels/3" element={<Level3CookieChallenge />} 
          />
          <Route
           path="/ctf/levels/4" element={<Level4ConsoleTrap />} 
          />
          <Route
           path="/ctf/levels/5" element={<Level5XSS />} 
          />
          <Route
           path="/ctf/levels/6" element={<Level6XSSBase64 />} 
          />
          <Route
           path="/ctf/levels/7" element={<Level7BypassLogin />} 
          />
          <Route
           path="/ctf/levels/8" element={<Level8Obfuscation />} 
          />
          <Route
           path="/secret-flag-88" element={<SecretFlag88 />} 
          />
          <Route
           path="/ctf/levels/9" element={<Level9HiddenField />} 
          />
          <Route
           path="/ctf/levels/10" element={<Level10CookieBypass />} 
          />
          <Route
           path="/ctf/test-write" element={<CTFTestWrite />} 
          />





          
          <Route path="/login" element={<StudentLoginPage />} />

            <Route
             element={<AppLayout />}>
            <Route
             path="/portal" element={<IndexPage />} 
             />


          <Route
            path="/portal"
            element={
              <PrivateRoute>
                <IndexPage />
              </PrivateRoute>
            }
          />


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
