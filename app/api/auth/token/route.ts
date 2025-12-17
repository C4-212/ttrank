import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
export async function POST(request: NextRequest) {
  // try {
  //   const { token } = await request.json();

  //   if (!token) {
  //     return NextResponse.json({ success: false }, { status: 400 });
  //   } 
    
  //   const admin = await prisma.admin.findFirst({ 
  //     where: { token }, 
  //   });

  //   return NextResponse.json({ success: admin !== null });

  // } catch (err) {
  //   console.error(err);
  //   return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });

  // }
}