import { AddDataForm, APIResponse, TransactionData } from "@/types/index";
import { TripData } from "@/types/index";
import HttpClient from "../http-clients";

export const getTransactionData = async (id: string) => {
  return await HttpClient.get<APIResponse<TransactionData[]>>(
    `/api/transaction/${id}`
  );
};

export const getTripData = async (id: string) => {
  return await HttpClient.get<APIResponse<TripData>>(`/api/trip/${id}`);
};

export const saveTransaction = async (data: AddDataForm, id: string) => {
  return await HttpClient.post<APIResponse<TransactionData>>(
    `/api/transaction/${id}`,
    data
  );
};
