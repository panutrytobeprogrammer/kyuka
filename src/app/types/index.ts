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
  amount: number | undefined;
}

export type OptionQuestion = {
  id: number;
  value: string;
};

export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface TripData {
  id: string;
  name: string;
  description: string;
  member: Member[];
  status: boolean;
  create_date: string;
}

export interface Member {
  name: string;
  email: string;
}

export interface TransactionData {
  id: string;
  name: string;
  amount: number;
  trip_id: string;
  transaction_by_member: TransactionByMember[];
  create_date: Date;
}

export interface TransactionByMember {
  amount: number | undefined;
  member_name: string;
}
