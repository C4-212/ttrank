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

import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import { useState } from "react";
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";

export default function OverviewPage() {
  const [page, setPage] = useState(1);

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
                    minH="30px"
                    border="1px solid"
                    borderColor="gray.200"
                    marginBottom="5px">
                    <Flex
                      h="30px"
                      bg="white"
                      align="center">
                      <Text w="50px" fontSize="12px" fontWeight="bold" color="black">{item.rank}등</Text>
                      <Flex
                        direction="column"
                        h="100%"
                        justify="center">
                        <Flex
                          align="center">
                          <Text color="black">{item.player_name}</Text>
                          <Text fontSize="12px" color="#f23f3f">　({item.player_mmr})</Text>
                        </Flex>
                        <Flex
                          bg="white"
                          align="center">
                          <Text fontSize="12px" color="green">{item.win} W</Text>
                          <Text fontSize="12px" color="red">　{item.lose} L</Text>
                          <Text fontSize="12px" color="grey">　({item.point} Point)</Text>
                        </Flex>
                      </Flex>
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