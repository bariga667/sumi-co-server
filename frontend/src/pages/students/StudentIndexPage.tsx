import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import { INavigationButton } from "../../types/pages";
import { PAGES } from "../../constants/pages.ts";
import Kurs from "../../assets/svg/online_course_separate.png";
import mentor from "../../assets/svg/mentor_schedule_separate.png";
import CTF from "../../assets/svg/Ctf_Platform.png";
import Board from "../../assets/svg/Lyder_Board.png";

export const StudentIndexPage: FC = () => {
  const navigate = useNavigate();

  const progressesItems = [
    {
      label: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      imageUrl: "https://placehold.co/65",
    },
    {
      label: "Consectetur adipisicing elit.",
      imageUrl: "https://placehold.co/65",
    },
    {
      label: "Solor sit amet, consectetur adipisicing",
      imageUrl: "https://placehold.co/65",
    },
  ];

  const navigationButtons: INavigationButton[] = [
    {
      headerLabel: "Самостоятельные работы",
      items: [
        {
          title: "Курс",
          descriptions:
            "Данный раздел предназначен для самостоятельного изучения ключевых тем курса. Здесь вы найдете видеоуроки, полезные материалы и интерактивные задания для практики. Осваивайте новые навыки в удобном для вас темпе и отслеживайте свой прогресс прямо в системе.",
          link: PAGES.DASHBOARD.STUDENTS.COURSES,
          imageUrl: Kurs,
          imageAlt: "",
        },
      ],
    },
    {
      headerLabel: "График менторов",
      items: [
        {
          title: "Запись",
          descriptions:
            "В этом разделе вы можете выбрать удобное время и записаться на индивидуальную консультацию с ментором. Получите ответы на вопросы, разберите сложные темы и получите ценные рекомендации для успешного обучения. Бронирование занимает всего пару кликов!",
          link: PAGES.DASHBOARD.COURSES.SINGLE_COURSES,
          imageUrl: mentor,
          imageAlt: "",
        },
      ],
    },
    {
      headerLabel: "SUMICTF",
      items: [
        {
          title: "CTF",
          descriptions:
            "Соревнуйся, взламывай, находи флаги и получай очки! С каждым этапом всё сложнее.",
          link: "/ctf",
          imageUrl: CTF,
          imageAlt: "CTF Logo",
        },
        {
          title: "Рейтинг участников",
          descriptions:
            "Смотри, кто в топе! Увидь свой прогресс и сравнивай очки с другими участниками.",
          link: "/ctf/leaderboard",
          imageUrl: Board,
          imageAlt: "Leaderboard",
        },
      ],
    },
  ];

  return (
    <div className="index-page flex justify-content:space-between gap-x:45 p:40">
      <div className="left">
        <div className="navigations-buttons">
          {navigationButtons.map((navigation, index) => (
            <div
              key={navigation.headerLabel}
              className={"navigation " + (index > 0 ? "margin-top:40" : "")}
            >
              <h3 className="title f:22 font:bold f:#566F9E padding-bottom:10 border-bottom:1|solid|#566F9E margin-right:100 margin-bottom:20">
                {navigation.headerLabel}
              </h3>

              <div className="items flex justify-content:space-between align-items:center gap-x:20">
                {navigation.items.map((item) => (
                  <div
                    key={item.title}
                    onClick={() => navigate(item.link)}
                    className="item flex bg:#fff beautiful-shadow box-shadow:none:hover r:6px overflow:hidden transform:translateY(3px):hover ~all|100ms|ease-in cursor:pointer"
                  >
                    <div className="left w:160 h:160">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        className="w:135 h:160"
                      />
                    </div>

                    <div className="right">
                      <h4 className="border-bottom:1|solid|#21242726 padding:15 f:18">
                        {item.title}
                      </h4>

                      <p className="padding:15">{item.descriptions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right">
        <h3 className="margin-bottom:2.3rem">Достижения</h3>

        <div className="progresses flex flex:column gap-y:20 margin-bottom:20 w:300px">
          {progressesItems.map((progress) => (
            <div
              key={progress.label}
              className="flex bg:white justify-content:space-between align-items:center beautiful-shadow r:6px overflow:hidden"
            >
              <div className="left w:70 h:70">
                <img
                  src={progress.imageUrl}
                  alt="progress, image, url"
                  className="w:70 h:70"
                />
              </div>

              <div className="right w:full padding:15">
                <p>{progress.label}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          label="Все достижения"
          className="w:300px"
          onClick={() => navigate(PAGES.DASHBOARD.STUDENTS.PROGRESS)}
        />
      </div>
    </div>
  );
};
