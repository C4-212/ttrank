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

import { MotionFlex, WinningStreaker, MotionBox, CardAnim } from "../common/class";
import { useState } from "react";
import FooterNav from "../common/footer";
import Pagination from "../common/pagination";

export default function OverviewPage() {
  const [page, setPage] = useState(1);

  const leaderboard: WinningStreaker[] = [
      { rank: 1, rank_emoji: "1️⃣", player_name: "Air.Force", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 2152, point:33 },
      { rank: 2, rank_emoji: "2️⃣", player_name: "TT[Air]", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 1572, point:12 },
      { rank: 3, rank_emoji: "3️⃣", player_name: "StarJoKKACHiHam", player_battle_tag: "얼어붙은발바닥#323951", streak: 6, player_mmr: 1242, point:32 },
      { rank: 4, rank_emoji: "4️⃣", player_name: "Tato", player_battle_tag: "얼어붙은발바닥#323951", streak: 6, player_mmr: 1235, point:22 },
      { rank: 5, rank_emoji: "5️⃣", player_name: "Sally-_-", player_battle_tag: "얼어붙은발바닥#323951", streak: 5, player_mmr: 1623, point:31 },
      { rank: 6, rank_emoji: "6️⃣", player_name: "TemuRain", player_battle_tag: "얼어붙은발바닥#323951", streak: 5, player_mmr: 1721, point:25},
      { rank: 7, rank_emoji: "7️⃣", player_name: "GGyo^^", player_battle_tag: "얼어붙은발바닥#323951", streak: 3, player_mmr: 1823, point:42 },
      { rank: 8, rank_emoji: "8️⃣", player_name: "MelonMangoDrink", player_battle_tag: "얼어붙은발바닥#323951", streak: 3, player_mmr: 2153, point:23 },
      { rank: 9, rank_emoji: "9️⃣", player_name: "Hanyu..", player_battle_tag: "얼어붙은발바닥#323951", streak: 1, player_mmr: 2045, point:32},
      { rank: 10, rank_emoji: "🔟", player_name: "PlaytheLavi", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:64 },
      { rank: 11, rank_emoji: "🔟", player_name: "Seotejiboys", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:12 },
      { rank: 12, rank_emoji: "🔟", player_name: "pqrs1", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:32 },
      { rank: 13, rank_emoji: "🔟", player_name: "DSQUARED2.", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:25 },
      { rank: 14, rank_emoji: "🔟", player_name: "chobo(pas)", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:45 },
      { rank: 15, rank_emoji: "🔟", player_name: "GuardStyle", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:13 },
    ];

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
          <Text fontWeight="semibold" color="black">🥇유저 랭킹 (MMR)</Text>
          <Spacer />
          {/* <IconButton aria-label="메뉴"> <span>☰</span> </IconButton> */}
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
              leaderboard.length !== 0 ?
                leaderboard.map((item, idx) => (
                  <Box
                    bg="white"
                    p={4}
                    pb="5px"
                    minH="15px">
                    <Flex
                      h="30px"
                      bg="white"
                      align="center">
                      <Text w="50px" fontWeight="bold" color="black">{item.rank}등</Text>
                      <Box
                        h="100%">
                          <Flex
                            bg="white"
                            align="center">
                            <Text color="black">{item.player_name}</Text>
                            <Text fontSize="12px" color="#f23f3f">　({item.player_mmr})</Text>
                          </Flex>
                          <Text fontSize="12px" color="grey">{item.point} Point</Text>
                      </Box>
                      <Spacer />
                      {/* 1~3등은 빨간색 */}
                      <Text fontWeight="normal" color="grey">{item.streak}연승</Text>
                    </Flex>
                  </Box>
                )) :
                <Flex
                  h="200px"
                  bg="white"
                  align="center"
                  justify="center">
                  <Text color="black">유저 랭킹 정보가 없습니다.</Text>
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