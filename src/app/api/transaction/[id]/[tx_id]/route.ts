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
  try {
    const { id, tx_id } = await params;

    const client = await DBPool.connect();
    const result = await client.query(
      "UPDATE transaction SET active = false WHERE trip_id = $1 and id = $2",
      [id, tx_id]
    );
    client.release();

    return successResponse(null);
  } catch (error) {
    console.error({
      file: __dirname,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      request: req,
      error: error,
    });
    return errorResponse(error);
  }
};
