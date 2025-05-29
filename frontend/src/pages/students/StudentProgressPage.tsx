import { FC } from "react";
import Start_1 from "../../assets/svg/Start_1.png";
import Design_2 from "../../assets/svg/Design_2.png";
import Function_3 from "../../assets/svg/Function_3.png";
import FixBug_4 from "../../assets/svg/FixBug_4.png";
import Support_5 from "../../assets/svg/Support_5.png";
import Like_6 from "../../assets/svg/Like_6.png";
import Update_7 from "../../assets/svg/Update_7.png";
import Last from "../../assets/svg/Last.png";

export interface ProgressItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const StudentProgressPage: FC = () => {
  const progressItems: ProgressItem[] = [
    {
      id: 1,
      title: "Начало проекта",
      description:
        "Запуск начальной стадии проекта с планированием и установкой целей.",
      imageUrl: Start_1,
    },
    {
      id: 2,
      title: "Разработка дизайна",
      description: "Создание макетов и прототипов для будущего приложения.",
      imageUrl: Design_2,
    },
    {
      id: 3,
      title: "Разработка функционала",
      description: "Программирование основных функций и модулей приложения.",
      imageUrl: Function_3,
    },
    {
      id: 4,
      title: "Тестирование",
      description: "Проверка работоспособности и устранение ошибок.",
      imageUrl: FixBug_4,
    },
    {
      id: 5,
      title: "Запуск и поддержка",
      description:
        "Выпуск приложения в продакшен и обеспечение технической поддержки.",
      imageUrl: Support_5,
    },
    {
      id: 6,
      title: "Сборка отзывов",
      description: "Сбор отзывов от пользователей для улучшения приложения.",
      imageUrl: Like_6,
    },
    {
      id: 7,
      title: "Обновление интерфейса",
      description: "Внесение изменений в дизайн и интерфейс на основе отзывов.",
      imageUrl: Update_7,
    },
    {
      id: 8,
      title: "Оптимизация производительности",
      description:
        "Улучшение производительности приложения для быстрого и плавного использования.",
      imageUrl: Last,
    },
  ];

  return (
    <div className="progress-page p:40 w:full">
      <h3 className="title f:22 font:bold f:#566F9E padding-bottom:10 border-bottom:1|solid|#566F9E margin-right:100 margin-bottom:20">
        Достижения
      </h3>

      <p>
        Добро пожаловать на страницу ваших достижений! Здесь собраны все ваши
        награды и признания за ваше усердие и успехи. Продолжайте учиться и
        достигать новых целей!
      </p>

      <div className="items mt:40 flex flex:wrap gap:40">
        {progressItems.map((item) => (
          <div
            key={item.id}
            className="flex flex:col align-items:center justify-content:center w:300 h:400 bg:#fff r:10 beautiful-shadow"
          >
            <img
              src={item.imageUrl}
              alt="progress item image"
              className="r:8"
              style={{ width: 200, height: 200, objectFit: "contain" }}
            />


            <h3 className="text-align:center mt:30 mb:15">{item.title}</h3>

            <p className="text-align:center f:14">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
