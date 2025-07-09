import { NextRequestWithAuth } from "next-auth/middleware";
import { unauthorizedResponse } from "./response";
import { NextResponse } from "next/server";

export const authChecker = async (req: NextRequestWithAuth) => {
  const authHeader = req.headers.get("Authorization");
  const nextauthToken = req.nextauth.token;

  if (!nextauthToken) {
    if (!authHeader) {
      return unauthorizedResponse(null);
    }

    const base64Credentials = authHeader.split(" ")[1];
    if (!base64Credentials) {
      return unauthorizedResponse(null);
    }

    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf-8"
    );

    const [username, password] = credentials.split(":");
    if (
      username === process.env.BASIC_USERNAME &&
      password === process.env.BASIC_PASSWORD
    ) {
      return NextResponse.next();
    } else {
      return unauthorizedResponse(null);
    }
  } else {
    return NextResponse.next();
  }
};
