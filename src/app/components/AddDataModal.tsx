import { Button, ModalBody, ModalHeader } from "@heroui/react";
import { AddDataForm } from "@/types/index";
import React from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import Checkbox from "./Checkbox";

type Props = {
  onClose: () => void;
};

function AddDataModal({ onClose }: Props) {
  const addData = useForm<AddDataForm>();
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">add data</ModalHeader>
      <ModalBody className="flex flex-col gap-2">
        <TextField
          field="name"
          label="name"
          control={addData.control}
          error={addData.formState.errors.name}
          placeholder="eg. ร้านข้าวป้าศรี"
        />
        <Checkbox
          field="is_equal"
          control={addData.control}
          error={addData.formState.errors.is_equal}
          options={[{ id: 1, value: "equally" }]}
        />
        <TextField
          field="transaction_by_member"
          label="amount"
          control={addData.control}
          error={addData.formState.errors.transaction_by_member}
          placeholder="eg. 200.00"
        />
        <Button className="bg-item" onPress={onClose}>
          add
        </Button>
      </ModalBody>
    </>
  );
}

export default AddDataModal;
