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
      return NextResponse.json({
        error: "Authentication required",
        details: "You must be logged in to fetch player data",
        code: "AUTH_REQUIRED"
      }, { status: 401 });
    }

    if (!COC_API_TOKEN) {
      return NextResponse.json({
        error: "Configuration error",
        details: "The Clash of Clans API token is not configured on the server",
        code: "API_TOKEN_MISSING"
      }, { status: 500 });
    }

    // Get the user's player tag
    try {
      const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { playerTag: true },
      });

      if (!dbUser?.playerTag) {
        return NextResponse.json({
          error: "Player tag not found",
          details: "Please set your Clash of Clans player tag first",
          code: "PLAYER_TAG_MISSING"
        }, { status: 400 });
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
        if (response.status === 404) {
          return NextResponse.json({
            error: "Player not found",
            details: "The provided player tag does not exist in Clash of Clans",
            code: "PLAYER_NOT_FOUND"
          }, { status: 404 });
        }
        if (response.status === 403) {
          return NextResponse.json({
            error: "API access denied",
            details: "The Clash of Clans API key is invalid or expired",
            code: "API_AUTH_ERROR"
          }, { status: 403 });
        }
        throw new Error(`CoC API returned status ${response.status}`);
      }

      const playerData = await response.json();

      // Update user's town hall level
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: { townHallLevel: playerData.townHallLevel },
        });
      } catch (error) {
        console.error("Error updating town hall level:", error);
        // Continue anyway since we have the player data
      }

      return NextResponse.json(playerData);
    } catch (error) {
      console.error("Error in database operations:", error);
      return NextResponse.json({
        error: "Database error",
        details: "Failed to retrieve or update player information",
        code: "DB_ERROR"
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json({
      error: "Internal server error",
      details: "An unexpected error occurred while fetching player data",
      code: "INTERNAL_ERROR"
    }, { status: 500 });
  }
}

// POST endpoint to update player tag
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as SessionUser | undefined;

    if (!user?.id) {
      return NextResponse.json({
        error: "Authentication required",
        details: "You must be logged in to update player tag",
        code: "AUTH_REQUIRED"
      }, { status: 401 });
    }

    if (!COC_API_TOKEN) {
      return NextResponse.json({
        error: "Configuration error",
        details: "The Clash of Clans API token is not configured on the server",
        code: "API_TOKEN_MISSING"
      }, { status: 500 });
    }

    let playerTag: string;
    try {
      const body = await req.json();
      playerTag = body.playerTag;

      if (!playerTag || typeof playerTag !== "string") {
        return NextResponse.json({
          error: "Invalid player tag",
          details: "The player tag must be a non-empty string",
          code: "INVALID_PLAYER_TAG"
        }, { status: 400 });
      }

      // Basic format validation
      if (!playerTag.match(/^#?[0-9A-Z]{8,}$/)) {
        return NextResponse.json({
          error: "Invalid player tag format",
          details: "The player tag must start with # followed by 8 or more alphanumeric characters",
          code: "INVALID_TAG_FORMAT"
        }, { status: 400 });
      }
    } catch (e) {
      console.error("Error in player tag route", e);
      return NextResponse.json({
        error: "Invalid request format",
        details: "The request body must contain valid JSON with a playerTag field",
        code: "INVALID_REQUEST"
      }, { status: 400 });
    }

    // Verify the tag exists in CoC
    const tag = playerTag.replace("#", "");
    try {
      const response = await fetch(`${COC_API_URL}/players/%23${tag}`, {
        headers: {
          Authorization: `Bearer ${COC_API_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return NextResponse.json({
            error: "Player not found",
            details: "The provided player tag does not exist in Clash of Clans",
            code: "PLAYER_NOT_FOUND"
          }, { status: 404 });
        }
        if (response.status === 403) {
          return NextResponse.json({
            error: "API access denied",
            details: "The Clash of Clans API key is invalid or expired",
            code: "API_AUTH_ERROR"
          }, { status: 403 });
        }
        throw new Error(`CoC API returned status ${response.status}`);
      }

      const playerData = await response.json();

      // Update user with player tag and town hall level
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            playerTag,
            townHallLevel: playerData.townHallLevel,
          },
        });
      } catch (error) {
        console.error("Error updating user data:", error);
        return NextResponse.json({
          error: "Database error",
          details: "Failed to save player tag and town hall level",
          code: "DB_UPDATE_ERROR"
        }, { status: 500 });
      }

      return NextResponse.json({
        message: "Player tag updated successfully",
        details: "Your player tag and town hall level have been saved"
      });
    } catch (error) {
      console.error("Error verifying player tag:", error);
      return NextResponse.json({
        error: "API error",
        details: "Failed to verify player tag with Clash of Clans API",
        code: "COC_API_ERROR"
      }, { status: 502 });
    }
  } catch (error) {
    console.error("Unexpected error while updating player tag:", error);
    return NextResponse.json({
      error: "Internal server error",
      details: "An unexpected error occurred while processing your request",
      code: "INTERNAL_ERROR"
    }, { status: 500 });
  }
}
