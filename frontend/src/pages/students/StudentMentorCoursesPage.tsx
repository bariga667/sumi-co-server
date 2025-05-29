import { useState, useEffect } from "react";
import {
  DataTable,
  DataTableRowToggleEvent,
  DataTableExpandedRows,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

interface Representative {
  name: string;
}

interface Customer {
  id: number;
  name: string;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
}

export const CustomerService = {
  getData() {
    return [
      {
        id: 1000,
        name: "Frontend base courses",
        company: "Benton, John B Jr",
        date: "2025-09-13",
        status: "unqualified",
        verified: true,
        activity: 17,
        representative: {
          name: "Sherkhan",
        },
      },
      {
        id: 1001,
        name: "Design courses",
        company: "Chanay, Jeffrey A Esq",
        date: "2025-02-09",
        status: "proposal",
        verified: true,
        activity: 0,
        representative: {
          name: "Kadir",
        },
      },
      {
        id: 1002,
        name: "Android (Kotlin) mini courses",
        company: "Chemel, James L Cpa",
        date: "2025-05-13",
        status: "qualified",
        verified: false,
        activity: 63,
        representative: {
          name: "Adil",
        },
      },
    ];
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },
};

export function StudentMentorCoursesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | Customer[]
  >([]);

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => setCustomers(data));
  }, []);

  const headerTemplate = (data: Customer) => {
    return (
      <>
        <span className="vertical-align-middle ml-2 font-bold line-height-3">
          {data.representative.name}
        </span>
      </>
    );
  };

  const statusBodyTemplate = (rowData: Customer) => {
    return (
      <Tag
        value={rowData.status}
        severity={getSeverity(rowData.status)}
      />
    );
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };

  return (
    <div className="student-mentor-courses-page card w:full">
      <DataTable
        value={customers}
        rowGroupMode="subheader"
        groupRowsBy="representative.name"
        sortMode="single"
        sortField="representative.name"
        sortOrder={1}
        expandableRowGroups
        expandedRows={expandedRows}
        onRowToggle={(e: DataTableRowToggleEvent) => setExpandedRows(e.data)}
        rowGroupHeaderTemplate={headerTemplate}
      >
        <Column
          field="id"
          header="ID"
        />

        <Column
          field="name"
          header="Названия курса"
        />

        <Column
          field="company"
          header="Company"
        />

        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
        />

        <Column
          field="date"
          header="Date"
        />
      </DataTable>
    </div>
  );
}
