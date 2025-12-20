import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await prisma.player.findMany({
      orderBy: {
        streak: "desc",
      },
    });

    // rank 추가
    const rankedData = data.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    return NextResponse.json({
      success: true,
      data:rankedData,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "서버 에러",
      status: 500,
    });
  }
}