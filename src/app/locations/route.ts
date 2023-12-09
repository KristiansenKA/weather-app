import { NextRequest } from "next/server";

const DEFAULT_COUNT = 10;

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  if (!name) {
    return Response.json(
      {
        error: "Missing name query parameter",
      },
      { status: 400 }
    );
  }

  const urlSearchParams = new URLSearchParams({
    name,
    count: DEFAULT_COUNT.toString(),
  });

  const res = await fetch(
    "https://geocoding-api.open-meteo.com/v1/search?" + urlSearchParams
  );

  const data = await res.json();

  return Response.json(data);
}
