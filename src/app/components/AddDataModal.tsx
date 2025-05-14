import { addToast, Button, ModalBody, ModalHeader, toast } from "@heroui/react";
import {
  AddDataForm,
  APIResponse,
  TransactionData,
  TripData,
} from "@/types/index";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "./TextField";
import Checkbox from "./Checkbox";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { saveTransaction } from "@libs/service";
import { AxiosResponse } from "axios";

type Props = {
  onClose: () => void;
  tripData: TripData;
  getDataTable: UseQueryResult<
    AxiosResponse<APIResponse<TransactionData[]>, any>,
    Error
  >;
};

function AddDataModal({ onClose, tripData, getDataTable }: Props) {
  const addData = useForm<AddDataForm>({
    defaultValues: {
      name: "",
      is_equal: false,
      transaction_by_member: tripData.member.map((member) => ({
        member_name: member.name,
        amount: undefined,
      })),
    },
  });

  const saveTxMutate = useMutation({
    mutationFn: (data: AddDataForm) => {
      return saveTransaction(data, tripData.id);
    },
  });

  const onSubmit: SubmitHandler<AddDataForm> = (data) => {
    data.transaction_by_member.forEach((tx) => {
      tx.amount = Number(tx.amount);
    });

    saveTxMutate.mutate(data, {
      onSuccess: () => {
        onClose();
        getDataTable.refetch();
      },
      onError: (error) => {
        addToast({
          title: "save transaction failed",
          description: error.message,
          color: "danger",
        });
      },
    });
  };

  return (
    <FormProvider {...addData}>
      <form onSubmit={addData.handleSubmit(onSubmit)}>
        <ModalHeader className="flex flex-col gap-1">add data</ModalHeader>
        <ModalBody className="flex flex-col gap-2">
          <TextField
            field="name"
            label="name"
            control={addData.control}
            error={addData.formState.errors.name}
            placeholder="eg. ร้านข้าวป้าศรี"
          />
          {/* <Checkbox
            field="is_equal"
            control={addData.control}
            error={addData.formState.errors.is_equal}
            options={[{ id: 1, value: "equally" }]}
          /> */}
          {tripData.member.map((member, index) => (
            <TextField
              key={member.name}
              field={`transaction_by_member.${index}.amount`}
              label={member.name + "'s amount"}
              control={addData.control}
              error={addData.formState.errors.transaction_by_member}
              placeholder="eg. 200.00"
            />
          ))}
          <Button className="bg-item" type="submit">
            add
          </Button>
        </ModalBody>
      </form>
    </FormProvider>
  );
}

export default AddDataModal;
