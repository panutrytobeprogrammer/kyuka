import React from "react";
import { TransactionData } from "../types";
import { Divider } from "@heroui/react";

type Props = {
  transactionData: TransactionData[];
};

function ListTab({ transactionData }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div className="flex flex-col gap-2 p-4 bg-box rounded-large">
        <p className="text-[14px] font-medium text-gray-200">Total expenses</p>
        <p className="text-[32px] font-semibold text-gray-50">
          THB {transactionData.reduce((acc, curr) => acc + curr.amount, 0)}
        </p>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-box rounded-large max-h-[450px] overflow-y-auto">
        {transactionData.map((transaction, index) => (
          <div key={transaction.id} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 p-2">
              <p className="text-[14px] font-medium text-gray-200">
                {transaction.name}
              </p>
              <p className="text-[28px] font-semibold text-gray-50">
                THB {transaction.amount}
              </p>
            </div>
            {index !== transactionData.length - 1 && (
              <Divider className="bg-item" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListTab;
