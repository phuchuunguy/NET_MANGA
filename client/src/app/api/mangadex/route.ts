import { NextRequest } from "next/server";

const API_BASE = "https://api.mangadex.org";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const endpoint = searchParams.get("endpoint");

  const allowedEndpoint = /^(manga(?:\/[0-9a-f-]{36}(?:\/feed)?)?|manga\/tag|chapter\/[0-9a-f-]{36}|at-home\/server\/[0-9a-f-]{36})$/i;
  if (!endpoint || !allowedEndpoint.test(endpoint)) {
    return Response.json({ error: "Invalid MangaDex endpoint" }, { status: 400 });
  }

  const upstreamUrl = new URL(`${API_BASE}/${endpoint}`);
  const params = new URLSearchParams(searchParams);
  params.delete("endpoint");
  upstreamUrl.search = params.toString();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "NetManga/1.0",
      },
      signal: controller.signal,
      next: { revalidate: 300 },
    });
    const text = await upstream.text();

    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("MangaDex request failed:", error);
    return Response.json(
      {
        error: "MangaDex is temporarily unavailable",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
