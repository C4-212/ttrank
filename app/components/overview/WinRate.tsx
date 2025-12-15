import { MatchPlayer } from "../common/class";

// 승률 계산
export default function WinRate({ matchPlayer }: { matchPlayer: MatchPlayer }) {

    const n0:number = matchPlayer.team1_player1.player_mmr;
    const n1:number = matchPlayer.team1_player2.player_mmr;
    const e0:number = matchPlayer.team2_player1.player_mmr;
    const e1:number = matchPlayer.team2_player2.player_mmr;

    const nSum:number = n0 + n1;
    const eSum:number = e0 + e1;

    const w0:number = 1 / (1+Math.pow(10,((eSum-nSum)/400)));
    const w1:number = 1 / (1+Math.pow(10,((nSum-eSum)/400)));

  return {winrate_1:w0, winrate_2:w1};
}