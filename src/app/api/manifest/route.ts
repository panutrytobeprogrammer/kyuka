// app/api/manifest/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id =
    searchParams.get("id") || searchParams.get("callbackUrl")?.split("=")[1];

  const manifest = {
    name: "Kyūka",
    short_name: "Kyūka",
    description: "Kyūka travel application",
    start_url: `/?id=${id}`,
    display: "standalone",
    background_color: "#27203B",
    theme_color: "#27203B",
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

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "no-store",
    },
  });
}
