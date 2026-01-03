import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, name, point, count } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token:token }, 
    });

    if(admin !== null){
        if (!name) {
            return NextResponse.json({ success: false, error: "이름을 입력해주세요.", status: 500 });
        }

        if (!(Number(count) >= 0 && Number(count) <= 10000)) {
          return NextResponse.json({ success: false, error: "0 ~ 10000 사이의 개수만 적용 가능합니다.", status: 500 });
        }

        if (!(Number(point) >= 0 && Number(point) <= 10000)) {
          return NextResponse.json({ success: false, error: "0 ~ 10000 사이의 포인트만 적용 가능합니다.", status: 500 });
        }

        const create = await prisma.goods.create({
            data: {
                name: name,
                point: Number(point),
                count: Number(count)
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
    console.log(err);
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });
  }
}