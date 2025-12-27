import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

function getType(type:string)
{
  switch(type)
  {
    case "1": return "pay";
    case "2": return "receive";

    default: return "pay";
  }
}

function getDescription(description:string)
{
  switch(description)
  {
    case "1": return "상품교환";
    case "2": return "매치포인트";
    case "3": return "관리자";

    default: return "관리자";
  }
}
export async function POST(request: NextRequest) {
  try {
    const { token, name, type, description, point } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }

    const admin = await prisma.admin.findFirst({
      where: { token: token },
    });

    if (admin !== null) {
      if (!name || !type || !description) {
        return NextResponse.json({ success: false, error: "정보를 입력해주세요.", status: 500 });
      }

      if(!(Number(point) > 0 && Number(point) <= 10000)){
        return NextResponse.json({ success: false, error: "1 ~ 10000 사이의 포인트만 적용 가능합니다.", status: 500 });
      }

      // 플레이어 유효성 체크
      const player = await prisma.player.findFirst({ where: { name: name } });

      if (player == null) {
        return NextResponse.json({ success: false, error: "플레이어 정보가 유효하지 않습니다.", status: 500 });
      }

      // 플레이어 포인트 잔액 확인
      if(type=="pay" && player.point < point){
        return NextResponse.json({ success: false, error: "플레이어 포인트가 부족합니다.", status: 500 });
      }


      // 포인트 내역 등록
      const create = await prisma.point.create({
        data: {
          name: name,
          type: getType(type),
          description: getDescription(description),
          point: Number(point)
        }
      });

      // 유저 포인트 적용
      const player_trans = await prisma.player.update(
        {
          where: { name: name },
          data: {
            point: (getType(type) == "pay") ? player.point - Number(point) : player.point + Number(point),
            updated_at: new Date()
          }
        }
      );

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