import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const playerTag = request.nextUrl.searchParams.get("playerTag");
  if (!playerTag) {
    return new Response(JSON.stringify({ error: "Player tag is required" }), {
      status: 400,
    });
  }
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/${encodeURIComponent(
        playerTag
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching player data:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching player data" }),
      {
        status: 500,
      }
    );
  }
}
