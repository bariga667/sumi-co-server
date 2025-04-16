export enum SubLessonItemType {
  TEXT,
  IMAGE,
  VIDEO,
}

export interface ISubLessonItem {
  id: number;
  type: SubLessonItemType;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface ISubLesson {
  id: number;
  title: string;
  items: ISubLessonItem[];
}

export interface ILesson {
  id: number;
  title: string;
  subLessons: ISubLesson[];
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  lessons: ILesson[];
}
