import { CreateTripPayload } from "@/types/index";
import DBPool from "@libs/pgdb";
import { errorResponse, successResponse } from "@libs/response";

export const POST = async (req: Request) => {
  const payload: CreateTripPayload = await req.json();
  const client = await DBPool.connect();
  try {
    const result = await client.query(
      "INSERT INTO trip (name, description, member) values ($1, $2, $3) RETURNING id",
      [payload.name, payload.description, JSON.stringify(payload.member)]
    );

    client.release();

    return successResponse({
      url: "/?id=" + result.rows[0].id,
    });
  } catch (err) {
    console.error({
      file: __dirname,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      request: req,
      response: err,
    });
    return errorResponse("failed to create new trip.");
  }
};

export const GET = async (req: Request) => {
  const client = await DBPool.connect();
  try {
    const result = await client.query(
      "SELECT id, name from trip where status = true"
    );

    client.release();

    return successResponse(
      result.rows.map((item) => ({
        url: "/?id=" + item.id,
        name: item.name,
      }))
    );
  } catch (err) {
    console.error({
      file: __dirname,
      timestamp: new Date().toISOString(),
      headers: req.headers,
      request: req,
      response: err,
    });
    return errorResponse("failed to create new trip.");
  }
};
