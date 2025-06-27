// app/api/manifest/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id =
    searchParams.get("id") || searchParams.get("callbackUrl")?.split("=")[1];

  req.headers;

  const tripInfo = await fetch(`http://localhost:3000/api/trip/${id}`, {
    method: "GET",
    headers: {
      ...req.headers,
    },
  });

  const data = await tripInfo.json();

  const manifest = {
    name: `Kyūka ${data.data.name}`,
    short_name: `Kyūka ${data.data.name}`,
    description: "Kyūka travel application",
    start_url: `/?id=${id}`,
    display: "standalone",
    background_color: "#f4f4f3",
    theme_color: "#f4f4f3",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  console.log({
    file: __dirname,
    timestamp: new Date().toISOString(),
    request: req,
    response: manifest,
  });

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "no-store",
    },
  });
}
