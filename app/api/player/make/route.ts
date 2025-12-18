import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, name, battle_tag } = await request.json();

    console.log (token, name, battle_tag);
    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token }, 
    });

    if(admin !== null){
        if (!name || !battle_tag) {
            return NextResponse.json({ success: false, error: "이름, 배틀코드를 입력해주세요.", status: 500 });
        }

        const create = await prisma.player.create({
            data: {
                name: name,
                battle_tag: battle_tag
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