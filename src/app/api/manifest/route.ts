import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id =
    searchParams.get("id") || searchParams.get("callbackUrl")?.split("=")[1];

  const manifest = {
    name: `Kyūka`,
    short_name: `Kyūka`,
    description: "Kyūka travel application",
    start_url: `/`,
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

  try {
    if (id !== "admin") {
      const tripInfo = await fetch(
        `${process.env.NEXTAUTH_URL}/api/trip-name/${id}`,
        {
          method: "GET",
          headers: {
            ...req.headers,
          },
        }
      );
      const data = await tripInfo.json();

      manifest.name = manifest.name + ` ${data.data.name}`;
      manifest.short_name = manifest.short_name + ` ${data.data.name}`;
      manifest.start_url = `?id=${id}`;

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
    } else {
      manifest.name = manifest.name + " admin";
      manifest.short_name = manifest.short_name + " admin";
      manifest.start_url = `/admin`;

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
  } catch (err) {
    console.log({
      file: __dirname,
      timestamp: new Date().toISOString(),
      request: req,
      response: manifest,
    });
    return manifest;
  }
}
