import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { page = 1 } = await request.json();

    const take = 20;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * take;

    const totalCount = await prisma.fame.count();

    const data = await prisma.fame.findMany({
      skip:skip,
      take:take,
      orderBy: [
        { round: "desc" },
        { name: "asc"}
      ],
    });

    const totalPage = totalCount === 0 ? 1 : Math.ceil(totalCount / take);

    return NextResponse.json({
      success: true,
      data:data,
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