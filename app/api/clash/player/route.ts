import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const COC_API_TOKEN = process.env.TOKEN;
const COC_API_URL = "https://cocproxy.royaleapi.dev/v1";

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// GET endpoint to fetch player data
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as SessionUser | undefined;

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user's player tag
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { playerTag: true },
    });

    if (!dbUser?.playerTag) {
      return NextResponse.json(
        { error: "Player tag not set" },
        { status: 400 }
      );
    }

    if (!COC_API_TOKEN) {
      return NextResponse.json(
        { error: "COC API token not configured" },
        { status: 500 }
      );
    }

    // Remove # from tag for API call
    const tag = dbUser.playerTag.replace("#", "");

    // Call Clash of Clans API
    const response = await fetch(`${COC_API_URL}/players/%23${tag}`, {
      headers: {
        Authorization: `Bearer ${COC_API_TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch player data");
    }

    const playerData = await response.json();

    // Update user's town hall level
    await prisma.user.update({
      where: { id: user.id },
      data: { townHallLevel: playerData.townHallLevel },
    });

    return NextResponse.json(playerData);
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json(
      { error: "Error fetching player data" },
      { status: 500 }
    );
  }
}

// POST endpoint to update player tag
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as SessionUser | undefined;

    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { playerTag } = await req.json();
    console.log(playerTag);

    if (!playerTag || typeof playerTag !== "string") {
      return NextResponse.json(
        { error: "Invalid player tag from server" },
        { status: 400 }
      );
    }

    if (!COC_API_TOKEN) {
      return NextResponse.json(
        { error: "COC API token not configured" },
        { status: 500 }
      );
    }

    // Verify the tag exists in CoC
    const tag = playerTag.replace("#", "");
    const response = await fetch(`${COC_API_URL}/players/%23${tag}`, {
      headers: {
        Authorization: `Bearer ${COC_API_TOKEN}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: response.statusText }, { status: 400 });
    }

    const playerData = await response.json();

    // Update user with player tag and town hall level
    await prisma.user.update({
      where: { id: user.id },
      data: {
        playerTag,
        townHallLevel: playerData.townHallLevel,
      },
    });

    return NextResponse.json({ message: "Player tag updated successfully" });
  } catch (error) {
    console.error("Error updating player tag:", error);
    return NextResponse.json(
      { error: "Error updating player tag" },
      { status: 500 }
    );
  }
}
