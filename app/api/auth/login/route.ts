import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/app/components/common/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, password } = await req.json();
    if (!id || !password) {
      throw new Error("아이디, 비밀번호을 입력해주세요.");
    }

    const admin = await prisma.admin.findFirst({
      where: { id, password }
    });


    if (!admin) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
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
    return NextResponse.json({ success: false, error: error, status: 500 });
  }
}