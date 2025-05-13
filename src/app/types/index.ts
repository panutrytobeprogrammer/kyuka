import {
  Control,
  FieldError,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormResetField,
} from "react-hook-form";

export interface DefaultInputProps<TFieldValues extends FieldValues = any> {
  field: FieldPath<TFieldValues>;
  control: Control<TFieldValues, any>;
  error:
    | FieldError
    | Merge<
        FieldError,
        (FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined)[]
      >
    | undefined;
  trigger?: () => Promise<boolean> | undefined;
  resetField?: UseFormResetField<TFieldValues>;
  label?: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

export type AddDataForm = {
  name: string;
  is_equal: boolean;
  transaction_by_member: TransactionByMember[];
};

export interface TransactionByMember {
  member_name: string;
  amount: number;
}

export type OptionQuestion = {
  id: number;
  value: string;
};
