import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function circleMask(num: number): string {
  return "🪙".repeat(num.toString().length);
}

export async function POST(request: NextRequest) {
  try {
    const { page = 1 } = await request.json();

    const take = 20;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * take;

    const totalCount = await prisma.honors.count();

    const data = await prisma.honors.findMany({
      skip,
      take,
      orderBy: {
        point: "desc",
      },
    });

    // rank 추가
    const rankedData = data.map((honors, index) => ({
      name:honors.name,
      idx:honors.idx,
      point: circleMask(honors.point),
      rank: skip + index + 1,
    }));

    const totalPage = Math.ceil(totalCount / take);

    return NextResponse.json({
      success: true,
      data:rankedData,
      pagination: {
        page: currentPage,
        totalPage,
        totalCount,
      },
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