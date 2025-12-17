"use client";

import { Box, Text } from "@chakra-ui/react";

export default function OverviewPage() {
  const leaderboard = [
    { rank: "🥇", name: "홍길동", streak: 7, color: "yellow" },
    { rank: "🥈", name: "홍길동", streak: 7, color: "yellow" },
    { rank: "🥉", name: "홍길동", streak: 6, color: "yellow" },
    { rank: "", name: "홍길동", streak: 6, color: "white" },
    { rank: "", name: "홍길동", streak: 5, color: "white" },
    { rank: "", name: "홍길동", streak: 5, color: "white" },
    { rank: "", name: "홍길동", streak: 3, color: "white" },
    { rank: "", name: "홍길동", streak: 3, color: "white" },
    { rank: "", name: "홍길동", streak: 1, color: "white" },
    { rank: "", name: "홍길동", streak: 1, color: "white" },
  ];

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
        {leaderboard.map((item, idx) => (
          <Text
            key={idx}
            fontSize="40px"
            fontWeight="bold"
            color={item.color}
            textShadow="-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black"
          >
            {item.rank}{item.name} ({item.streak}연승)
          </Text>
        ))}
      </Box>
    </Box>
  );
}