import { motion } from "framer-motion";
import { Box, Flex } from "@chakra-ui/react";
export class Player {
  rank: number = 0;
  idx: number = 0;
  name: string = "플레이어1";
  battle_tag: string = "";
  mmr: number = 1000;
  streak: number = 0;
  point: number = 0;
  win: number = 0;
  lose: number = 0;
}

export class MMR {
  date:string = "";
  mmr:number = 0
}

export class Statistics {
  idx: number = 0;
  name: string = "플레이어1";
  
  Maker_ZvsZ_W: number = 0;
  Maker_ZvsZ_L: number = 0;
  Maker_ZvsT_W: number = 0;
  Maker_ZvsT_L: number = 0;
  Maker_ZvsP_W: number = 0;
  Maker_ZvsP_L: number = 0;
  Maker_TvsZ_W: number = 0;
  Maker_TvsZ_L: number = 0;
  Maker_TvsT_W: number = 0;
  Maker_TvsT_L: number = 0;
  Maker_TvsP_W: number = 0;
  Maker_TvsP_L: number = 0;
  Maker_PvsZ_W: number = 0;
  Maker_PvsZ_L: number = 0;
  Maker_PvsT_W: number = 0;
  Maker_PvsT_L: number = 0;
  Maker_PvsP_W: number = 0;
  Maker_PvsP_L: number = 0;

  Controller_ZvsZ_W: number = 0;
  Controller_ZvsZ_L: number = 0;
  Controller_ZvsT_W: number = 0;
  Controller_ZvsT_L: number = 0;
  Controller_ZvsP_W: number = 0;
  Controller_ZvsP_L: number = 0;
  Controller_TvsZ_W: number = 0;
  Controller_TvsZ_L: number = 0;
  Controller_TvsT_W: number = 0;
  Controller_TvsT_L: number = 0;
  Controller_TvsP_W: number = 0;
  Controller_TvsP_L: number = 0;
  Controller_PvsZ_W: number = 0;
  Controller_PvsZ_L: number = 0;
  Controller_PvsT_W: number = 0;
  Controller_PvsT_L: number = 0;
  Controller_PvsP_W: number = 0;
  Controller_PvsP_L: number = 0;
}

export class Goods {
  idx: number = 0;
  name: string ="";
  point: number = 0;
  count: number = 0;
  description:string = "";
  src:string = "";
  updated_at:string ="1900/01/01";
  created_at:string ="1900/01/01";
}

export class Fame {
  idx: number = 0;
  round: number = 1;
  name: string = "플레이어1";
  date: string = "1900/01/01";
}

export class Honors {
  rank: number = 0;
  idx: number = 0;
  name: string = "후원자1";
  point: string = "🪙";
}

export class Point {
  idx: number = 0;
  name: string = "";
  point: number = 0;
  type: string = "pay";
  description: string = "";
  updated_at: string = "1900/01/01";
  created_at: string = "1900/01/01";
}

export class Match {
  idx: number = 0;
  point: number = 1;

  team1_race: string = "";

  team1_player1_name: string = "";
  team1_player1_mmr: number = 0;
  team1_player1_mmr_changed: number = 0;
  team1_player1_streak: number = 0;

  team1_player2_name: string = "";
  team1_player2_mmr: number = 0;
  team1_player2_mmr_changed: number = 0;
  team1_player2_streak: number = 0;

  team2_race: string = "";

  team2_player1_name: string = "";
  team2_player1_mmr: number = 0;
  team2_player1_mmr_changed: number = 0;
  team2_player1_streak: number = 0;

  team2_player2_name: string = "";
  team2_player2_mmr: number = 0;
  team2_player2_mmr_changed: number = 0;
  team2_player2_streak: number = 0;

  winner: string = "0";
  created_at: Date = new Date();
  updated_at: Date = new Date();
  status: string = "play"

  is_champion: boolean = false;
}

export class LiveMatch extends Match {
  team1_player1_point: number = 0;
  team1_player2_point: number = 0;
  team2_player1_point: number = 0;
  team2_player2_point: number = 0;
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

export function formatDate_YMD(date: string | Date): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function formatDate_MD(date: string | Date): string {
  const d = new Date(date);

  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${month}/${day}`;
}

export function getEmoji(rank: number) {
  switch (rank) {
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

export function getChampionEmoji(streak: number) {
  if (streak % 10 >= 8) {
    return "🏆";
  }
  return "";
}

export function getOBSEmoji(rank: number) {
  switch (rank) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return "　 ";
  }
}

export function circleMask(num: number): string {
  return "🪙".repeat(num.toString().length);
}