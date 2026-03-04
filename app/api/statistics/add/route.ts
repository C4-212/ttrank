import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { token, name = "" } = await request.json();

        if (!token) {
            return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
        }

        const admin = await prisma.admin.findFirst({
            where: { token: token },
        });

        if (admin !== null) {
            // // 모든 유저 생성 (어드민 기능)
            // const playerList = await prisma.player.findMany({});

            // for (const player of playerList) {
            //     await prisma.statistics.create({
            //         data: {
            //             name: player.name,
            //         },
            //     });
            // }

            // // 신규 통계 생성
            if (!name) {
                return NextResponse.json({
                    success: false,
                    error: "이름을 입력해주세요",
                    status: 400 
                });
            }

            const create = await prisma.statistics.create({
                data:{
                    name: name
                }
            });

            return NextResponse.json({
                success: true,
                status: 200 
            });
        }
        else
        {
            return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
        }

    } catch (err) {
        return NextResponse.json({
            success: false,
            error: "서버 에러",
        }, { status: 500 });
    }
}