import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await prisma.match.findFirst({
        where: { status: "play" },  
      orderBy: { created_at: "desc", },
    });

    const result = {
      ...data,
      team1_player1_point:0,
      team1_player2_point:0,
      team2_player1_point:0,
      team2_player2_point:0
    };

    if (data != null) {
      const team1_player1 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:data.team1_player1_name,
            mode: 'insensitive'
          } 
        }
      });


      const team1_player2 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:data.team1_player2_name,
            mode: 'insensitive'
          } 
        }
      });
      const team2_player1 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:data.team2_player1_name,
            mode: 'insensitive'
          } 
        }
      });
      const team2_player2 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:data.team2_player2_name,
            mode: 'insensitive'
          } 
        }
      });

      if(team1_player1 != null && team1_player2 != null && team2_player1 != null && team2_player2 != null) {
        result.team1_player1_point = team1_player1.point;
        result.team1_player2_point = team1_player2.point;
        result.team2_player1_point = team2_player1.point;
        result.team2_player2_point = team2_player2.point;
      }
    }

    return NextResponse.json({
      success: true,
      data: data == null ? null : result,
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
