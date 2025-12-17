"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  VStack,
  Image,
  Link,
  Text,
  Spacer,
  Icon,
  IconButton,
  Center
} from "@chakra-ui/react";
import { Player, MatchPlayer, MotionBox, MotionFlex, CardAnim } from "@/app/components/common/class";
import { useState } from "react";
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";

export default function OverviewPage() {
  const [page, setPage] = useState(1);

  let match_player: MatchPlayer = {
    team1_player1: new Player,
    team1_player2: new Player,
    team2_player1: new Player,
    team2_player2: new Player,
    win_rate: 0,
  };

  match_player.team1_player1.player_name = "StarJoKKACHiHam";
  match_player.team1_player1.streak = 7;
  match_player.team1_player1.player_mmr = 2153;

  match_player.team1_player2.player_name = "TT[Air]";
  match_player.team1_player2.streak = 5;
  match_player.team1_player2.player_mmr = 1621;

  match_player.team2_player1.player_name = "Air.Force";
  match_player.team2_player1.streak = 3;
  match_player.team2_player1.player_mmr = 1522;

  match_player.team2_player2.player_name = "GGyo^^";
  match_player.team2_player2.streak = 7;
  match_player.team2_player2.player_mmr = 1723;



  let matches: MatchPlayer[] = [
    match_player,
    match_player,
    match_player,
    match_player,
    match_player
  ]

  return (
    <Flex minH="100vh" bg="gray.50" direction="column">
      {/* Navbar */}
      <Box
        h="48px"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={4}
        display="flex"
        alignItems="center"
      >
        <Flex align="center" w="100%" h="100%">
          <Text fontWeight="semibold" color="black">🧾경기 기록</Text>
          <Spacer />
        </Flex>
      </Box>

      {/* Main Content */}
      <Container
        py={6}
        flex="1"
        pb="96px"
      >
        <VStack align="stretch">
          <MotionBox
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="600px"
            variants={CardAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >

            {
              matches.length !== 0 ?
                matches.map((item, idx) => (
                  <Box
                    w="100%"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    minH="200px"
                    marginBottom="5px">
                    <Text fontSize="10px" fontWeight="normal" color="grey" p={4} pb="1px">2025/01/01 19:12:12</Text>
                    <Flex
                      h="100%"
                      bg="white"
                      align="center"
                      justify="center"
                    >
                      <Box
                        w="50%"
                        bg="white"
                        p={4}
                        pb="1px"
                        minH="150px">
                        <Flex
                          h="100%"
                          bg="white"
                          align="center"
                          justify="center"
                          textAlign="left"
                          pb="5px"
                        >
                          <Text fontWeight="bold" color="#f23f3f">[1팀]</Text>
                          <Text fontWeight="bold" color="green">　👑승리!</Text>
                          <Spacer />
                        </Flex>
                        <Text
                          color="black"
                          fontSize={item.team1_player1.player_name.length > 10 ? "10px" : "16px"}>
                          {item.team1_player1.player_name}
                        </Text>
                        <Flex
                          h="100%"
                          bg="white"
                          align="center">
                          <Text fontSize="12px" color="grey">{item.team1_player1.streak}연승 ({item.team1_player1.player_mmr})</Text>
                          <Text fontWeight="bold" fontSize="12px" color="green">　(+32)</Text>
                        </Flex>
                        <Box minH="10px"></Box>
                        <Text
                          color="black"
                          fontSize={item.team1_player2.player_name.length > 10 ? "10px" : "16px"}>
                          {item.team1_player2.player_name}
                        </Text>
                        <Flex
                          h="100%"
                          bg="white"
                          align="center">
                          <Text fontSize="12px" color="grey">{item.team1_player2.streak}연승 ({item.team1_player2.player_mmr})</Text>
                          <Text fontWeight="bold" fontSize="12px" color="green">　(+22)</Text>
                        </Flex>
                      </Box>
                      <Spacer />
                      <Box
                        w="50%"
                        bg="white"
                        p={4}
                        pb="1px"
                        textAlign="right"
                        minH="150px">
                        <Flex
                          h="100%"
                          bg="white"
                          align="center"
                          justify="center"
                          textAlign="right"
                          pb="5px"
                        >
                          <Spacer />
                          {/* <Text fontWeight="bold" color="green">👑승리!</Text> */}
                          <Text fontWeight="bold" color="#4775ea">　[2팀]</Text>
                        </Flex>
                        <Text
                          color="black"
                          fontSize={item.team2_player1.player_name.length > 10 ? "10px" : "16px"}>
                          {item.team2_player1.player_name} </Text>
                        <Flex
                          h="100%"
                          bg="white"
                          align="center"
                          textAlign="right">
                          <Spacer />
                          <Text fontSize="12px" color="grey">{item.team2_player1.streak}연승 ({item.team2_player1.player_mmr})</Text>
                          <Text fontWeight="bold" fontSize="12px" color="red">　(-12)</Text>
                        </Flex>
                        <Box minH="10px"></Box>
                        <Text
                          color="black"
                          fontSize={item.team2_player2.player_name.length > 10 ? "10px" : "16px"}>
                          {item.team2_player2.player_name} </Text>
                        <Flex
                          h="100%"
                          bg="white"
                          align="center"
                          textAlign="right">
                          <Spacer />
                          <Text fontSize="12px" color="grey">{item.team2_player2.streak}연승 ({item.team2_player2.player_mmr})</Text>
                          <Text fontWeight="bold" fontSize="12px" color="red">　(-12)</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))
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
          </MotionBox>
        </VStack>
        <Pagination
          page={page}
          totalPages={10}
          onChange={setPage}
        />
      </Container>
      <FooterNav />
    </Flex>
  );
}