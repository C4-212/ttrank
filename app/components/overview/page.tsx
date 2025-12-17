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
  Center
} from "@chakra-ui/react";
import { setCookie, getCookie } from 'cookies-next';
import { Player, MatchPlayer, MotionBox, MotionFlex, CardAnim } from "@/app/components/common/class";
import WinRate from "@/app/components/overview/WinRate";
import FooterNav from "@/app/components/common/footer";
import { HiHeart } from "react-icons/hi";
import { useState, useEffect } from "react";


export default function OverviewPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
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

  const leaderboard: Player[] = [
    new Player,
    new Player,
    new Player,
    new Player,
    new Player,
    new Player,
    new Player,
    new Player,
    new Player,
    new Player,
  ];

  leaderboard[0].rank = 1;
  leaderboard[0].player_name = "Air.Force";
  leaderboard[0].streak = 7;
  leaderboard[0].player_mmr = 2152;

  leaderboard[1].rank = 2;
  leaderboard[1].player_name = "TT[Air]";
  leaderboard[1].streak = 7;
  leaderboard[1].player_mmr = 2032;

  leaderboard[2].rank = 3;
  leaderboard[2].player_name = "StarJoKKACHiHam";
  leaderboard[2].streak = 6;
  leaderboard[2].player_mmr = 2162;

  leaderboard[3].rank = 4;
  leaderboard[3].player_name = "Tato";
  leaderboard[3].streak = 6;
  leaderboard[3].player_mmr = 1937;

  leaderboard[4].rank = 5;
  leaderboard[4].player_name = "Sally-_-";
  leaderboard[4].streak = 5;
  leaderboard[4].player_mmr = 1983;

  leaderboard[5].rank = 6;
  leaderboard[5].player_name = "TemuRain";
  leaderboard[5].streak = 5;
  leaderboard[5].player_mmr = 2042;

  leaderboard[6].rank = 7;
  leaderboard[6].player_name = "GGyo^^";
  leaderboard[6].streak = 4;
  leaderboard[6].player_mmr = 2021;

  leaderboard[7].rank = 8;
  leaderboard[7].player_name = "MelonMangoDrink";
  leaderboard[7].streak = 4;
  leaderboard[7].player_mmr = 1996;

  leaderboard[8].rank = 9;
  leaderboard[8].player_name = "Hanyu..";
  leaderboard[8].streak = 3;
  leaderboard[8].player_mmr = 1879;

  leaderboard[9].rank = 10;
  leaderboard[9].player_name = "PlaytheLavi";
  leaderboard[9].streak = 2;
  leaderboard[9].player_mmr = 2038;



  let match_player: MatchPlayer = {
    team1_player1: leaderboard[8],
    team1_player2: leaderboard[1],
    team2_player1: leaderboard[3],
    team2_player2: leaderboard[2],
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
          <Text fontWeight="semibold" color="black">연승/승점/MMR 확인</Text>
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
                      <Button marginRight="5px"> 선수생성 </Button>
                    </Link>
                    {
                      match_player !== null ?

                        <Link href="/components/admin/match/edit">
                          <Button> 경기변경 </Button>
                        </Link>
                        :
                        <Link href="/components/admin/match/make">
                          <Button> 경기생성 </Button>
                        </Link>
                    }
                  </Flex>
                  : ""
              }
            </Flex>
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