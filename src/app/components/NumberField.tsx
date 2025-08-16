"use client";
import { NumberInput } from "@heroui/react";
import { Controller, FieldValues, UseFormSetValue } from "react-hook-form";
import { DefaultInputProps } from "../types/index";
import { IconErrorOutlined } from "./Icons";

interface NumberFieldProps<T extends FieldValues> extends DefaultInputProps<T> {
  id?: string;
  variants?: "search" | "select" | "email" | "phone" | undefined;
  maxLength?: number;
  onClickFn?: () => void;
  setValue?: UseFormSetValue<any> | void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function NumberField<T extends FieldValues>(props: NumberFieldProps<T>) {
  const {
    label,
    required = false,
    description,
    placeholder,
    maxLength,
    error,
    field,
    rules,
    id,
    variants,
    disabled = false,
    control,
  } = props;

  return (
    <div className="flex flex-col justify-start label-md gap-1">
      <Controller
        control={control}
        name={field}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <NumberInput
              id={id}
              data-testid={`input-${field}`}
              name={field}
              isInvalid={!!error}
              placeholder={placeholder}
              value={value}
              defaultValue={value}
              onChange={(e) => {
                onChange(e);
              }}
              onBlur={onBlur}
              className={`label-md invalid:text-red-500 invalid:border-red-500 group-data-[focus=true]:border-red-500`}
              maxLength={maxLength}
              disabled={disabled}
              label={label}
              isRequired={required}
              labelPlacement="outside"
              inputMode="decimal"
            />
          );
        }}
      />
      {error && (
        <div className="flex space-x-2">
          <div>
            <IconErrorOutlined color="#DF4953" width={20} height={20} />
          </div>
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
    </div>
  );
}

export default NumberField;
