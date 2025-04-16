import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { coursesRecoilState } from "../../recoils/course.ts";
import { IoMdArrowDropright } from "react-icons/io";
import {
  ILesson,
  ISubLesson,
  ISubLessonItem,
  SubLessonItemType,
} from "../../types/course.ts";

type routerParams = {
  lessonId: string;
};

interface ISelectedLesson {
  lessonId: number;
  subLessonId: number;
}

const renderItem = (item: ISubLessonItem) => {
  if (item.type === SubLessonItemType.TEXT) {
    return <p>{item.text}</p>;
  } else if (item.type === SubLessonItemType.IMAGE) {
    return (
      <div className="flex justify-content:center align-items:center">
        <img
          src={item.imageUrl}
          alt="course image"
        />
      </div>
    );
  } else if (item.type === SubLessonItemType.VIDEO) {
    return (
      <iframe
        id="video-iframe"
        className="w:full h:auto"
        src={item.videoUrl}
      ></iframe>
    );
  }
};

export const StudentCourseLessons: FC = () => {
  const { lessonId } = useParams() as routerParams;

  const [courses] = useRecoilState(coursesRecoilState);

  const [selectedLessonIndex, setSelectedLessonIndex] =
    useState<ISelectedLesson>({
      lessonId: 1,
      subLessonId: 1,
    });

  const course = courses.find((item) => item.id === parseInt(lessonId));

  const selectedLesson = useMemo<ISubLesson>(
    () =>
      (
        course?.lessons.find(
          (lesson) => lesson.id === selectedLessonIndex.lessonId,
        ) as ILesson
      ).subLessons.find(
        (sub) => sub.id === selectedLessonIndex.subLessonId,
      ) as ISubLesson,
    [
      course?.lessons,
      selectedLessonIndex.lessonId,
      selectedLessonIndex.subLessonId,
    ],
  );

  return (
    <div className="student-course-lessons w:full p:35">
      <div className="info flex align-items:center mb:25px">
        <img
          src="https://placehold.co/55"
          alt="course"
          className="round"
        />

        <div className="ml:15 text">
          <h3 className="mb:5">{course?.name}</h3>
          <p>{course?.description}</p>
        </div>
      </div>

      <div className="content flex justify-content:space-between w:full">
        <div className="flex flex:col gap:40 w:20% bg:#fff p:20 r:6 beautiful-shadow">
          {course?.lessons.map((lesson) => (
            <div
              className="lesson w:full"
              key={lesson.id}
            >
              <p className="w:full f:#566f9e f:bold uppercase border-bottom:2|solid|#566f9e pb:5 mb:20">
                {lesson.title}
              </p>

              <div className="flex flex:col gap:15">
                {lesson.subLessons.map((sub) => (
                  <div
                    className="text:underline:hover cursor:pointer"
                    onClick={() =>
                      setSelectedLessonIndex({
                        lessonId: lesson.id,
                        subLessonId: sub.id,
                      })
                    }
                  >
                    <IoMdArrowDropright color="#566f9e" />
                    {sub.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w:78% bg:#fff p:30 r:6 h:full beautiful-shadow">
          <h1 className="mb:40">{selectedLesson.title}</h1>

          <div className="items flex flex:col gap:35">
            {selectedLesson.items.map((item) => (
              <div key={item.id}>{renderItem(item)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
