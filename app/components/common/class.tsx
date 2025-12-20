import { motion } from "framer-motion";
import { Box, Flex } from "@chakra-ui/react";
export class Player
{
    rank:number = 0;
    idx:number = 0;
    name:string = "플레이어1";
    battle_tag:string = "";
    mmr:number = 1000;
    streak:number = 0;
    point:number = 0;
    win:number = 0;
    lose:number = 0;
}

export class Match
{
    idx:number = 0;

    team1_player1_name:string = "";
    team1_player1_mmr:number = 0;
    team1_player1_mmr_changed:number = 0;
    team1_player1_streak:number = 0;

    team1_player2_name:string = "";
    team1_player2_mmr:number = 0;
    team1_player2_mmr_changed:number = 0;
    team1_player2_streak:number = 0;

    team2_player1_name:string = "";
    team2_player1_mmr:number = 0;
    team2_player1_mmr_changed:number = 0;
    team2_player1_streak:number = 0;

    team2_player2_name:string = "";
    team2_player2_mmr:number = 0;
    team2_player2_mmr_changed:number = 0;
    team2_player2_streak:number = 0;

    winner:string = "0";
    created_at:Date = new Date();
    updated_at:Date = new Date();
    status:string = "play"
}

export const MotionBox = motion(Box);
export const MotionFlex = motion(Flex);

export const CardAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function formatDate(date: string | Date): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function getEmoji(rank: number) {
  switch(rank)
  {
    case 1: return "1️⃣";
    case 2: return "2️⃣";
    case 3: return "3️⃣";
    case 4: return "4️⃣";
    case 5: return "5️⃣";
    case 6: return "6️⃣";
    case 7: return "7️⃣";
    case 8: return "8️⃣";
    case 9: return "9️⃣";
    case 10: return "🔟";
  }
}