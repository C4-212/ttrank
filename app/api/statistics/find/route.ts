import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, name = "" } = await request.json();

    if (!name) {
      return NextResponse.json({
        success: false,
        error: "이름을 입력해주세요",
        status: 400 
    });
    }

    const playerStatistics = await prisma.statistics.findFirst({
      where: { name },
    });

    if (!playerStatistics) {
        return NextResponse.json({
            success: false,
            error: "통계 정보가 존재하지 않습니다.",
            status: 404
        });
    }

    return NextResponse.json({
      success: true,
      data:playerStatistics,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "서버 에러",
      status: 500 
    });
  }
}