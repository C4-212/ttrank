import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: any
) {
  try {
    const idx = Number(params.id);

    if (isNaN(idx)) {
      return NextResponse.json({
        success: false,
        error: "잘못된 ID",
      }, { status: 400 });
    }

    const data = await prisma.goods.findFirst({
      where: { idx },
    });

    if (!data) {
      return NextResponse.json({
        success: false,
        error: "상품이 존재하지 않습니다.",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: "서버 에러",
    }, { status: 500 });
  }
}