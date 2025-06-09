import { FC, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { useRecoilState } from "recoil";

import { userRecoilState } from "../../recoils/user.ts";
import { Dialog } from "primereact/dialog";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

enum CommandRole {
  Member,
  Lider,
}

interface ICommandUser {
  id: number;
  ssoUserId: number;
  firstName: string;
  direction: number;
  telegramUsername: string;
  discordUsername: string;
  role: CommandRole;
}

export const StudentCompetitionsPage: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<Array<string>>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    setItems([...Array(10).keys()].map((item) => event.query + "-" + item));
  };

  const [user] = useRecoilState(userRecoilState);

  const commandUsers: ICommandUser[] = [
    {
      id: 1,
      ssoUserId: 12,
      firstName: "Адиль",
      direction: 1,
      telegramUsername: "adil1",
      discordUsername: "ajore",
      role: CommandRole.Lider,
    },
    {
      id: 2,
      ssoUserId: 14,
      firstName: "Қыдыржан",
      direction: 1,
      telegramUsername: "kidyr",
      discordUsername: "kidyr",
      role: CommandRole.Member,
    },
    {
      id: 3,
      ssoUserId: 15,
      firstName: "Бинұр",
      direction: 1,
      telegramUsername: "biko",
      discordUsername: "biko",
      role: CommandRole.Member,
    },
    {
      id: 4,
      ssoUserId: 123,
      firstName: "Ерасыл",
      direction: 1,
      telegramUsername: "erekosh",
      discordUsername: "erekosh",
      role: CommandRole.Member,
    },
    {
      id: 5,
      ssoUserId: 78,
      firstName: "Мирас",
      direction: 1,
      telegramUsername: "miposhka",
      discordUsername: "miposhka",
      role: CommandRole.Member,
    },
    {
      id: 6,
      ssoUserId: 24,
      firstName: "Мерейбек",
      direction: 1,
      telegramUsername: "mereikek",
      discordUsername: "mereikek",
      role: CommandRole.Member,
    },
  ];

  const footerContent = (
    <div>
      <Button
        label="Сохранить"
        icon="pi pi-save"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const headerElement = (
    <div className="flex justify-content:space-between mt:10px">
      <div className="flex">
        <FloatLabel>
          <label
            htmlFor="username"
            className="font:regular"
          >
            Названия команды
          </label>
          <InputText
            id="username"
            value={user ? user.commandName : ''}
            placeholder="Названия команды"
          />
        </FloatLabel>

        <Button
          icon="pi pi-save"
          label="Сохранить"
          className="ml:15"
        />
      </div>

      <Button
        icon="pi pi-user-plus"
        label="Добавить"
        onClick={() => setVisible(true)}
      />
    </div>
  );

  return (
    <div className="student-competitions-page w:full">
      <Dialog
        header="Добавить участника"
        visible={visible}
        className="w:400"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <div>
          <p className="mb:10">
            Выведите имя участника или телеграмм, дискорт:
          </p>

          <AutoComplete
            inputId="ac"
            value={value}
            suggestions={items}
            completeMethod={search}
            className="w:full"
            inputClassName="w:full"
            placeholder="Имя участника"
            onChange={(e) => setValue(e.value)}
          />
        </div>
      </Dialog>

      <DataTable
        value={commandUsers}
        header={headerElement}
      >
        <Column
          field="id"
          header="ID"
          sortable
        />

        <Column
          field="ssoUserId"
          header="SSO ID"
          sortable
        />

        <Column
          field="firstName"
          header="Имя"
          sortable
        />

        <Column
          field="direction"
          header="Направления"
          sortable
        />

        <Column
          field="telegramUsername"
          header="Telegram"
          sortable
          body={(data: ICommandUser) => {
            return (
              <a
                href={`https://t.me/${data.telegramUsername}`}
                className="text:none text:underline:hover f:#566f9e"
              >
                @{data.telegramUsername}
              </a>
            );
          }}
        />

        <Column
          field="discordUsername"
          header="Discord"
          sortable
          body={(data: ICommandUser) => {
            return (
              <a
                href={`https://discordapp.com/users/${data.discordUsername}/`}
                className="text:none text:underline:hover f:#566f9e"
              >
                @{data.discordUsername}
              </a>
            );
          }}
        />

        <Column
          field="role"
          header="Роль"
          sortable
          body={(data: ICommandUser) => {
            return (
              <Badge
                value={CommandRole[data.role]}
                severity="success"
              />
            );
          }}
        />
      </DataTable>
    </div>
  );
};
