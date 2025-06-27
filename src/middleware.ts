import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { env } from "next-runtime-env";
import { NextResponse } from "next/server";

const baseUrl = env("NEXT_PUBLIC_URL");

async function customMiddleware(request: NextRequestWithAuth) {
  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://accounts.google.com ${baseUrl} https://lh3.googleusercontent.com;
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

  const pathname = request.url;

  if (pathname.startsWith("/admin")) {
    if (env("ADMIN_EMAIL") !== request.nextauth.token?.email) {
      return NextResponse.redirect(new URL("/logout", request.nextUrl));
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  console.log({
    file: __dirname,
    timestamp: new Date().toISOString(),
    headers: requestHeaders,
    response: response.headers,
    request: request,
  });

  return response;
}

export default withAuth(customMiddleware);

export const config = {
  matcher: [
    "/",
    "/admin",
    "/api/transaction/:path*",
    "/api/trip/:path*",
    "/api/user/:path*",
  ],
};
