import { atom } from "recoil";
import { ICourse, SubLessonItemType } from "../types/course.ts";

export const coursesRecoilState = atom<ICourse[]>({
  key: "courses",
  default: [
    {
      id: 1,
      name: "Руководство по Node.js",
      description:
        "основы, обработка запросов, цикл событий, создание серверных и десктопных приложений.",
      imageUrl: "https://placehold.co/200",
      lessons: [
        {
          id: 1,
          title: "Глава 1. Введение в Node.js",
          subLessons: [
            {
              id: 1,
              title: "Что такое Node.js. Начало работы",
              items: [
                {
                  id: 1,
                  type: SubLessonItemType.TEXT,
                  text: "Node.js представляет среду выполнения кода на JavaScript, которая построена на основе движка JavaScript Chrome V8, который позволяет транслировать вызовы на языке JavaScript в машинный код. Node.js прежде всего предназначен для создания серверных приложений на языке JavaScript. Хотя также существуют проекты по написанию десктопных приложений (Electron) и даже по созданию кода для микроконтроллеров. Но прежде всего мы говорим о Node.js, как о платформе для создания веб-приложений.",
                },
                {
                  id: 83,
                  type: SubLessonItemType.TEXT,
                  text: "Особенностью Node.js является то, что Node.js использует один (основной) поток, который получает все запросы и управляет ими через очередь запросов (таким образом, Node.js является однопоточным сервером). Внутри этого потока выполняется так называемый цикл событий (event loop), который представляет собой цикл, который непрерывно проверяет запросы из очереди событий и обрабатывает события ввода и вывода.",
                },
                {
                  id: 63,
                  type: SubLessonItemType.TEXT,
                  text: "Если пользователь отправляет запрос на сервер Node.js, в цикле событий выполняется проверка, чтобы определить, требует ли следующий запрос блокирующей операции ввода или вывода (например, обращение к базе данных или файловой системе). Если нет, то запрос обрабатывается напрямую, и пользователю отправляется результат обработки.",
                },
                {
                  id: 73,
                  type: SubLessonItemType.TEXT,
                  text: "Установка",
                },
                {
                  id: 83,
                  type: SubLessonItemType.TEXT,
                  text: "Для загрузки перейдет на официальный сайт https://nodejs.org/en/. На главной странице мы сразу увидим две возможные опции для загрузки: самая последняя версия NodeJS и LTS-версия.",
                },
                {
                  id: 209,
                  type: SubLessonItemType.IMAGE,
                  imageUrl: "https://metanit.com/web/nodejs/pics/1.1.png",
                },
                {
                  id: 378,
                  type: SubLessonItemType.TEXT,
                  text: "Загрузим LTS-версию. В моем случае это версия 20.9.0. Для Windows установщик представляет файл с расширением msi. После запуска откроется программа установщика:",
                },
                {
                  id: 266,
                  type: SubLessonItemType.IMAGE,
                  imageUrl: "https://metanit.com/web/nodejs/pics/1.2.png",
                },
                {
                  id: 334,
                  type: SubLessonItemType.TEXT,
                  text: "После успешной установки вы можем ввести в командной строке/терминале команду node -v, и нам отобразится текущая версия node.js:",
                },
                {
                  id: 123,
                  type: SubLessonItemType.TEXT,
                  text: "Версии node.js для других операционных систем наряду с исходниками можно найти по адресу https://nodejs.org/en/download/",
                },
              ],
            },
            {
              id: 2,
              title: "Первое приложение",
              items: [],
            },
          ],
        },
        {
          id: 2,
          title: "Глава 2. Основы работы с Node.js",
          subLessons: [
            {
              id: 1,
              title: "Модули",
              items: [],
            },
            {
              id: 2,
              title: "Работа с модулями",
              items: [],
            },
            {
              id: 3,
              title: "Объект global и глобальные переменные",
              items: [],
            },
            {
              id: 4,
              title: "Передача параметров приложению",
              items: [],
            },
            {
              id: 5,
              title: "Пакетный менеджер npm и управление пакетами",
              items: [],
            },
            {
              id: 6,
              title: "Файл package.json и конфигурация проекта",
              items: [],
            },
            {
              id: 7,
              title: "Nodemon",
              items: [],
            },
          ],
        },
        {
          id: 3,
          title: "Глава 3. Сервер",
          subLessons: [
            {
              id: 1,
              title: "Создание сервера",
              items: [],
            },
            {
              id: 2,
              title: "Отправка файлов",
              items: [],
            },
            {
              id: 3,
              title: "Шаблоны",
              items: [],
            },
            {
              id: 4,
              title: "Получение данных от клиента",
              items: [],
            },
            {
              id: 5,
              title: "Отправка форм",
              items: [],
            },
          ],
        },
      ],
    },
  ],
});
