import React, { useEffect, useState } from "react";
import { Member, TransactionData } from "../types";
import { Divider } from "@heroui/react";

type Props = {
  transactionData: TransactionData[];
  members: Member[];
};

function ResultTab({ transactionData, members }: Props) {
  const [sumByMember, setSumByMember] = useState<Record<string, number>>({});

  useEffect(() => {
    const totals: Record<string, number> = {};
    transactionData.forEach((tx) => {
      tx.transaction_by_member.forEach(({ member_name, amount }) => {
        totals[member_name] = (totals[member_name] || 0) + (amount || 0);
      });
    });
    setSumByMember(totals);
  }, [transactionData]);

  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div className="flex flex-col gap-2 p-4 bg-box rounded-large">
        <p className="text-[14px] font-medium text-gray-700">Total expenses</p>
        <p className="text-[32px] font-semibold text-gray-900">
          THB {transactionData.reduce((acc, curr) => acc + curr.amount, 0)}
        </p>
      </div>
      <div className="flex flex-col gap-2 p-4 bg-box rounded-large max-h-[450px] overflow-y-auto">
        {Object.entries(sumByMember).map(([member, amount], index) => (
          <div key={member} className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 p-2">
              <p className="text-[14px] font-medium text-gray-700">{member}</p>
              <p className="text-[28px] font-semibold text-gray-900">
                THB {amount}
              </p>
            </div>
            {index !== members.length - 1 && <Divider className="bg-item" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultTab;
