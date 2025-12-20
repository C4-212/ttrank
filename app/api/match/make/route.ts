import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { 
        token,
        team1_player1_name, 
        team1_player2_name,
        team2_player1_name,
        team2_player2_name,
    } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token }, 
    });

    // 매치 유효성 체크
    const live_match = await prisma.match.findFirst({
      where:{status:"play"}
    })
    
    if(live_match != null) {
      return NextResponse.json({ success: false, error: "이미 진행중인 경기가 있습니다.", status: 500 });
    }

    // 플레이어 유효성 체크
    const team1_player1 = await prisma.player.findFirst({ where: { name: team1_player1_name } });
    const team1_player2 = await prisma.player.findFirst({ where: { name: team1_player2_name } });
    const team2_player1 = await prisma.player.findFirst({ where: { name: team2_player1_name } });
    const team2_player2 = await prisma.player.findFirst({ where: { name: team2_player2_name } });

    if(admin !== null){
        if (!team1_player1 || !team1_player2 || !team2_player1 || !team2_player2) {
            return NextResponse.json({ success: false, error: "매치 플레이어 정보가 유효하지 않습니다.", status: 500 });
        }

        const create = await prisma.match.create({
            data: {
                team1_player1_name: team1_player1.name,
                team1_player1_mmr: team1_player1.mmr,
                team1_player1_streak: team1_player1.streak,

                team1_player2_name: team1_player2.name,
                team1_player2_mmr: team1_player2.mmr,
                team1_player2_streak: team1_player2.streak,

                team2_player1_name: team2_player1.name,
                team2_player1_mmr: team2_player1.mmr,
                team2_player1_streak: team2_player1.streak,

                team2_player2_name: team2_player2.name,
                team2_player2_mmr: team2_player2.mmr,
                team2_player2_streak: team2_player2.streak,
            }
        });

        return NextResponse.json({ success: true, status: 200 } );
    }
    else
    {
        return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }
  } 
  catch (err) 
  {
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });
  }
}