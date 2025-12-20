"use client";

import {
  Box,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { Match, Player, getOBSEmoji } from "@/app/components/common/class";
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


  // 테스트 코드
  // useEffect(() => {
  //     const newMatch: Match = new Match();

  //     let newPlayer:Player = new Player;
  //     let newPlayer2:Player = new Player;
  //     let newPlayer3:Player = new Player;
  //     let newPlayer4:Player = new Player;

  //     newPlayer.name = "GGyo^^..";
  //     newPlayer2.name = "MelonMangoDrink";
  //     newPlayer3.name = "StarJoKKACHiHam";
  //     newPlayer4.name = "Air.Force";

  //     newMatch.team1_player1_name = newPlayer.name;
  //     newMatch.team1_player1_streak = newPlayer.streak;
  //     newMatch.team1_player1_mmr = newPlayer.mmr;
  //     newMatch.team1_player1_mmr_changed = 0;

  //     newMatch.team1_player2_name = newPlayer2.name;
  //     newMatch.team1_player2_streak = newPlayer.streak;
  //     newMatch.team1_player2_mmr = newPlayer.mmr;
  //     newMatch.team1_player2_mmr_changed = 0;

  //     newMatch.team2_player1_name = newPlayer3.name;
  //     newMatch.team2_player1_streak = newPlayer.streak;
  //     newMatch.team2_player1_mmr = newPlayer.mmr;
  //     newMatch.team2_player1_mmr_changed = 0;

  //     newMatch.team2_player2_name = newPlayer4.name;
  //     newMatch.team2_player2_streak = newPlayer.streak;
  //     newMatch.team2_player2_mmr = newPlayer.mmr;
  //     newMatch.team2_player2_mmr_changed = 0;

  //     setMatch(newMatch);
  //     setWinRate(WinRate(newMatch));
  // }, []);

  const PlayerBox = ({
    name,
    streak,
    mmr,
    align = "left",
  }: {
    name: string,
    streak: number,
    mmr: number,
    align?: "left" | "right"
  }) => (
    <Box
      w="50%"
      h="100px"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign={align}
    >
      <Text
        color="white"
        fontSize={name.length > 10 ? "14px" : "14px"}
      >
        {name}
      </Text>
      <Text fontSize="14px" color="white">
        {streak}연승 ({mmr})
      </Text>
    </Box>
  );

  return (
    <Box position="fixed" inset={0} pointerEvents="none" bg="transparent">
      <Box p={2} minH="200px" bg="transparent">
        {match && (
          <Box w="100%" bg="transparent">
            <Flex
              h="100%"
              bg="blackAlpha.900"
              align="center"
              pr="4"
              pl="4"
              justify="center"
              marginBottom="2px"
              minH="100px"
            >
              {/* Team 1 */}
              <Flex w="45%" bg="transparent" height="100px">
                <Flex w="100%" bg="transparent" align="center" justify="center">
                  <PlayerBox
                    name={match.team1_player1_name}
                    streak={match.team1_player1_streak}
                    mmr={match.team1_player1_mmr}
                    align="left"
                  />
                  <PlayerBox
                    name={match.team1_player2_name}
                    streak={match.team1_player2_streak}
                    mmr={match.team1_player2_mmr}
                    align="left"
                  />
                </Flex>
              </Flex>

              <Spacer />

              {/* VS */}
              <Flex
                w="10%"
                height="100px"
                align="center"
                justify="center"
              >
                <Text fontWeight="bold" fontSize="32px" color="white">VS</Text>
              </Flex>

              <Spacer />

              {/* Team 2 */}
              <Flex w="45%" bg="transparent" height="100px">
                <Flex w="100%" align="center" justify="center">
                  <PlayerBox
                    name={match.team2_player1_name}
                    streak={match.team2_player1_streak}
                    mmr={match.team2_player1_mmr}
                    align="right"
                  />
                  <PlayerBox
                    name={match.team2_player2_name}
                    streak={match.team2_player2_streak}
                    mmr={match.team2_player2_mmr}
                    align="right"
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}