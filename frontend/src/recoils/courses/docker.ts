import { ICourse, SubLessonItemType } from "../../types/course";

export const dockerCourse: ICourse = {
  id: 4,
  name: "Мини-курс: Основы Docker",
  description: "Изучите контейнеризацию приложений, основы Docker, образы и контейнеры.",
  imageUrl: "https://placehold.co/200?text=Docker",
    lessons: [
    {
      id: 1,
      title: "Глава 1. Что такое Docker?",
      subLessons: [
        {
          id: 1,
          title: "Понятие контейнеризации",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Docker — это инструмент для создания, развертывания и управления контейнерами. Контейнеры позволяют изолировать приложения и их зависимости."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"
            },
            {
              id: 3,
              type: SubLessonItemType.VIDEO,
              videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE"
            }
          ]
        },
        {
          id: 2,
          title: "Установка Docker",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Скачайте Docker Desktop с официального сайта https://www.docker.com/ и следуйте инструкциям для вашей ОС."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/600x300?text=Docker+Installer"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Глава 2. Основные команды Docker",
      subLessons: [
        {
          id: 1,
          title: "docker run, docker ps, docker stop",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "docker run — запуск контейнера, docker ps — просмотр работающих контейнеров, docker stop — остановка контейнера."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=docker+run+ps+stop"
            }
          ]
        },
        {
          id: 2,
          title: "Работа с образами",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Команды: docker pull — загрузка образа, docker images — список образов, docker rmi — удаление образа."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=docker+pull+images+rmi"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Глава 3. Создание Docker-контейнера",
      subLessons: [
        {
          id: 1,
          title: "Dockerfile",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Dockerfile — файл с инструкциями для сборки образа. Пример:\nFROM node:18\nCOPY . /app\nRUN npm install\nCMD [\"node\", \"app.js\"]"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=Dockerfile+Example"
            }
          ]
        },
        {
          id: 2,
          title: "Сборка и запуск контейнера",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "docker build -t myapp . — сборка образа\n\ndocker run myapp — запуск контейнера"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=docker+build+run"
            }
          ]
        }
      ]
    }
  ]
};