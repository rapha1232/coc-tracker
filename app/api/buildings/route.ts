import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { entityNames, getType } from "coc-info";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { pRateLimit } from "p-ratelimit";

const limit = pRateLimit({
  interval: 1000,
  rate: 50, // Max 50 requests per second
  concurrency: 10, // Max 10 concurrent
});

type IncomingBuilding = { name: string; level: number; isGeared?: boolean };

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user as SessionUser | undefined;

    if (!user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
          details: "Your session is invalid or expired. Please log in again.",
          resolution: "Refresh the page and try logging in again",
          code: "AUTH_INVALID_SESSION",
        },
        { status: 401 }
      );
    }

    let buildings: IncomingBuilding[];
    try {
      const body = await req.json();
      buildings = body.buildings;

      if (!Array.isArray(buildings)) {
        return NextResponse.json(
          {
            error: "Invalid Request Data",
            details:
              "The buildings data is either missing or not properly formatted.",
            resolution:
              "Ensure you're sending a valid JSON array with a 'buildings' property",
            code: "INVALID_REQUEST_FORMAT",
          },
          { status: 400 }
        );
      }
    } catch (e) {
      console.error("JSON Parsing Error:", e);
      return NextResponse.json(
        {
          error: "Malformed Request Body",
          details:
            "The request body contains invalid JSON data that couldn't be parsed.",
          resolution: "Check your request body for JSON syntax errors",
          code: "MALFORMED_JSON",
        },
        { status: 400 }
      );
    }

    // Validate building data
    for (const building of buildings) {
      if (
        typeof building.name !== "string" ||
        typeof building.level !== "number"
      ) {
        return NextResponse.json(
          {
            error: "Invalid Building Data",
            details: `Each building must have a string 'name' and numeric 'level'.`,
            resolution: "Ensure all buildings have valid 'name' and 'level' properties",
            code: "INVALID_BUILDING_DATA",
          },
          { status: 400 }
        );
      }
    }

    // Delete existing buildings for this user
    try {
      await prisma.building.deleteMany({
        where: {
          userId: user.id,
        },
      });
    } catch (error) {
      console.error("Database Cleanup Error:", error);
      return NextResponse.json(
        {
          error: "Data Preparation Failed",
          details:
            "The system couldn't prepare your data for update due to a database error.",
          resolution: "Please try again in a few minutes",
          code: "DATA_PREPARATION_ERROR",
        },
        { status: 500 }
      );
    }

    const buildingCategories = Object.fromEntries(
      entityNames
        .map((name) => [name, getType(name)])
        .filter(([, type]) => type !== null)
    ) as Record<string, string>;

    // Create new buildings
    try {
      const buildingPromises = buildings.map((building) =>
        limit(() =>
          prisma.building.create({
            data: {
              name: building.name,
              level: building.level,
              isGeared: building.isGeared || false,
              category: buildingCategories[building.name] || "Other",
              userId: user.id,
            },
          })
        )
      );

      await Promise.all(buildingPromises);
    } catch (error) {
      console.error("Data Persistence Error:", error);

      // Prepare error details for development
      let errorDetails = {};
      if (process.env.NODE_ENV === "development") {
        errorDetails = {
          prismaError:
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                }
              : error,
          problematicBuildings: buildings,
        };
      }

      return NextResponse.json(
        {
          error: "Data Save Failed",
          details: "Your building data couldn't be saved to the database.",
          resolution:
            "Please check your data and try again. If the problem persists, contact support.",
          code: "DATA_PERSISTENCE_ERROR",
          ...(process.env.NODE_ENV === "development" && {
            debugInfo: {
              errorType:
                error instanceof Error ? error.constructor.name : typeof error,
              ...errorDetails,
            },
          }),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Building data saved successfully",
        details: "All your building configurations have been securely stored.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      {
        error: "Unexpected Error",
        details: "An unexpected error occurred while processing your request.",
        resolution: "Please try again later.",
        code: "UNEXPECTED_ERROR",
      },
      { status: 500 }
    );
  }
}
