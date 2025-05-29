import { TH13_BUILDINGS } from "@/constants/buildings";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface BuildingLevel {
  level: number;
  count: number;
  isGeared?: boolean;
}

type BuildingLevels = Record<string, BuildingLevel[]>;

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
      return NextResponse.json({ 
        error: "Authentication required",
        details: "You must be logged in to save buildings",
        code: "AUTH_REQUIRED"
      }, { status: 401 });
    }

    let buildings: BuildingLevels;
    try {
      const body = await req.json();
      buildings = body.buildings;
      
      if (!buildings || typeof buildings !== 'object') {
        return NextResponse.json({
          error: "Invalid request format",
          details: "The buildings data is missing or in an invalid format",
          code: "INVALID_REQUEST"
        }, { status: 400 });
      }
    } catch (e) {
      return NextResponse.json({
        error: "Invalid JSON",
        details: "The request body contains invalid JSON data",
        code: "INVALID_JSON"
      }, { status: 400 });
    }

    // Validate building data
    for (const [name, levels] of Object.entries(buildings)) {
      if (!Array.isArray(levels)) {
        return NextResponse.json({
          error: "Invalid building format",
          details: `Building "${name}" must have an array of levels`,
          code: "INVALID_BUILDING_FORMAT"
        }, { status: 400 });
      }

      for (const level of levels) {
        if (typeof level.level !== 'number' || typeof level.count !== 'number') {
          return NextResponse.json({
            error: "Invalid level format",
            details: `Building "${name}" contains invalid level or count values`,
            code: "INVALID_LEVEL_FORMAT"
          }, { status: 400 });
        }
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
      console.error("Error deleting existing buildings:", error);
      return NextResponse.json({
        error: "Database error",
        details: "Failed to delete existing buildings",
        code: "DB_DELETE_ERROR"
      }, { status: 500 });
    }

    // Get building categories from TH13_BUILDINGS
    const buildingCategories = TH13_BUILDINGS.reduce((acc, building) => {
      acc[building.name] = building.category;
      return acc;
    }, {} as Record<string, string>);

    // Create new buildings
    try {
      const buildingPromises = Object.entries(buildings).flatMap(([name, levels]) =>
        levels.map(level =>
          prisma.building.create({
            data: {
              name,
              level: level.level,
              count: level.count,
              isGeared: level.isGeared || false,
              category: buildingCategories[name] || 'Other',
              userId: user.id,
            },
          })
        )
      );

      await Promise.all(buildingPromises);
    } catch (error) {
      console.error("Error creating new buildings:", error);
      return NextResponse.json({
        error: "Database error",
        details: "Failed to save new buildings",
        code: "DB_CREATE_ERROR"
      }, { status: 500 });
    }

    return NextResponse.json({
      message: "Buildings saved successfully",
      details: "All building data has been updated"
    }, { status: 200 });
    
  } catch (error) {
    console.error("Unexpected error while saving buildings:", error);
    return NextResponse.json({
      error: "Internal server error",
      details: "An unexpected error occurred while processing your request",
      code: "INTERNAL_ERROR"
    }, { status: 500 });
  }
} 