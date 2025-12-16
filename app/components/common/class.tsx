import { motion } from "framer-motion";
import { Box, Flex } from "@chakra-ui/react";
export class WinningStreaker
{
    rank:number = 0;
    rank_emoji:string = "";
    player_name:string = "";
    player_battle_tag:string = "";
    player_mmr:number = 1500;
    streak:number = 0;
}

export class Player
{
    player_name:string = "홍길동";
    player_battle_tag:string = "얼어붙은발바닥#323951";
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

export const MotionBox = motion(Box);
export const MotionFlex = motion(Flex);

export const CardAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};