import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { page = 1, keyword = "", rankingType = "mmr" } = await request.json();

    const take = 20;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * take;

    const orderBy =
      rankingType === "point" ? [{ point: "desc" as const }, { name: "asc" as const }] :
        rankingType === "mmr"? [{ mmr: "desc" as const }, { name: "asc" as const }] : 
        [{ streak: "desc" as const }, { name: "asc" as const }];

    const totalCount = await prisma.player.count({
      where:{
        name:{
          contains: keyword,
          mode: "insensitive"
      }}
    });

    const data = await prisma.player.findMany({
      where:{
        name:{
          contains: keyword,
          mode: "insensitive",
      }},
      skip:skip,
      take:take,
      orderBy:orderBy,
    });

    // rank 추가
    const rankedData = data.map((player, index) => ({
      ...player,
      rank: skip + index + 1,
    }));
    const totalPage = totalCount === 0 ? 1 : Math.ceil(totalCount / take);

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