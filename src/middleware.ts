import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import withAuth from "next-auth/middleware";

const baseUrl = process.env.BACKEND_URL;

async function customMiddleware(request: NextRequest) {
  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://accounts.google.com ${baseUrl};
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return response;
}

export default withAuth(customMiddleware);

export const config = {
  matcher: ["/", "/api/transaction", "/api/user", "/admin"],
};
