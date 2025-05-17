import {
  addToast,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { deleteTransaction } from "@libs/service";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { APIResponse, TransactionData } from "../types";
import { IconMenuDot } from "./Icons";

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

function ListTab({ tripId, transactionData, refetch }: Props) {
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
              <div className="flex justify-between">
                <p className="text-[14px] font-medium text-gray-200">
                  {transaction.name}
                </p>
                <Dropdown>
                  <DropdownTrigger>
                    <IconMenuDot width={20} />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      key="remove_tx"
                      color="danger"
                      className="text-red-500 hover:text-white"
                      onClick={() => {
                        DeleteTxMutate.mutate(transaction.id);
                      }}
                    >
                      <p className="label-md bold">Remove</p>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
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
