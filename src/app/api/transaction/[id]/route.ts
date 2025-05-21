import { successResponse } from "@libs/response";
import DBPool from "@libs/pgdb";
import { NextRequest } from "next/server";
import { v4 } from "uuid";
import { AddDataForm, TransactionByMember } from "@/types/index";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  const client = await DBPool.connect();
  const result = await client.query(
    "SELECT * FROM transaction WHERE trip_id = $1 and active = true",
    [id]
  );
  client.release();

  console.log({
    timestamp: new Date().toISOString(),
    headers: req.headers,
    request: await req.json(),
    response: result.rows,
  });

  return successResponse(result.rows);
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const body: AddDataForm = await req.json();
  const client = await DBPool.connect();

  const amount = body.transaction_by_member?.reduce(
    (acc, curr) => acc + (curr?.amount ?? 0),
    0
  );

  let tx_by_member: TransactionByMember[] = [];

  if (body.is_equal) {
    const member = (
      await client.query("SELECT member FROM trip WHERE id = $1", [id])
    ).rows;

    tx_by_member = member.map((m) => ({
      member_name: m.member,
      amount: amount / member.length,
    }));
  }

  const result = await client.query(
    "INSERT INTO transaction (id, name, amount, trip_id, transaction_by_member) VALUES ($1, $2, $3, $4, $5)",
    [
      v4(),
      body.name,
      amount,
      id,
      body.is_equal
        ? JSON.stringify(tx_by_member)
        : JSON.stringify(body.transaction_by_member),
    ]
  );
  client.release();

  console.log({
    timestamp: new Date().toISOString(),
    headers: req.headers,
    request: await req.json(),
    response: result.rows,
  });

  return successResponse(null);
};
