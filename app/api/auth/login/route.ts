import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/app/components/common/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, password } = await req.json();
    if (!id || !password) {
      return NextResponse.json({
        success: false, message: "아이디와 비밀번호를 입력하세요."
      }, { status: 400 });
    }

    const admin = await prisma.admin.findFirst({
      where: { id, password }
    });


    if (!admin) {
      return NextResponse.json({ success: false, message: "로그인 실패: 계정 정보가 일치하지 않습니다." }, { status: 401 });
    }

    const newToken = generateToken();
    const updated = await prisma.admin.update({
      where: { idx: admin.idx },
      data: {
        token: newToken,
        updated_at: new Date()
      }
    });

    return NextResponse.json({
      success: true, data: {
        idx: updated.idx,
        id: updated.id,
        token: updated.token
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "서버 오류", error: String(error) }, { status: 500 });
  }
}