import { CreateTripPayload } from "@/types/index";
import DBPool from "@libs/pgdb";
import { errorResponse, successResponse } from "@libs/response";

export const POST = async (req: Request) => {
  const payload: CreateTripPayload = await req.json();
  const client = await DBPool.connect();
  try {
    const result = await client.query(
      "INSERT INTO trip (name, description, member) values ($1, $2, $3) RETURNING id",
      [payload.name, payload.description, payload.member]
    );

    client.release();

    return successResponse({
      url: process.env.NEXT_PUBLIC_URL + "/?id=" + result.rows[0].id,
    });
  } catch (err) {
    return errorResponse("failed to create new trip.");
  }
};
