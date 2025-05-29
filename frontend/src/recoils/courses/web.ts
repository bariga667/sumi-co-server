import { ICourse, SubLessonItemType } from "../../types/course";

export const webCourse: ICourse = {
  id: 5,
  name: "Мини-курс: Web для начинающих",
  description: "Основы HTML, CSS и первых шагов в создании веб-страниц.",
  imageUrl: "https://placehold.co/200?text=Web",
 lessons: [
    {
      id: 1,
      title: "Глава 1. Что такое web?",
      subLessons: [
        {
          id: 1,
          title: "Краткое введение",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Web — это система, обеспечивающая доступ к гипертекстовым документам через интернет с помощью браузеров."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
            },
            {
              id: 3,
              type: SubLessonItemType.VIDEO,
              videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Глава 2. Основы HTML",
      subLessons: [
        {
          id: 1,
          title: "Структура HTML-документа",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "HTML — язык разметки, формирующий структуру страницы. Пример базового шаблона: <!DOCTYPE html><html><head><title>Заголовок</title></head><body>Контент</body></html>"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=HTML+Structure"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Глава 3. Основы CSS",
      subLessons: [
        {
          id: 1,
          title: "Что такое CSS?",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "CSS отвечает за оформление страниц: цвета, шрифты, отступы и многое другое."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Глава 4. Основы JavaScript",
      subLessons: [
        {
          id: 1,
          title: "JavaScript для начинающих",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "JavaScript — это язык программирования для создания интерактивных элементов на web-страницах. Пример: alert('Hello, world!');"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
            }
          ]
        }
      ]
    }
  ]
};