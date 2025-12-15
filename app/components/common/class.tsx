export class WinningStreaker
{
    rank:number = 0;
    rank_emoji:string = "";
    player_name:string = "";
    player_battle_tag:string = "";
    streak:number = 0;
}

export class Player
{
    player_name:string = "홍길동";
    player_battle_tag:string = "#배틀태그";
    player_mmr:number = 1500;
    streak:number = 0;
}

export class MatchPlayer
{
    team1_player1:Player = new Player;
    team1_player2:Player = new Player;
    team2_player1:Player = new Player;
    team2_player2:Player = new Player;
    win_rate:number = 0;
}