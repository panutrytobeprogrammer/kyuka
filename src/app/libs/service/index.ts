import {
  AddDataForm,
  APIResponse,
  CreateTripPayload,
  TransactionData,
} from "@/types/index";
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

export const deleteTransaction = async (trip_id: string, tx_id: string) => {
  return await HttpClient.delete(`/api/transaction/${trip_id}/${tx_id}`);
};

export const checkUser = async (trip_id: string, email: string) => {
  return await HttpClient.get<APIResponse<boolean>>(`/api/${trip_id}/${email}`);
};

export const addTrip = async (payload: CreateTripPayload) => {
  return await HttpClient.post<APIResponse<{ url: string }>>(
    `/api/trip`,
    payload
  );
};

export const getAllTrip = async () => {
  return await HttpClient.get<APIResponse<{ url: string; name: string }[]>>(
    `/api/trip`
  );
};
