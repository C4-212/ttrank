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
  Button,
  Center,
  Spinner
} from "@chakra-ui/react";
import { setCookie, getCookie } from 'cookies-next';
import { getEmoji, Player, Match, MotionBox, MotionFlex, CardAnim } from "@/app/components/common/class";
import WinRate from "@/app/components/common/winrate";
import FooterNav from "@/app/components/common/footer";
import { redirect } from "next/navigation";
import { HiHeart } from "react-icons/hi";
import { useState, useEffect } from "react";

function logout() {
  setCookie("authToken", "");
  redirect("/");
}

export default function OverviewPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [match, setMatch] = useState<Match | null>(null);
  const [leaderboard, setLeaderBoard] = useState<Player[] | null>(null);
  const [win_rate, setWinRate] = useState<{ winrate_1: string, winrate_2: string } | null>(null);
  const [loadingLive, setLoadingLive] = useState(false);
  const [loadingLeaderBoard, setLoadingLeaderBoard] = useState(false);


  const authToken = getCookie('authToken')?.toString();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authToken) {
        setIsAdmin(false);
        return;
      }

      const res = await fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: authToken })
      });

      const data = await res.json();

      setIsAdmin(data.success);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const streak_rank_list = async () => {
      setLoadingLeaderBoard(true);
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
      setLoadingLeaderBoard(false);
    }
    streak_rank_list();
  }, []);

  useEffect(() => {
    const match_live = async () => {
      setLoadingLive(true);
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
      setLoadingLive(false);
    }
    match_live();
  }, []);

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
          <Text fontWeight="semibold" color="black">연승/승점/MMR 확인</Text>
          <Spacer />
          <Link href="/components/honors" target="_self" rel="noopener noreferrer">
            <Button bg="black" color="white">아너스클럽</Button>
          </Link>
          {
            isAdmin ? <Button marginLeft="2px" bg="black" color="white" onClick={logout}>로그아웃</Button> : ""
          }
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
                TT 방송에서 참여한 경기의 승점, MMR을 확인할 수 있는 페이지 입니다 <br />
                치킨 수령은 오픈챗 TT스타 (<Link color="grey" target="_blank" href="https://open.kakao.com/o/s4NX6SVh" rel="noopener noreferrer">링크</Link>)</Text>
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
            <Flex
              h="100%"
              bg="white"
              align="center">
              <Text fontWeight="medium" color="black" pb="5px">🔥실시간 라이브</Text>
              <Spacer />
              {
                isAdmin ?
                  <Flex
                    h="100%"
                    bg="white"
                    align="center">
                    <Link href="/components/admin/player/make">
                      <Button bg="black" color="white" marginRight="5px"> 선수생성 </Button>
                    </Link>
                    {
                      match !== null ?

                        <Link href="/components/admin/match/edit">
                          <Button bg="black" color="white"> 경기변경 </Button>
                        </Link>
                        :
                        <Link href="/components/admin/match/make">
                          <Button bg="black" color="white"> 경기생성 </Button>
                        </Link>
                    }
                  </Flex>
                  : ""
              }
            </Flex>
            {
              loadingLive ? (
                <Flex h="300px" justify="center" align="center">
                  <Spinner size="lg" />
                </Flex>
              ) :
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
              loadingLeaderBoard ? (
                <Flex h="300px" justify="center" align="center">
                  <Spinner size="lg" />
                </Flex>
              ) :
                leaderboard?.length !== 0 ?
                  leaderboard?.map((item, idx) => (
                    <Box
                      bg="white"
                      p={4}
                      pb="1px"
                      minH="15px">
                      <Flex
                        h="20px"
                        bg="white"
                        align="center">
                        <Text color="black">{getEmoji(item.rank)} {item.name} </Text>
                        <Text fontSize="12px" color="grey">　({item.mmr})</Text>
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