import {
  AddDataForm,
  APIResponse,
  TransactionData,
  TripData,
} from "@/types/index";
import { addToast, Button, ModalBody, ModalHeader } from "@heroui/react";
import { saveTransaction } from "@libs/service";
import { useMutation, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import TextField from "./TextField";

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
        amount: 0,
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
        <ModalBody className="flex flex-col gap-4">
          <TextField
            field="name"
            label="store name"
            control={addData.control}
            error={addData.formState.errors.name}
            placeholder="eg. ร้านข้าวป้าศรี"
            rules={{
              required: {
                value: true,
                message: "this field is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9ก-๙\s]+$/,
                message: "must be a valid name",
              },
            }}
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
              rules={{
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "must be a number",
                },
              }}
            />
          ))}
          <Button className="bg-gray-200" type="submit">
            add
          </Button>
        </ModalBody>
      </form>
    </FormProvider>
  );
}

export default AddDataModal;
