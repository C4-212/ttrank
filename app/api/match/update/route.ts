import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { 
        token,
        idx,
        status
    } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token }, 
    });

    if(admin !== null){
        if (!status) {
            return NextResponse.json({ success: false, error: "매치 정보가 유효하지 않습니다.", status: 500 });
        }

        const update = await prisma.match.update({
            where: { idx: idx },
            data: {
                status: status
            }
        });
    }
    else
    {
        return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    }

    return NextResponse.json({ success: true, status: 200 } );
  } 
  catch (err) 
  {
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });
  }
}