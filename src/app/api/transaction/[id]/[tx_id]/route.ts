import DBPool from "@libs/pgdb";
import { errorResponse, successResponse } from "@libs/response";
import { NextRequest } from "next/server";

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string; tx_id: string }>;
  }
) => {
  const { id, tx_id } = await params;

  try {
    const client = await DBPool.connect();
    const result = await client.query(
      "UPDATE transaction SET active = false WHERE trip_id = $1 and id = $2",
      [id, tx_id]
    );
    client.release();

    console.log({
      file: __dirname,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      request: req,
      response: result.rows,
    });
    return successResponse(null);
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
};
