import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { buildingId, duration } = await req.json();
  if (!buildingId || !duration) {
    return NextResponse.json(
      { error: "Missing buildingId or duration" },
      { status: 400 }
    );
  }
  // Get builder hut count from buildings table (count the number of Builder Hut rows)
  const builderHuts = await prisma.building.findMany({
    where: { userId: session.user.id, name: "Builder's Hut" },
  });
  const totalBuilders = builderHuts.length;
  if (!totalBuilders) {
    return NextResponse.json(
      { error: "No builder huts available" },
      { status: 400 }
    );
  }
  // Get all in-progress upgrades for the user
  const upgrades = await prisma.buildingUpgrade.findMany({
    where: { userId: session.user.id },
  });
  if (upgrades.length >= totalBuilders) {
    return NextResponse.json(
      { error: "All builders are busy" },
      { status: 400 }
    );
  }
  // Create the upgrade (no builderId needed)
  const now = new Date();
  const end = new Date(now.getTime() + duration * 1000);
  const upgrade = await prisma.buildingUpgrade.create({
    data: {
      buildingId,
      userId: session.user.id,
      startTime: now,
      endTime: end,
    },
    include: { building: true },
  });
  return NextResponse.json(upgrade);
}

// GET /api/buildings/upgrades
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const upgrades = await prisma.buildingUpgrade.findMany({
    where: { userId: session.user.id },
    include: { building: true, builder: true },
    orderBy: { startTime: "asc" },
  });
  return NextResponse.json(upgrades);
}

// PATCH /api/buildings/upgrade/complete
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { upgradeId, force } = await req.json();
  if (!upgradeId) {
    return NextResponse.json({ error: "Missing upgradeId" }, { status: 400 });
  }
  // Find the upgrade
  const upgrade = await prisma.buildingUpgrade.findUnique({
    where: { id: upgradeId },
    include: { building: true },
  });
  if (!upgrade) {
    return NextResponse.json({ error: "Upgrade not found" }, { status: 404 });
  }
  if (!force && upgrade.endTime > new Date()) {
    return NextResponse.json(
      { error: "Upgrade not yet complete" },
      { status: 400 }
    );
  }
  // Update the building's level
  await prisma.building.update({
    where: { id: upgrade.buildingId },
    data: { level: { increment: 1 } },
  });
  // Delete the upgrade record
  await prisma.buildingUpgrade.delete({ where: { id: upgradeId } });
  return NextResponse.json({ success: true });
}

// DELETE /api/buildings/upgrades/cancel
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { upgradeId } = await req.json();
  if (!upgradeId) {
    return NextResponse.json({ error: "Missing upgradeId" }, { status: 400 });
  }
  // Just delete the upgrade record (no need to increment count)
  await prisma.buildingUpgrade.delete({ where: { id: upgradeId } });
  return NextResponse.json({ success: true });
}
