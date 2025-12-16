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
  AbsoluteCenter,
  IconButton,
  Center
} from "@chakra-ui/react";
import { MatchPlayer, WinningStreaker, MotionBox, MotionFlex, CardAnim} from "../common/class";
import WinRate from "./WinRate";
import FooterNav from "../common/footer";
import { HiHeart } from "react-icons/hi";



export default function OverviewPage() {
  const leaderboard: WinningStreaker[] = [
    { rank: 1, rank_emoji: "1️⃣", player_name: "Air.Force", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 2152, point:0 },
    { rank: 2, rank_emoji: "2️⃣", player_name: "TT[Air]", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 1572, point:0 },
    { rank: 3, rank_emoji: "3️⃣", player_name: "StarJoKKACHiHam", player_battle_tag: "얼어붙은발바닥#323951", streak: 6, player_mmr: 1242, point:0 },
    { rank: 4, rank_emoji: "4️⃣", player_name: "Tato", player_battle_tag: "얼어붙은발바닥#323951", streak: 6, player_mmr: 1235, point:0 },
    { rank: 5, rank_emoji: "5️⃣", player_name: "Sally-_-", player_battle_tag: "얼어붙은발바닥#323951", streak: 5, player_mmr: 1623, point:0 },
    { rank: 6, rank_emoji: "6️⃣", player_name: "TemuRain", player_battle_tag: "얼어붙은발바닥#323951", streak: 5, player_mmr: 1721, point:0 },
    { rank: 7, rank_emoji: "7️⃣", player_name: "GGyo^^", player_battle_tag: "얼어붙은발바닥#323951", streak: 3, player_mmr: 1823, point:0 },
    { rank: 8, rank_emoji: "8️⃣", player_name: "MelonMangoDrink", player_battle_tag: "얼어붙은발바닥#323951", streak: 3, player_mmr: 2153, point:0 },
    { rank: 9, rank_emoji: "9️⃣", player_name: "Hanyu..", player_battle_tag: "얼어붙은발바닥#323951", streak: 1, player_mmr: 2045, point:0 },
    { rank: 10, rank_emoji: "🔟", player_name: "PlaytheLavi", player_battle_tag: "얼어붙은발바닥#323951", streak: 0, player_mmr: 1862, point:0 },
  ];


  let match_player: MatchPlayer = {
    team1_player1: { player_name: "StarJoKKACHiHam", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 2153 },
    team1_player2: { player_name: "TT[Air]", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 1621 },
    team2_player1: { player_name: "Air.Force", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 1522 },
    team2_player2: { player_name: "GGyo^^", player_battle_tag: "얼어붙은발바닥#323951", streak: 7, player_mmr: 1723 },
    win_rate: 0,
  };
  const win_rate = WinRate(match_player);

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
          <Text fontWeight="semibold" color="black">[TTRANK.kr] 연승/승점/MMR 확인</Text>
          <Spacer />
          {/* <IconButton aria-label="메뉴"> <span>☰</span> </IconButton> */}
        </Flex>
      </Box>

      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={4}
        py={3}
      >
        <Flex align="center" w="100%" h="100%">
          <Link href="https://www.sooplive.co.kr/station/prowlgus" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/streaming/icon_soop.png"
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt="SOOP"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            />
          </Link>
          <Spacer />
          <Link href="https://www.youtube.com/@티티2" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/streaming/icon_youtube.png"
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt="Youtube"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            />
          </Link>
          <Spacer />
          <Link href="https://chzzk.naver.com/10a18c8e9a3a0672a9f0987b2f4394e7" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/streaming/icon_chzzk.png"
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt="CHZZK"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            />
          </Link>
        </Flex>
      </Box>
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={4}
        py={3}
      >
        <Flex h="100%" align="center" justify="center">
          <Icon as={HiHeart} color="red.400" mr={2} />
          <Text fontSize="sm" color="black"> 후원 계좌 : 100-183-280224 케이뱅크 (강천수) </Text>
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
            minH="120px"
            variants={CardAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >
            <Text fontWeight="medium" color="black">📢공지사항</Text>
            <Flex
              h="100px"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">
                TT 방송에서 참여한 경기의<br />
                승점, MMR을 확인할 수 있는 페이지 입니다<br />
                방송 시청해주셔서 감사합니다!</Text>
            </Flex>
          </MotionBox>

          <MotionBox
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="240px"
            variants={CardAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >
            <Text fontWeight="medium" color="black" pb="5px">🔥실시간 라이브</Text>
            {
              match_player !== null ?
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
                        fontSize={match_player.team1_player1.player_name.length > 10 ? "10px" : "16px"}>
                        {match_player.team1_player1.player_name}
                      </Text>
                      <Text fontSize="12px" color="grey">{match_player.team1_player1.streak}연승 ({match_player.team1_player1.player_mmr})</Text>
                      <Box minH="10px"></Box>
                      <Text
                        color="black"
                        fontSize={match_player.team1_player2.player_name.length > 10 ? "10px" : "16px"}>
                        {match_player.team1_player2.player_name}
                      </Text>
                      <Text fontSize="12px" color="grey">{match_player.team1_player2.streak}연승 ({match_player.team1_player2.player_mmr})</Text>
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
                        fontSize={match_player.team2_player1.player_name.length > 10 ? "10px" : "16px"}>
                        {match_player.team2_player1.player_name} </Text>
                      <Text fontSize="12px" color="grey">{match_player.team2_player1.streak}연승 ({match_player.team2_player1.player_mmr})</Text>
                      <Box minH="10px"></Box>
                      <Text
                        color="black"
                        fontSize={match_player.team2_player2.player_name.length > 10 ? "10px" : "16px"}>
                        {match_player.team2_player2.player_name} </Text>
                      <Text fontSize="12px" color="grey">{match_player.team2_player2.streak}연승 ({match_player.team2_player2.player_mmr})</Text>
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
                        w={win_rate.winrate_1}
                        h="95%"
                        textAlign="left">
                        <Text fontSize="10px"
                          color="white"
                          pb="1px"
                          left="4px"
                          position="absolute"
                          whiteSpace="nowrap">
                          {win_rate.winrate_1}
                        </Text>
                      </Box>
                      <Box
                        bg="#4775ea"
                        p={1}
                        w={win_rate.winrate_2}
                        h="95%"
                        textAlign="right">
                        <Text fontSize="10px"
                          color="white"
                          pb="1px"
                          position="absolute"
                          right="4px"
                          whiteSpace="nowrap">
                          {win_rate.winrate_2}
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
          </MotionBox>
          <MotionBox
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="300px"
            variants={CardAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >
            <Text fontWeight="medium" color="black" pb="5px">🥇연승 순위</Text>

            {/* ITEM */}
            {
              leaderboard.length !== 0 ?
                leaderboard.map((item, idx) => (
                  <Box
                    bg="white"
                    p={4}
                    pb="1px"
                    minH="15px">
                    <Flex
                      h="20px"
                      bg="white"
                      align="center">
                      <Text color="black">{item.rank_emoji} {item.player_name} </Text>
                      <Text fontSize="12px" color="grey">　({item.player_mmr})</Text>
                      <Spacer />
                      {/* 1~3등은 빨간색 */}
                      <Text fontWeight="normal" color={idx < 3 ? "#f23f3f" : "black"}>{item.streak}연승</Text>

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
      </Container>
      <FooterNav />
    </Flex>
  );
}