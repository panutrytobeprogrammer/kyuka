import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React from "react";

type Props = {};

function DataTable({}: Props) {
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
    {
      key: "5",
      name: "Emily Chen",
      role: "Product Manager",
      status: "Active",
    },
    {
      key: "6",
      name: "Michael Rodriguez",
      role: "UX Designer",
      status: "Active",
    },
    {
      key: "7",
      name: "Sarah Johnson",
      role: "QA Engineer",
      status: "Paused",
    },
    {
      key: "8",
      name: "David Kim",
      role: "Backend Developer",
      status: "Vacation",
    },
    {
      key: "9",
      name: "Emily Chen",
      role: "Product Manager",
      status: "Active",
    },
    {
      key: "10",
      name: "James Wilson",
      role: "Frontend Developer",
      status: "Active",
    },
    {
      key: "11",
      name: "Sophie Taylor",
      role: "DevOps Engineer",
      status: "Paused",
    },
    {
      key: "12",
      name: "Daniel Lee",
      role: "Mobile Developer",
      status: "Active",
    },
    {
      key: "13",
      name: "Rachel Martinez",
      role: "Data Scientist",
      status: "Vacation",
    },
    {
      key: "14",
      name: "Thomas Anderson",
      role: "Security Engineer",
      status: "Active",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];

  return (
    <Table
      classNames={{
        wrapper: "bg-box",
        th: "bg-item",
      }}
      isVirtualized
      isHeaderSticky
      maxTableHeight={600}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} className="text-gray-700">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className="text-gray-200">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default DataTable;
