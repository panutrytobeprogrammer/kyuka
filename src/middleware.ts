import { generateNonce } from "@libs/helper";
import { unauthorizedRedirect } from "@libs/response";
import { getToken } from "next-auth/jwt";
import withAuth from "next-auth/middleware";
import { env } from "next-runtime-env";
import { NextRequest, NextResponse } from "next/server";

const baseUrl = env("NEXT_PUBLIC_URL");

async function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const isDev = process.env.NODE_ENV !== "production";

  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://accounts.google.com ${baseUrl} https://lh3.googleusercontent.com;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${
    isDev ? "'unsafe-eval'" : ""
  };
    style-src 'self' 'nonce-${nonce}' ${isDev ? "'unsafe-inline'" : ""};
    img-src 'self' blob: data:;
    frame-ancestors 'none'; 
    upgrade-insecure-requests; 
    block-all-mixed-content;
`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  requestHeaders.set("x-nonce", nonce);

  // const pathname = request.url;

  // const authHeader = request.headers.get("Authorization");
  // const nextauthToken = await getToken({ req: request });

  // console.log({ nextauthToken: nextauthToken });

  // if (pathname.startsWith("/admin")) {
  //   if (env("ADMIN_EMAIL") !== nextauthToken?.email) {
  //     return unauthorizedRedirect(request);
  //   }
  // }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  // if (!nextauthToken) {
  //   if (!authHeader) {
  //     return unauthorizedRedirect(request);
  //   }

  //   const base64Credentials = authHeader.split(" ")[1];
  //   if (!base64Credentials) {
  //     return unauthorizedRedirect(request);
  //   }

  //   const credentials = Buffer.from(base64Credentials, "base64").toString(
  //     "utf-8"
  //   );

  //   const [username, password] = credentials.split(":");
  //   if (
  //     username !== env("BASIC_USERNAME") ||
  //     password !== env("BASIC_PASSWORD")
  //   ) {
  //     return unauthorizedRedirect(request);
  //   }
  // }

  console.log({
    file: __dirname,
    timestamp: new Date().toISOString(),
    headers: requestHeaders,
    response: response.headers,
    request: request,
  });

  return response;
}

export default withAuth(middleware);

export const config = {
  matcher: [
    "/",
    "/admin",
    "/api/transaction/:path*",
    "/api/trip/:path*",
    "/api/user/:path*",
  ],
};
