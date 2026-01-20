import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function getRace(race:string)
{
  switch(race)
  {
    case "1": return "Z";
    case "2": return "T";
    case "3": return "P";

    default: return "Z";
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      token,
      team1_race,
      team1_player1_name,
      team1_player2_name,

      team2_race,
      team2_player1_name,
      team2_player2_name,
      point="1",
      is_champion=false,
    } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }

    const admin = await prisma.admin.findFirst({
      where: { token: token },
    });

    // 매치 유효성 체크
    const live_match = await prisma.match.findFirst({
      where: { status: "play" }
    })

    if (live_match != null) {
      return NextResponse.json({ success: false, error: "이미 진행중인 경기가 있습니다.", status: 500 });
    }

    if (!(Number(point) > 0 && Number(point) <= 10000)) {
      return NextResponse.json({ success: false, error: "1 ~ 10000 사이의 포인트만 적용 가능합니다.", status: 500 });
    }

    // 플레이어 유효성 체크
    const team1_player1 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:team1_player1_name,
            mode: 'insensitive'
          } 
        }
      });


      const team1_player2 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:team1_player2_name,
            mode: 'insensitive'
          } 
        }
      });
      const team2_player1 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:team2_player1_name,
            mode: 'insensitive'
          } 
        }
      });
      const team2_player2 = await prisma.player.findFirst({ 
        where: { 
          name: {
            equals:team2_player2_name,
            mode: 'insensitive'
          } 
        }
      });

    if (admin !== null) {
      if (team1_player1 == null || team1_player2 == null || team2_player1 == null || team2_player2 == null) {
        return NextResponse.json({ success: false, error: "매치 플레이어 정보가 유효하지 않습니다.", status: 500 });
      }

      // 챔피언 매치 조건 검사 (8연승 이상)
      if(is_champion == false)
      {
        if(team1_player1.streak%10 >= 8 || team1_player2.streak%10 >= 8 || team2_player1.streak%10 >= 8 || team2_player2.streak%10 >= 8) {
          return NextResponse.json({ success: false, error: "8연승 이상 플레이어는 챔피언 매치를 진행해야 합니다.", status: 500 });
        }
      }

      if(team1_race == "" || team2_race == "")
        return NextResponse.json({ success: false, error: "종족이 선택되지 않았습니다.", status: 500 });

      const create = await prisma.match.create({
        data: {
          point:Number(point),

          team1_race: getRace(team1_race),

          team1_player1_name: team1_player1.name,
          team1_player1_mmr: team1_player1.mmr,
          team1_player1_streak: team1_player1.streak,

          team1_player2_name: team1_player2.name,
          team1_player2_mmr: team1_player2.mmr,
          team1_player2_streak: team1_player2.streak,

          team2_race: getRace(team2_race),

          team2_player1_name: team2_player1.name,
          team2_player1_mmr: team2_player1.mmr,
          team2_player1_streak: team2_player1.streak,

          team2_player2_name: team2_player2.name,
          team2_player2_mmr: team2_player2.mmr,
          team2_player2_streak: team2_player2.streak,

          is_champion: is_champion,
        }
      });

      return NextResponse.json({ success: true, status: 200 });
    }
    else {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }
  }
  catch (err) {
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });
  }
}