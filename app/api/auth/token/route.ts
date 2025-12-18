import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      throw new Error("유효하지 않은 접근입니다.");
    } 
    
    const admin = await prisma.admin.findFirst({ 
      where: { token }, 
    });

    return NextResponse.json({ success: admin !== null, status : 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err, status: 500 });

  }
}