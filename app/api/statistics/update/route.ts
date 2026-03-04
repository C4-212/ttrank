import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const {
            token,
            team1_player1_name = "",
            team1_player2_name = "",
            team2_player1_name = "",
            team2_player2_name = "",
            team1_race = "",
            team2_race = "",
            winner = 0
        } = await request.json();

        if (!token) {
            return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
        }

        const admin = await prisma.admin.findFirst({
            where: { token: token },
        });

        if (admin !== null) {
            // 모든 유저 통계 업데이트 (관리자 기능)
            // const matchList = await prisma.match.findMany({});

            // for (const match of matchList) {
            //     if(match.status != "completed" || match.winner == "") {
            //         continue;
            //     }

            //     const result_1 = match.winner == "1" ? "W" : "L";
            //     const result_2 = match.winner == "2" ? "W" : "L";

            //     const name_1 = match.team1_player1_name;
            //     const name_2 = match.team1_player2_name;

            //     const name_3 = match.team2_player1_name;
            //     const name_4 = match.team2_player2_name;

            //     const fieldName_1 = `Maker_${match.team1_race}vs${match.team2_race}_${result_1}`;
            //     const fieldName_2 = `Controller_${match.team1_race}vs${match.team2_race}_${result_1}`;

            //     const fieldName_3 = `Maker_${match.team2_race}vs${match.team1_race}_${result_2}`;
            //     const fieldName_4 = `Controller_${match.team2_race}vs${match.team1_race}_${result_2}`;

            //     // 플레이어 1
            //     await prisma.statistics.update({
            //         where: { name:name_1 },
            //         data: {
            //             [fieldName_1]: {
            //                 increment: 1,
            //             },
            //         },
            //     });

            //     if (name_1 != name_2) {
            //         // 플레이어 2
            //         await prisma.statistics.update({
            //             where: { name: name_2 },
            //             data: {
            //                 [fieldName_2]: {
            //                     increment: 1,
            //                 },
            //             },
            //         });
            //     }

            //     // 플레이어 3
            //     await prisma.statistics.update({
            //         where: { name:name_3 },
            //         data: {
            //             [fieldName_3]: {
            //                 increment: 1,
            //             },
            //         },
            //     });

            //     if (name_3 != name_4) {
            //         // 플레이어 4
            //         await prisma.statistics.update({
            //             where: { name: name_4 },
            //             data: {
            //                 [fieldName_4]: {
            //                     increment: 1,
            //                 },
            //             },
            //         });
            //     }
            // }


            // 통계 데이터 업데이트
            if (team1_player1_name == "" || team1_player2_name == "" || team2_player1_name == "" || team2_player2_name == ""
                || team1_race == "" || team2_race == "" || winner == 0) 
            {
                return NextResponse.json({ success: false, error: "매치 정보가 유효하지 않습니다.", status: 500 });
            }

            const result_1 = winner == "1" ? "W" : "L";
            const result_2 = winner == "2" ? "W" : "L";

            const name_1 = team1_player1_name;
            const name_2 = team1_player2_name;

            const name_3 = team2_player1_name;
            const name_4 = team2_player2_name;

            const fieldName_1 = `Maker_${team1_race}vs${team2_race}_${result_1}`;
            const fieldName_2 = `Controller_${team1_race}vs${team2_race}_${result_1}`;

            const fieldName_3 = `Maker_${team2_race}vs${team1_race}_${result_2}`;
            const fieldName_4 = `Controller_${team2_race}vs${team1_race}_${result_2}`;

            // 플레이어 1
            await prisma.statistics.update({
                where: { name:name_1 },
                data: {
                    [fieldName_1]: {
                        increment: 1,
                    },
                },
            });


            if (name_1 != name_2) {
                // 플레이어 2
                await prisma.statistics.update({
                    where: { name: name_2 },
                    data: {
                        [fieldName_2]: {
                            increment: 1,
                        },
                    },
                });
            }

            // 플레이어 3
            await prisma.statistics.update({
                where: { name:name_3 },
                data: {
                    [fieldName_3]: {
                        increment: 1,
                    },
                },
            });

            if (name_3 != name_4) {
                // 플레이어 4
                await prisma.statistics.update({
                    where: { name: name_4 },
                    data: {
                        [fieldName_4]: {
                            increment: 1,
                        },
                    },
                });
            }


            // 결과 출력
            return NextResponse.json({
                success: true,
                status: 200
            });
        }
        else {
            return NextResponse.json({ success: false, error: "유효하지 않은 접근입니다.", status: 500 });
        }
    } catch (err) {
        return NextResponse.json({
            success: false,
            error: "서버 에러",
            status: 500
        });
    }
}