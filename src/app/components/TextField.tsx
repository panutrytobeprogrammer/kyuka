"use client";
import { Input, Tooltip } from "@heroui/react";
import { Controller, FieldValues, UseFormSetValue } from "react-hook-form";
import { IconErrorOutlined, IconHelp } from "./Icons";
import { DefaultInputProps } from "../types/index";

interface TextFieldProps<T extends FieldValues> extends DefaultInputProps<T> {
  id?: string;
  variants?: "search" | "select" | "email" | "phone" | undefined;
  maxLength?: number;
  onClickFn?: () => void;
  setValue?: UseFormSetValue<any> | void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const {
    label,
    required = true,
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
      {/* {label && (
        <div className="flex space-x-2">
          <p className="font-[14px]">
            {label}
            {required && <span className="required-field text-red-500">*</span>}
          </p>
          {description && (
            <Tooltip
              content={description}
              classNames={{
                base: ["before:bg-gray-900"],
                content: ["max-w-[25rem] text-wrap", "bg-gray-900 text-white"],
              }}
              showArrow
              placement="top-start"
            >
              <button>
                <IconHelp />
              </button>
            </Tooltip>
          )}
        </div>
      )} */}
      <Controller
        control={control}
        name={field}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Input
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

export default TextField;
