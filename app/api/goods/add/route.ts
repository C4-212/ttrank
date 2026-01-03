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
        if (!name || !point || !count) {
            return NextResponse.json({ success: false, error: "이름, 포인트, 수량을 입력해주세요.", status: 500 });
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