import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token:token }, 
    });

    return NextResponse.json({ success: admin !== null, status : 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "서버 에러", status: 500 });

  }
}