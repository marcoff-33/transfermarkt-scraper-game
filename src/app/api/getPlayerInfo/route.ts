import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const playerId = searchParams.get("q");
  const lang = searchParams.get("x");
  const res = await fetch(
    `https://transfermarket.p.rapidapi.com/players/get-profile?id=${playerId}&domain=${lang}`,
    {
      headers: {
        "X-RapidAPI-Key": `${process.env.API_KEY}`,
        "X-RapidAPI-Host": `${process.env.API_HOST}`,
      },
    }
  );
  const data = await res.json();
  return Response.json({ data });
}
