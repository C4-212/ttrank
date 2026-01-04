import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, name, point } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token:token }, 
    });

    if(admin !== null){
        if (!name || !point) {
            return NextResponse.json({ success: false, error: "이름을 입력해주세요.", status: 500 });
        }

        if(!(Number(point) > 0))
        {
            return NextResponse.json({ success: false, error: "후원금이 유효하지 않습니다.\n후원금은 숫자만 입력가능합니다.", status: 500 });
        }

        const honors = await prisma.honors.findFirst({
            where: { name:name },
        });

        if(honors !== null)
        {
            const update = await prisma.honors.update({
                where : {
                    name: name
                },
                data: {
                    point: honors.point + Number(point),
                    updated_at: new Date()
                }
            });
        }
        else 
        {
            const create = await prisma.honors.create({
                data: {
                    name: name,
                    point: Number(point)
                }
            });
        }

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