import { ICourse, SubLessonItemType } from "../../types/course";

export const nodeJsCourse: ICourse = {
  id: 1,
  name: "Руководство по Node.js",
  description: "Полный мини-курс по Node.js: основы платформы, работа с модулями, создание серверов и практические примеры.",
  imageUrl: "https://placehold.co/200?text=NodeJs",
  lessons: [
    {
      id: 1,
      title: "Глава 1. Введение в Node.js",
      subLessons: [
        {
          id: 1,
          title: "Что такое Node.js?",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Node.js — это среда выполнения JavaScript вне браузера, построенная на движке V8. Она позволяет создавать масштабируемые серверные приложения на JavaScript."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
            },
            {
              id: 3,
              type: SubLessonItemType.VIDEO,
              videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4"
            }
          ]
        },
        {
          id: 2,
          title: "Установка Node.js",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Node.js легко установить с официального сайта https://nodejs.org/. Доступны версии для Windows, Mac и Linux."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/600x300?text=Node.js+Installer"
            }
          ]
        },
        {
          id: 3,
          title: "Первое приложение",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Создайте файл hello.js с кодом: console.log('Hello, Node.js!'); и запустите командой: node hello.js"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=console.log('Hello, Node.js!')"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Глава 2. Модули и работа с файлами",
      subLessons: [
        {
          id: 1,
          title: "Что такое модули?",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Модули в Node.js позволяют разделять код на отдельные файлы. Импорт модуля: const fs = require('fs');"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x150?text=Node.js+Modules"
            }
          ]
        },
        {
          id: 2,
          title: "Работа с файловой системой (FS)",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Модуль 'fs' позволяет читать и записывать файлы. Пример: fs.readFileSync('file.txt', 'utf8');"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
            }
          ]
        },
        {
          id: 3,
          title: "Установка пакетов через npm",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "NPM — пакетный менеджер для Node.js. Установить пакет: npm install express"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Глава 3. Создание простого сервера",
      subLessons: [
        {
          id: 1,
          title: "Простейший HTTP-сервер",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text:
                "Пример простого сервера на Node.js:\n\n" +
                "const http = require('http');\n" +
                "const server = http.createServer((req, res) => {\n" +
                "  res.end('Hello from Node.js server!');\n" +
                "});\n" +
                "server.listen(3000);"
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=Simple+Node.js+Server"
            }
          ]
        },
        {
          id: 2,
          title: "Использование Express.js",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text:
                "Express — популярный фреймворк для Node.js.\n\n" +
                "Установка: npm install express\n" +
                "Пример кода:\n" +
                "const express = require('express');\n" +
                "const app = express();\n" +
                "app.get('/', (req, res) => res.send('Hello Express!'));\n" +
                "app.listen(3000);"
            },
            {
              id: 2,
              type: SubLessonItemType.VIDEO,
              videoUrl: "https://www.youtube.com/embed/L72fhGm1tfE"
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Глава 4. Практика и примеры",
      subLessons: [
        {
          id: 1,
          title: "Пример приложения TODO",
          items: [
            {
              id: 1,
              type: SubLessonItemType.TEXT,
              text: "Попробуйте реализовать консольное приложение TODO: программа, которая принимает команды для добавления, просмотра и удаления задач."
            },
            {
              id: 2,
              type: SubLessonItemType.IMAGE,
              imageUrl: "https://placehold.co/400x180?text=TODO+App"
            }
          ]
        }
      ]
    }
  ]
};
