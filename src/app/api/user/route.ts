import DBPool from "@libs/pgdb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const client = await DBPool.connect();
  try {
    const result = await client.query("SELECT member FROM trip where id = $1", [
      req.nextUrl.searchParams.get("id"),
    ]);

    return NextResponse.json({ result: result.rows });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    client.release();
  }
};
