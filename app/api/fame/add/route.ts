import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, name, round, date } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }

    const admin = await prisma.admin.findFirst({
      where: { token: token },
    });

    if (admin !== null) {
      if (!name || !date) {
        return NextResponse.json({ success: false, error: "이름, 날짜를 입력해주세요.", status: 500 });
      }

      if (!(Number(round) > 0)) {
        return NextResponse.json({ success: false, error: "회차가 유효하지 않습니다.\n회차는 숫자만 입력가능합니다.", status: 500 });
      }

      // 플레이어 유효성 검사
      const player = await prisma.player.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          }
        }
      });


      if(player === null) {
        return NextResponse.json({ success: false, error: "유효하지 않은 플레이어입니다.", status: 500 });
      }

      const create = await prisma.fame.create({
        data: {
          name: player.name,
          date: date,
          round: Number(round)
        }
      });

      return NextResponse.json({ success: true, status: 200 });
    }
    else {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }
  }
  catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });
  }
}