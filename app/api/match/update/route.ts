import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { AddMMR, SubtractMMR } from "@/app/components/common/mmr"

export async function POST(request: NextRequest) {
  try {
    const {
      token,
      idx,
      winner,
      status,
      point="1"
    } = await request.json();

    const change_mmr = {
      team1_player1_mmr_changed: 0,
      team1_player2_mmr_changed: 0,
      team2_player1_mmr_changed: 0,
      team2_player2_mmr_changed: 0,
    }

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }

    const admin = await prisma.admin.findFirst({
      where: { token:token },
    });

    if (admin !== null) {
      if (!idx || !status) {
        return NextResponse.json({ success: false, error: "매치 정보가 유효하지 않습니다.", status: 500 });
      }

      // MMR 및 연승 변동
      if (winner != "") {
        // 매치 정보 가져오기
        const match = await prisma.match.findFirst({ where: { idx: idx } });

        if (!match) {
          return NextResponse.json({ success: false, error: "매치 정보가 유효하지 않습니다.", status: 500 });
        }

        // 플레이어 유효성 체크
        const team1_player1 = await prisma.player.findFirst({ where: { name: match.team1_player1_name } });
        const team1_player2 = await prisma.player.findFirst({ where: { name: match.team1_player2_name } });
        const team2_player1 = await prisma.player.findFirst({ where: { name: match.team2_player1_name } });
        const team2_player2 = await prisma.player.findFirst({ where: { name: match.team2_player2_name } });

        if (!team1_player1 || !team1_player2 || !team2_player1 || !team2_player2) {
          return NextResponse.json({ success: false, error: "매치 플레이어 정보가 유효하지 않습니다.", status: 500 });
        }

        if (!(Number(point) > 0 && Number(point) <= 10000)) {
          return NextResponse.json({ success: false, error: "1 ~ 10000 사이의 포인트만 적용 가능합니다.", status: 500 });
        }

        // MMR 계산 및 연승 정보 변경
        const team1_mmr = match.team1_player1_mmr + match.team1_player2_mmr;
        const team2_mmr = match.team2_player1_mmr + match.team2_player2_mmr;

        change_mmr.team1_player1_mmr_changed =
          (winner == "1") ?
            AddMMR(match.team1_player1_mmr, team1_mmr, team2_mmr) :
            SubtractMMR(match.team1_player1_mmr, team1_mmr, team2_mmr);

        const team1_player1_trans = await prisma.player.update(
          {
            where: { name: match.team1_player1_name },
            data: {
              mmr: match.team1_player1_mmr + change_mmr.team1_player1_mmr_changed,
              streak: (winner == "1") ? match.team1_player1_streak + 1 : 0,
              point: (winner == "1") ? team1_player1.point + Number(point) : team1_player1.point,
              win: (winner == "1") ? team1_player1.win + 1 : team1_player1.win,
              lose: (winner == "1") ? team1_player1.lose : team1_player1.lose + 1,
              updated_at: new Date()
            }
          }
        );

        change_mmr.team1_player2_mmr_changed =
          (winner == "1") ?
            AddMMR(match.team1_player2_mmr, team1_mmr, team2_mmr) :
            SubtractMMR(match.team1_player2_mmr, team1_mmr, team2_mmr);


        // 1:1 or 2:1 경기 에외처리
        if (team1_player1.name != team1_player2.name) {
          const team1_player2_trans = await prisma.player.update(
            {
              where: { name: match.team1_player2_name },
              data: {
                mmr: match.team1_player2_mmr + change_mmr.team1_player2_mmr_changed,
                streak: (winner == "1") ? match.team1_player2_streak + 1 : 0,
                point: (winner == "1") ? team1_player2.point + Number(point) : team1_player2.point,
                win: (winner == "1") ? team1_player2.win + 1 : team1_player2.win,
                lose: (winner == "1") ? team1_player2.lose : team1_player2.lose + 1,
                updated_at: new Date()
              }
            }
          );
        }

        change_mmr.team2_player1_mmr_changed =
          (winner == "2") ?
            AddMMR(match.team2_player1_mmr, team2_mmr, team1_mmr) :
            SubtractMMR(match.team2_player1_mmr, team2_mmr, team1_mmr);

        const team2_player1_trans = await prisma.player.update(
          {
            where: { name: match.team2_player1_name },
            data: {
              mmr: match.team2_player1_mmr + change_mmr.team2_player1_mmr_changed,
              streak: (winner == "2") ? match.team2_player1_streak + 1 : 0,
              point: (winner == "2") ? team2_player1.point + Number(point) : team2_player1.point,
              win: (winner == "2") ? team2_player1.win + 1 : team2_player1.win,
              lose: (winner == "2") ? team2_player1.lose : team2_player1.lose + 1,
              updated_at: new Date()
            }
          }
        );

        
          change_mmr.team2_player2_mmr_changed =
            (winner == "2") ?
              AddMMR(match.team2_player2_mmr, team2_mmr, team1_mmr) :
              SubtractMMR(match.team2_player2_mmr, team2_mmr, team1_mmr);

        // 1:1 or 2:1 경기 에외처리
        if (team2_player1.name != team2_player2.name) {
          const team2_player2_trans = await prisma.player.update(
            {
              where: { name: match.team2_player2_name },
              data: {
                mmr: match.team2_player2_mmr + change_mmr.team2_player2_mmr_changed,
                streak: (winner == "2") ? match.team2_player2_streak + 1 : 0,
                point: (winner == "2") ? team2_player2.point + Number(point) : team2_player2.point,
                win: (winner == "2") ? team2_player2.win + 1 : team2_player2.win,
                lose: (winner == "2") ? team2_player2.lose : team2_player2.lose + 1,
                updated_at: new Date()
              }
            }
          );
        }
      }

      const update = await prisma.match.update({
        where: { idx: idx },
        data: {
          winner: winner,
          status: status,
          updated_at: new Date(),
          ...change_mmr
        }
      });

      return NextResponse.json({ success: true, data: update, status: 200 });
    }
    else {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }
  }
  catch (err) {
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });
  }
}
