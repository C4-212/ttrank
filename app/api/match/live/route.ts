import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await prisma.match.findFirst({
        where: { status: "play" },  
      orderBy: { created_at: "desc", },
    });

    return NextResponse.json({
      success: true,
      data:data,
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
