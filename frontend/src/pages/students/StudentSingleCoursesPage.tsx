import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export interface SingleCourse {
  id: number;
  name: string;
  teacher: string;
  address: string;
  isOnline: boolean;
  onlineCount: number;
  date: string;
}

export function StudentSingleCoursesPage() {
  const [tableData] = useState<SingleCourse[]>([
    {
      id: 1,
      name: "Java Online Courses",
      teacher: "Adil",
      onlineCount: 15,
      address: "ГУГ 1024",
      isOnline: false,
      date: "2025-09-25 14:10",
    },
    {
      id: 2,
      name: "React base for 1 hour",
      teacher: "Binur",
      onlineCount: 10000,
      address: "-",
      isOnline: true,
      date: "2025-09-25 14:10",
    },
    {
      id: 3,
      name: "Kotlin",
      teacher: "Adil",
      address: "ГУГ 1024",
      isOnline: false,
      onlineCount: 90,
      date: "2025-09-25 14:10",
    },
    {
      id: 4,
      name: "Design",
      teacher: "Kadir",
      address: "-",
      isOnline: true,
      onlineCount: 13,
      date: "2025-09-25 14:10",
    },
    {
      id: 5,
      name: "Frontend",
      teacher: "Sherkhan",
      onlineCount: 9,
      address: "-",
      isOnline: true,
      date: "2025-09-25 14:10",
    },
  ]);

  return (
    <div className="single-courses-page w:full">
      <DataTable value={tableData}>
        <Column
          field="id"
          header="ID"
          sortable
        />

        <Column
          field="name"
          header="Названия предмета"
          sortable
        />

        <Column
          field="teacher"
          header="Учитель"
          sortable
        />

        <Column
          field="onlineCount"
          header="Количество участников"
          sortable
        />

        <Column
          field="address"
          header="Адресс"
          sortable
        />

        <Column
          field="isOnline"
          header="Тип встречи"
          body={(row: SingleCourse) => (
            <span>{row.isOnline ? "Онлайн" : "Оффлайн"}</span>
          )}
        />

        <Column
          field="date"
          header="Время начало"
          sortable
        />

        <Column
          header="Подлючиться"
          body={
            <div className="flex align-items:center justify-content:flex-end">
              <Button
                icon="pi pi-plus"
                rounded
                aria-label="Filter"
              />
            </div>
          }
        />
      </DataTable>
    </div>
  );
}
