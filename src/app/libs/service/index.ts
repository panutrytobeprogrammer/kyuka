import HttpClient from "../http-clients";

export const getTransactionData = async (id: string) => {
  return await HttpClient.get(`/api/transaction/${id}`);
};
