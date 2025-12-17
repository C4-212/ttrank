import { MatchPlayer } from "@/app/components/common/class";

// 승률 계산
export default function WinRate(matchPlayer: MatchPlayer) {

    const n0:number = matchPlayer.team1_player1.player_mmr;
    const n1:number = matchPlayer.team1_player2.player_mmr;
    const e0:number = matchPlayer.team2_player1.player_mmr;
    const e1:number = matchPlayer.team2_player2.player_mmr;

    // console.log("n0 : " + n0);
    // console.log("n1 : " + n1);
    // console.log("e0 : " + e0);
    // console.log("e1 : " + e1);

    const nSum:number = n0 + n1;
    const eSum:number = e0 + e1;

    // console.log("nSum : " + nSum);
    // console.log("eSum : " + eSum);

    const w0:number = 1 / (1+Math.pow(10,((eSum-nSum)/400)));
    const w1:number = 1 / (1+Math.pow(10,((nSum-eSum)/400)));

    const winrate_1:string = (w0*100).toFixed(2)+"%";
    const winrate_2:string = (w1*100).toFixed(2)+"%";

    // console.log("winrate_1 : " + winrate_1);
    // console.log("winrate_2 : " + winrate_2);

  return {winrate_1:winrate_1, winrate_2:winrate_2};
}