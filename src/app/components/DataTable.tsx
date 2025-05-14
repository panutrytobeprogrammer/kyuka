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
import { TransactionData, TripData } from "../types";

type Props = {
  tripData: TripData;
  transactionData: TransactionData[];
};

function DataTable({ tripData, transactionData }: Props) {
  const rows = transactionData.map((tx) => ({
    key: tx.id,
    list: tx.name,
    ...Object.fromEntries(
      tx.transaction_by_member.map((member) => [
        member.member_name,
        member.amount,
      ])
    ),
  }));

  const columns = [
    {
      key: "list",
      label: "list",
    },
  ];

  tripData.member.forEach((member) => {
    columns.push({
      key: member.name,
      label: member.name,
    });
  });

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
