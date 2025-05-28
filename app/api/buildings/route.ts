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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { buildings } = await req.json() as { buildings: BuildingLevels };

    // Delete existing buildings for this user
    await prisma.building.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Get building categories from TH13_BUILDINGS
    const buildingCategories = TH13_BUILDINGS.reduce((acc, building) => {
      acc[building.name] = building.category;
      return acc;
    }, {} as Record<string, string>);

    // Create new buildings
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

    return NextResponse.json(
      { message: "Buildings saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving buildings:", error);
    return NextResponse.json(
      { error: "Error saving buildings" },
      { status: 500 }
    );
  }
} 