import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, name, battle_tag } = await request.json();

    console.log (token, name, battle_tag);
    if (!token) {
      throw new Error("유효하지 않은 접근입니다.");
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token }, 
    });

    if(admin !== null){
        if (!name || !battle_tag) {
            throw new Error("이름, 배틀코드를 입력해주세요.");
        }

        const create = await prisma.player.create({
            data: {
                name: name,
                battle_tag: battle_tag
            }
        });

        console.log(create);

        return NextResponse.json({ success: true, status: 200 } );
    }
    else
    {
        throw new Error("유효하지 않은 접근입니다.");
    }
  } 
  catch (err) 
  {
    console.log(err);
    return NextResponse.json({ success: false, error: err, status: 500 });
  }
}