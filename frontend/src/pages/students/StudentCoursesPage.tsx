import { FC } from "react";

import { useRecoilState } from "recoil";
import { coursesRecoilState as CoursesState } from "../../recoils/course.ts";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../constants/pages.ts";

export const StudentCoursesPage: FC = () => {
  const navigate = useNavigate();

  const [courses] = useRecoilState(CoursesState);

  return (
    <div className="student-courses-page p:40 w:full">
      <h3 className="title f:22 font:bold f:#566F9E padding-bottom:10 border-bottom:1|solid|#566F9E margin-right:100 margin-bottom:20">
        Курсы
      </h3>

      <p>
        Добро пожаловать на страницу ваших достижений! Здесь собраны все ваши
        награды и признания за ваше усердие и успехи. Продолжайте учиться и
        достигать новых целей!
      </p>

      <div className="items mt:40 flex flex:wrap gap:40">
        {courses.map((item) => (
          <div
            key={item.id}
            className="flex flex:col align-items:center justify-content:space-between w:275 h:300 bg:#fff beautiful-shadow box-shadow:none:hover transform:translateY(3px):hover ~all|100ms|ease-in r:10 p:20 cursor:pointer"
            onClick={() =>
              navigate(
                PAGES.DASHBOARD.STUDENTS.COURSE_LESSONS.replace(
                  ":lessonId",
                  item.id.toString(),
                ),
              )
            }
          >
            <img
              src={item.imageUrl}
              alt="progress item image"
              className="r:8"
            />

            <h3 className="text-align:center mt:10 f:18">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
