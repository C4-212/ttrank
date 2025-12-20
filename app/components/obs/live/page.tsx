"use client";

import {
  Box,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { Match, getOBSEmoji } from "@/app/components/common/class";
import { useState, useEffect } from "react";
import WinRate from "@/app/components/common/winrate";

export default function OverviewPage() {
  const [match, setMatch] = useState<Match | null>(null);
  const [win_rate, setWinRate] = useState<{ winrate_1: string, winrate_2: string } | null>(null);

  useEffect(() => {
    const match_live = async () => {
      const res = await fetch("/api/match/live", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      });

      const match_data = await res.json();

      if (match_data.data !== null) {
        const newMatch: Match = new Match();

        newMatch.team1_player1_name = match_data.data.team1_player1_name;
        newMatch.team1_player1_streak = match_data.data.team1_player1_streak;
        newMatch.team1_player1_mmr = match_data.data.team1_player1_mmr;
        newMatch.team1_player1_mmr_changed = match_data.data.team1_player1_mmr_changed;

        newMatch.team1_player2_name = match_data.data.team1_player2_name;
        newMatch.team1_player2_streak = match_data.data.team1_player2_streak;
        newMatch.team1_player2_mmr = match_data.data.team1_player2_mmr;
        newMatch.team1_player2_mmr_changed = match_data.data.team1_player2_mmr_changed;

        newMatch.team2_player1_name = match_data.data.team2_player1_name;
        newMatch.team2_player1_streak = match_data.data.team2_player1_streak;
        newMatch.team2_player1_mmr = match_data.data.team2_player1_mmr;
        newMatch.team2_player1_mmr_changed = match_data.data.team2_player1_mmr_changed;

        newMatch.team2_player2_name = match_data.data.team2_player2_name;
        newMatch.team2_player2_streak = match_data.data.team2_player2_streak;
        newMatch.team2_player2_mmr = match_data.data.team2_player2_mmr;
        newMatch.team2_player2_mmr_changed = match_data.data.team2_player2_mmr_changed;

        setMatch(newMatch);
        setWinRate(WinRate(newMatch));
      }
    }
    match_live();
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
        minH="200px"
        bg="transparent"
      >
        {
          match !== null ?
            <Box w="100%" bg="transparent">
              <Flex
                h="100%"
                bg="blackAlpha.900"
                align="center"
                justify="center"
                marginBottom="2px"
              >
                <Box
                  w="48%"
                  bg="transparent"
                  p={4}
                  pb="1px"
                  minH="100px">
                  <Flex
                    h="100%"
                    bg="transparent"
                    align="center"
                    justify="center">
                    <Box
                      w="50%"
                      bg="transparent"
                      p={4}
                      pb="1px"
                      minH="100%">
                      <Text
                        color="white"
                        fontSize={match.team1_player1_name.length > 10 ? "12px" : "18px"}>
                        {match.team1_player1_name}
                      </Text>
                      <Text fontSize="14px" color="white">{match.team1_player1_streak}연승 ({match.team1_player1_mmr})</Text>
                    </Box>
                    <Box
                      w="50%"
                      bg="transparent"
                      p={4}
                      pb="1px"
                      minH="100%">
                      <Text
                        color="white"
                        fontSize={match.team1_player2_name.length > 10 ? "12px" : "18px"}>
                        {match.team1_player2_name}
                      </Text>
                      <Text fontSize="14px" color="white">{match.team1_player2_streak}연승 ({match.team1_player2_mmr})</Text>
                    </Box>
                  </Flex>
                </Box>
                <Spacer />
                <Text fontWeight="bold" fontSize="32px" color="white">VS</Text>
                <Spacer />
                <Box
                  w="48%"
                  bg="transparent"
                  p={4}
                  pb="1px"
                  textAlign="right"
                  minH="100%">
                  <Flex
                    h="100%"
                    bg="transparent"
                    align="center"
                    justify="center">
                    <Box
                      w="50%"
                      bg="transparent"
                      p={4}
                      pb="1px"
                      minH="100%">
                      <Text
                        color="white"
                        fontSize={match.team2_player1_name.length > 10 ? "12px" : "18px"}>
                        {match.team2_player1_name} </Text>
                      <Text fontSize="14px" color="white">{match.team2_player1_streak}연승 ({match.team2_player1_mmr})</Text>
                    </Box>
                    <Box
                      w="50%"
                      bg="transparent"
                      p={4}
                      pb="1px"
                      minH="100%">
                      <Text
                        color="white"
                        fontSize={match.team2_player2_name.length > 10 ? "12px" : "18px"}>
                        {match.team2_player2_name} </Text>
                      <Text fontSize="14px" color="white">{match.team2_player2_streak}연승 ({match.team2_player2_mmr})</Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            : ""
        }
      </Box>
    </Box>
  );
}