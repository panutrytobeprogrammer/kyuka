import {
  RefetchOptions,
  QueryObserverResult,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React from "react";
import { TransactionData, APIResponse } from "../types";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  addToast,
} from "@heroui/react";
import { formatDateTime } from "@libs/helper";
import { IconMenuDot } from "./Icons";
import { deleteTransaction } from "@libs/service";

type Props = {
  transactionData: TransactionData[];
  tripId: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<
      AxiosResponse<APIResponse<TransactionData[]>, any>,
      Error
    >
  >;
};

function ListAll({ transactionData, tripId, refetch }: Props) {
  const DeleteTxMutate = useMutation({
    mutationFn: async (id: string) => {
      return await deleteTransaction(tripId, id);
    },
    onSuccess() {
      refetch();
      addToast({
        title: "delete transaction success",
        color: "success",
      });
    },
    onError(error) {
      addToast({
        title: "delete transaction failed",
        description: error.message,
        color: "danger",
      });
    },
  });
  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div className="flex flex-col gap-2 rounded-large main-content-height overflow-y-auto">
        {transactionData.map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex flex-col gap-2 bg-box rounded-xl"
          >
            <div className="flex flex-col">
              <div className="flex justify-between border-b-1 p-4">
                <p className="text-[16px] font-medium text-gray-800">
                  {transaction.name}
                </p>
                <div className="flex flex-col gap-1 items-end">
                  <Dropdown>
                    <DropdownTrigger>
                      <IconMenuDot width={20} color="#1E1E1C" />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        key="remove_tx"
                        color="danger"
                        className="text-red-500 hover:text-gray-900"
                        onClick={() => {
                          DeleteTxMutate.mutate(transaction.id);
                        }}
                      >
                        <p className="label-md bold">Remove</p>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <p className="text-[28px] font-semibold text-gray-900">
                  ฿ {transaction.amount}
                </p>
                <div className="text-[12px] text-gray-700">
                  {transaction.transaction_by_member.map((member) => (
                    <p key={member.member_name}>
                      {member.member_name} ฿{member.amount}
                    </p>
                  ))}
                </div>
                <p className="text-[12px] font-normal text-gray-500">
                  {formatDateTime(transaction.create_date)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListAll;
