import { DefaultInputProps, OptionQuestion } from "@/types/index";
import { IconErrorOutlined, IconHelp } from "@components/Icons";
import {
  CheckboxGroup,
  Checkbox as HeroCheckbox,
  Tooltip,
} from "@heroui/react";
import React from "react";
import { Controller, FieldValues, UseFormSetValue } from "react-hook-form";

interface ChackboxProps<T extends FieldValues> extends DefaultInputProps<T> {
  id?: string;
  options: OptionQuestion[];
  maxLength?: number;
  onClickFn?: () => void;
  setValue?: UseFormSetValue<any> | void;
  disabled?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

function Checkbox<T extends FieldValues>(props: ChackboxProps<T>) {
  const {
    label,
    options,
    required = true,
    description,
    placeholder,
    maxLength,
    error,
    control,
    field,
    rules,
    id,
    disabled = false,
    setValue,
  } = props;

  return (
    <>
      <div className="flex flex-col justify-start label-md space-y-2">
        {label && (
          <div className="flex space-x-2">
            <p>
              {label}
              {required && (
                <span className="required-field text-red-500">*</span>
              )}
            </p>
            {description && (
              <Tooltip
                content={description}
                classNames={{
                  base: ["before:bg-gray-900"],
                  content: [
                    "max-w-[25rem] text-wrap",
                    "bg-gray-900 text-white",
                  ],
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
        )}
        <Controller
          control={control}
          name={field}
          rules={rules}
          render={({ field: { value, onChange } }) => {
            return options.length > 1 ? (
              <div className="flex flex-col w-full">
                <CheckboxGroup
                  isRequired={required}
                  id={id}
                  value={Array.isArray(value) ? value : [value]}
                  onValueChange={(e) => {
                    // if (trigger) {
                    //   trigger();
                    // }
                    onChange(e);
                  }}
                  isInvalid={!!error}
                  isDisabled={disabled}
                  classNames={{
                    label: "body-md",
                  }}
                >
                  {options.map((option) => (
                    <HeroCheckbox key={option.id} value={option.value}>
                      {option.value}
                    </HeroCheckbox>
                  ))}
                </CheckboxGroup>
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <HeroCheckbox
                  isSelected={value}
                  onValueChange={(e) => {
                    // if (trigger) trigger();
                    onChange(e);
                  }}
                  classNames={{
                    label: "body-md",
                  }}
                >
                  {options[0].value}
                </HeroCheckbox>
              </div>
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
    </>
  );
}

export default Checkbox;
