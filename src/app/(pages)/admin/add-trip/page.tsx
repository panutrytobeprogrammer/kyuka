"use client";
import { CreateTripPayload } from "@/types/index";
import { IconX } from "@components/Icons";
import TextField from "@components/TextField";
import { addToast, Button } from "@heroui/react";
import { addTrip } from "@libs/service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type Props = {};

function page({}: Props) {
  const router = useRouter();
  const addTripForm = useForm<CreateTripPayload>({
    defaultValues: {
      member: [{ name: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: addTripForm.control,
    name: "member",
  });

  const handleClickAdd = () => {
    append({ name: "", email: "" });
  };

  const addTripMutate = useMutation({
    mutationFn: async (data: CreateTripPayload) => {
      return await addTrip(data);
    },
  });

  const onSubmit: SubmitHandler<CreateTripPayload> = (data) => {
    addTripMutate.mutate(data, {
      onSuccess: () => {
        addToast({
          title: "create trip success",
          color: "success",
        });
        router.replace("/admin");
      },
      onError: (error) => {
        addToast({
          title: "create trip failed",
          description: error.message,
          color: "danger",
        });
      },
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="font-medium text-lg">add trip</p>
      <div className="flex flex-col gap-3 border-[1px] rounded-xl p-2 w-full">
        <TextField
          control={addTripForm.control}
          field={"name"}
          error={addTripForm.formState.errors.name}
          label="name"
          //   placeholder="ex. CNX trip"
        />
        <TextField
          control={addTripForm.control}
          field={"description"}
          error={addTripForm.formState.errors.name}
          label="description"
          //   placeholder="e"
        />
        <div className="flex justify-end items-center">
          {/* <p className="text-sm">member</p> */}
          {/* <Button
            onPress={handleClickAdd}
            className="bg-item"
            data-testid="add-member"
            size="sm"
          >
            + Add Member
          </Button> */}
        </div>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 p-2 border-[1px] rounded-xl"
          >
            <div className="flex justify-between">
              <p className="text-sm">member {index + 1}</p>
              <button
                onClick={() => remove(index)}
                className="cursor-pointer"
                disabled={fields.length <= 1}
              >
                <IconX
                  width={16}
                  height={16}
                  color={fields.length <= 1 ? "#cacaca" : "#161616"}
                />
              </button>
            </div>
            <TextField
              control={addTripForm.control}
              field={`member.${index}.name`}
              error={addTripForm.formState.errors.name}
              label="name"
              //   placeholder="ex. Best"
            />
            <TextField
              control={addTripForm.control}
              field={`member.${index}.email`}
              error={addTripForm.formState.errors.name}
              label="email"
              //   placeholder="ex. best@mail.com"
            />
          </div>
        ))}
        <Button
          onPress={handleClickAdd}
          className="bg-item"
          data-testid="add-member"
          size="sm"
        >
          + Add Member
        </Button>
      </div>
      <Button
        onPress={() => addTripForm.handleSubmit(onSubmit)()}
        className="bg-item"
        data-testid="add-member"
        size="sm"
      >
        + Add Trip
      </Button>
    </div>
  );
}

export default page;
