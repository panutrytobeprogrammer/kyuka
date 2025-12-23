import DBPool from "@libs/pgdb";
import { errorResponse, successResponse } from "@libs/response";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; email: string }> }
) => {
  const { id, email } = await params;

  try {
    const client = await DBPool.connect();
    const result = await client.query("SELECT member FROM trip where id = $1", [
      id,
    ]);
    client.release();

    const members: { name: string; email: string }[] = result.rows[0];

    const isMember = members.some((member) => member.email === email);

    return successResponse(isMember);
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
