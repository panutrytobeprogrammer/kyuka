import HttpClient from "../http-clients";

export const getTransactionData = async (id: string) => {
  return await HttpClient.get(`/api/transaction/${id}`);
};

export const getTripData = async (id: string) => {
  return await HttpClient.get(`/api/trip/${id}`);
};
