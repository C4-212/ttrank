import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { name = "" } = await request.json();

        if (name == "") {
            return NextResponse.json({ success: false, error: "유효하지 않은 플레이어입니다.", status: 500 });
        }

        const data = await prisma.$queryRaw`
            SELECT *
            FROM (
                SELECT DISTINCT ON (DATE(created_at))
                    DATE(created_at) as raw_date,
                    TO_CHAR(created_at, 'MM/DD') AS date,
                    CASE
                        WHEN team1_player1_name = ${name} THEN team1_player1_mmr
                        WHEN team1_player2_name = ${name} THEN team1_player2_mmr
                        WHEN team2_player1_name = ${name} THEN team2_player1_mmr
                        WHEN team2_player2_name = ${name} THEN team2_player2_mmr
                    END AS mmr
                FROM "match"
                WHERE status = 'completed'
                AND (
                    team1_player1_name = ${name}
                    OR team1_player2_name = ${name}
                    OR team2_player1_name = ${name}
                    OR team2_player2_name = ${name}
                )
                ORDER BY DATE(created_at) DESC, created_at DESC
                LIMIT 10
            ) t
            ORDER BY raw_date ASC;
            `;

        return NextResponse.json({
            success: true,
            data: data,
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            error: "서버 에러",
            status: 500,
        });
    }
}