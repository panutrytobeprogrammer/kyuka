import { ModalBody, ModalHeader } from "@heroui/react";
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
          control={addData.control}
          error={addData.formState.errors.name}
          placeholder="eg. ร้านข้าวป้าศรี"
        />
        <Checkbox
          field="is_equal"
          control={addData.control}
          error={addData.formState.errors.is_equal}
          options={[{ id: 1, value: "หารเท่า" }]}
        />
        <TextField
          field="transaction_by_member"
          control={addData.control}
          error={addData.formState.errors.transaction_by_member}
          placeholder="eg. ร้านข้าวป้าศรี"
        />
      </ModalBody>
    </>
  );
}

export default AddDataModal;
