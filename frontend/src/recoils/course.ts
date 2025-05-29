import { atom } from "recoil";
import { ICourse } from "../types/course";
import { coursesData } from "./courses"; // или "./courses/index"

export const coursesRecoilState = atom<ICourse[]>({
  key: "courses",
  default: coursesData,
});
