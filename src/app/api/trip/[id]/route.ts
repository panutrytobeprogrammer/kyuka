import { errorResponse, successResponse } from "@libs/response";
import DBPool from "@libs/pgdb";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const client = await DBPool.connect();
    const result = await client.query("SELECT * FROM trip WHERE id = $1", [id]);
    client.release();

    return successResponse(result.rows[0]);
  } catch (err) {
    console.error({
      file: __dirname,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      request: req,
      error: err,
    });
    return errorResponse(null);
  }
};
