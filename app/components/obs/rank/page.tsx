"use client";

import { Box, Text } from "@chakra-ui/react";
import { Player, getOBSEmoji} from "@/app/components/common/class";
import { useState, useEffect } from "react";

export default function OverviewPage() {
  const [leaderboard, setLeaderBoard] = useState<Player[] | null>(null);

  useEffect(() => {
    const streak_rank_list = async () => {
      const res = await fetch("/api/player/streak_rank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      const player_data = await res.json();

      if (player_data.data !== null) {
        setLeaderBoard(player_data.data);
      }
    }
    streak_rank_list();
  }, []);

  return (
    <Box
      position="fixed"
      inset={0}
      pointerEvents="none"
      bg="transparent"
    >
      <Box
        p={4}
        minH="300px"
        bg="transparent"
      >
        {leaderboard?.map((item, idx) => (
          <Text
            key={idx}
            fontSize="40px"
            fontWeight="bold"
            color={item.rank>3?"white":"yellow"}
            textShadow="-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black"
          >
            {getOBSEmoji(item.rank)}{item.name} ({item.streak}연승)
          </Text>
        ))}
      </Box>
    </Box>
  );
}