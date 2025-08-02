import { successResponse } from "@libs/response";
import DBPool from "@libs/pgdb";
import { NextRequest } from "next/server";
import { v4 } from "uuid";
import {
  AddDataForm,
  TransactionByMember,
  TransactionData,
} from "@/types/index";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const client = await DBPool.connect();
  const result = await client.query(
    "SELECT * FROM transaction WHERE trip_id = $1 and active = true order by create_date asc",
    [id]
  );
  client.release();

  const data: TransactionData[] = result.rows;

  const resp: TransactionData[] = data.map((item) => ({
    ...item,
    amount: item.amount / 10000,
    transaction_by_member: item.transaction_by_member.map((tx) => ({
      ...tx,
      amount: (tx.amount ?? 0) / 10000,
    })),
  }));

  console.log({
    file: __dirname,
    timestamp: new Date().toISOString(),
    headers: req.headers,
    request: req,
  });

  return successResponse(resp);
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const body: AddDataForm = await req.json();
  const client = await DBPool.connect();

  const amount = body.transaction_by_member?.reduce(
    (acc, curr) => acc + (curr?.amount ?? 0) * 10000,
    0
  );

  let tx_by_member: TransactionByMember[] = [];

  if (body.is_equal) {
    const member = (
      await client.query("SELECT member FROM trip WHERE id = $1", [id])
    ).rows;

    tx_by_member = member.map((m) => ({
      member_name: m.member,
      amount: (amount / member.length) * 10000,
    }));
  } else {
    tx_by_member = body.transaction_by_member.map((item) => ({
      member_name: item.member_name,
      amount: (item.amount ?? 0) * 10000,
    }));
  }

  const result = await client.query(
    "INSERT INTO transaction (id, name, amount, trip_id, transaction_by_member) VALUES ($1, $2, $3, $4, $5)",
    [v4(), body.name, amount, id, JSON.stringify(tx_by_member)]
  );
  client.release();

  console.log({
    file: __dirname,
    timestamp: new Date().toISOString(),
    headers: req.headers,
    request: req,
  });

  return successResponse(null);
};
