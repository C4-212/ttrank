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
import { MatchPlayer, WinningStreaker } from "../common/class";
import FooterNav from "../common/footer";
import { HiHeart } from "react-icons/hi";

export default function OverviewPage() {
  const leaderboard: WinningStreaker[] = [
    { rank: 1, rank_emoji: "1️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 7 },
    { rank: 2, rank_emoji: "2️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 7 },
    { rank: 3, rank_emoji: "3️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 6 },
    { rank: 4, rank_emoji: "4️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 6 },
    { rank: 5, rank_emoji: "5️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 5 },
    { rank: 6, rank_emoji: "6️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 5 },
    { rank: 7, rank_emoji: "7️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 3 },
    { rank: 8, rank_emoji: "8️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 3 },
    { rank: 9, rank_emoji: "9️⃣", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 1 },
    { rank: 10, rank_emoji: "🔟", player_name: "홍길동", player_battle_tag: "#무지개1234", streak: 0 },
  ];


  let match_player: MatchPlayer = new MatchPlayer;

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
          <Text fontWeight="semibold" color="black">TT생컨 연승/승점/MMR 확인</Text>
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
          <Text fontSize="sm" color="black"> 후원 계좌 : 601027-5611-9562 농협 (강천수) </Text>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container
        py={6}
        flex="1"
        pb="96px"
      >
        <VStack align="stretch">
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="120px"
          >
            <Text fontWeight="medium" color="black">📢공지사항</Text>
            <Flex
              h="100px"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">
                TT 티비 방송에서 참여한 경기의<br />
                승점, MMR을 확인할 수 있는 페이지 입니다<br />
                방송 시청해주셔서 감사합니다!</Text>
            </Flex>
          </Box>

          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="240px"
          >
            <Text fontWeight="medium" color="black" pb="5px">🔥실시간 라이브</Text>
            {
              match_player !== null ?
                <Flex
                  h="100%"
                  bg="white"
                  align="center"
                  justify="center"
                >
                  <Box
                    w="40%"
                    bg="white"
                    p={4}
                    pb="1px"
                    minH="150px">
                    <Text fontWeight="bold" color="black" pb="5px">[1팀]</Text>
                    <Text color="black">{match_player.team1_player1.player_name} </Text>
                    <Text fontSize="12px" color="grey">{match_player.team1_player1.streak}연승 ({match_player.team1_player1.player_mmr})</Text>
                    <Box minH="10px"></Box>
                    <Text color="black">{match_player.team1_player2.player_name} </Text>
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
                    <Text fontWeight="bold" color="black" pb="5px">[2팀]</Text>
                    <Text color="black">{match_player.team2_player1.player_name} </Text>
                    <Text fontSize="12px" color="grey">{match_player.team2_player1.streak}연승 ({match_player.team2_player1.player_mmr})</Text>
                    <Box minH="10px"></Box>
                    <Text color="black">{match_player.team2_player2.player_name} </Text>
                    <Text fontSize="12px" color="grey">{match_player.team2_player2.streak}연승 ({match_player.team2_player2.player_mmr})</Text>
                  </Box>
                </Flex>
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
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="300px"
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
                      <Text fontSize="12px" color="grey">　{item.player_battle_tag}</Text>
                      <Spacer />
                      {/* 1~3등은 빨간색 */}
                      <Text fontWeight="bold" color={idx < 3 ? "#f23f3f" : "black"}>{item.streak}연승</Text>

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
          </Box>
        </VStack>
      </Container>
      <FooterNav />
    </Flex>
  );
}