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
        minH="300px"
        bg="transparent"
      >
        {
          match !== null ?
            <Box w="100%" bg="white">
              <Flex
                h="100%"
                bg="white"
                align="center"
                justify="center"
                pb="5px"
              >
                <Box
                  w="40%"
                  bg="white"
                  p={4}
                  pb="1px"
                  minH="150px">
                  <Text fontWeight="bold" color="#f23f3f" pb="5px">[1팀]</Text>
                  <Text
                    color="black"
                    fontSize={match.team1_player1_name.length > 10 ? "10px" : "16px"}>
                    {match.team1_player1_name}
                  </Text>
                  <Text fontSize="12px" color="grey">{match.team1_player1_streak}연승 ({match.team1_player1_mmr})</Text>
                  <Box minH="10px"></Box>
                  <Text
                    color="black"
                    fontSize={match.team1_player2_name.length > 10 ? "10px" : "16px"}>
                    {match.team1_player2_name}
                  </Text>
                  <Text fontSize="12px" color="grey">{match.team1_player2_streak}연승 ({match.team1_player2_mmr})</Text>
                </Box>
                <Spacer />
                <Text fontWeight="bold" fontSize="32px" color="black">VS</Text>
                <Spacer />
                <Box
                  w="40%"
                  bg="white"
                  p={4}
                  pb="1px"
                  textAlign="right"
                  minH="150px">
                  <Text fontWeight="bold" color="#4775ea" pb="5px">[2팀]</Text>
                  <Text
                    color="black"
                    fontSize={match.team2_player1_name.length > 10 ? "10px" : "16px"}>
                    {match.team2_player1_name} </Text>
                  <Text fontSize="12px" color="grey">{match.team2_player1_streak}연승 ({match.team2_player1_mmr})</Text>
                  <Box minH="10px"></Box>
                  <Text
                    color="black"
                    fontSize={match.team2_player2_name.length > 10 ? "10px" : "16px"}>
                    {match.team2_player2_name} </Text>
                  <Text fontSize="12px" color="grey">{match.team2_player2_streak}연승 ({match.team2_player2_mmr})</Text>
                </Box>
              </Flex>
              <Text fontSize="12px" color="grey" pb="1px">승자 예측</Text>
              <Box
                w="100%"
                h="30px"
                position="relative"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200">
                <Flex
                  h="100%"
                  bg="white"
                  align="center"
                  justify="center">
                  <Box
                    bg="#f23f3f"
                    p={1}
                    w={win_rate?.winrate_1}
                    h="95%"
                    textAlign="left">
                    <Text fontSize="10px"
                      color="white"
                      pb="1px"
                      left="4px"
                      position="absolute"
                      whiteSpace="nowrap">
                      {win_rate?.winrate_1}
                    </Text>
                  </Box>
                  <Box
                    bg="#4775ea"
                    p={1}
                    w={win_rate?.winrate_2}
                    h="95%"
                    textAlign="right">
                    <Text fontSize="10px"
                      color="white"
                      pb="1px"
                      position="absolute"
                      right="4px"
                      whiteSpace="nowrap">
                      {win_rate?.winrate_2}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
            :
            <Flex
              h="200px"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">진행중인 경기가 없습니다.</Text>
            </Flex>
        }
      </Box>
    </Box>
  );
}