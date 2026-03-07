import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { page = 1, keyword = "", is_champion = false } = await request.json();

    const take = 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * take;

    const totalCount = await prisma.match.count({
      where:{
        status:"completed",
        ...(is_champion ? { is_champion: true } : {}),
        OR:[
          {
            team1_player1_name: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            team1_player2_name: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            team2_player1_name: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            team2_player2_name: {
              contains: keyword,
              mode: "insensitive",
            }
          }
        ]
      }
    });

    const data = await prisma.match.findMany({
      where: {
        status:"completed",
        ...(is_champion ? { is_champion: true } : {}),
        OR:[
          {
            team1_player1_name: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            team1_player2_name: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            team2_player1_name: {
              contains: keyword,
              mode: "insensitive",
            }
          },
          {
            team2_player2_name: {
              contains: keyword,
              mode: "insensitive",
            }
          }
        ]
      },
      skip,
      take,
      orderBy: {
        created_at: "desc", 
      },
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