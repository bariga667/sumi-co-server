import { ICourse, SubLessonItemType } from "../../types/course";

export const gitCourse: ICourse = {
  id: 3,
  name: "Мини-курс: Основы Git",
  description: "Узнайте, как работать с системой контроля версий Git: инициализация репозитория, коммиты, работа с удалёнными репозиториями.",
  imageUrl: "https://placehold.co/200?text=Git",
  lessons: [
    {
      id: 1,
      title: "Глава 1. Введение в Git",
      subLessons: [
        {
          id: 1,
          title: "Что такое Git?",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Git — это распределённая система контроля версий. Позволяет отслеживать изменения и работать над проектом в команде."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
            },
            {
              id: 3,
              type: SubLessonItemType.VIDEO,
              videoUrl: "https://www.youtube.com/embed/USjZcfj8yxE"
            }
          ]
        },
        {
          id: 2,
          title: "Установка Git",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Скачайте установщик Git с https://git-scm.com/ и следуйте инструкциям для вашей ОС."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/600x300?text=Git+Installer"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Глава 2. Основные команды",
      subLessons: [
        {
          id: 1,
          title: "git init, git clone, git status",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "git init — инициализация репозитория, git clone — клонирование, git status — статус файлов."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=git+init+clone+status"
            }
          ]
        },
        {
          id: 2,
          title: "git add, git commit, git push",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "git add — добавить файлы в индекс, git commit — сохранить изменения, git push — отправить на сервер."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=git+add+commit+push"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Глава 3. Ветвление и слияние",
      subLessons: [
        {
          id: 1,
          title: "Работа с ветками",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Команды для работы с ветками: git branch, git checkout, git merge."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=git+branch+checkout+merge"
            }
          ]
        }
      ]
    }
  ]
};