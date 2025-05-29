import { ICourse, SubLessonItemType } from "../../types/course";

export const linuxCourse: ICourse = {
  id: 2,
  name: "Мини-курс: Введение в Linux",
  description: "Быстрый старт в Linux: история, базовые команды, файловая система и практика для новичков.",
  imageUrl: "https://placehold.co/200?text=Linux",
 lessons: [
    {
      id: 1,
      title: "Глава 1. Введение в Linux",
      subLessons: [
        {
          id: 1,
          title: "Что такое Linux?",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Linux — это семейство операционных систем с открытым исходным кодом, основанных на ядре Linux. Широко используется на серверах и в разработке."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png"
            },
            {
              id: 3,
              type: SubLessonItemType.VIDEO,
              videoUrl: "https://www.youtube.com/embed/IVquJh3DXUA"
            }
          ]
        },
        {
          id: 2,
          title: "Установка Linux",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Для установки выберите дистрибутив (например, Ubuntu, Fedora) и скачайте ISO-образ с официального сайта. Запишите образ на флешку, загрузитесь с неё и следуйте инструкциям установщика."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/600x300?text=Linux+Installation"
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
          title: "Навигация по файловой системе",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Основные команды: cd, ls, pwd. Пример: cd /home/user"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=cd+ls+pwd"
            }
          ]
        },
        {
          id: 2,
          title: "Работа с файлами",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Команды для работы с файлами: touch, cp, mv, rm. Пример: touch file.txt"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=touch+cp+mv+rm"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Глава 3. Пользователи и права",
      subLessons: [
        {
          id: 1,
          title: "Пользователь и суперпользователь (root)",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "В Linux есть обычные пользователи и суперпользователь (root), который имеет полный доступ к системе."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=User+vs+Root"
            }
          ]
        },
        {
          id: 2,
          title: "Права доступа к файлам",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Команда chmod позволяет изменять права доступа. Пример: chmod 755 script.sh"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=chmod+755"
            }
          ]
        }
      ]
    }
  ]
};