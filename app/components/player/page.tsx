"use client";

import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Spacer,
  Spinner
} from "@chakra-ui/react";

import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";

export default function OverviewPage() {
  const [page, setPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const [leaderboard, setLeaderBoard] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const player_list = async () => {
        setLoading(true);
        const res = await fetch("/api/player/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ page: page })
        });
  
        const player_data = await res.json();
  
        if (player_data.data !== null) {
          setTotalPage(player_data.pagination.totalPage);
          setLeaderBoard(player_data.data);
        }
        setLoading(false);
      }
      player_list();
    }, [page]);

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
              loading? (
                <Flex h="300px" justify="center" align="center">
                  <Spinner size="lg" />
                </Flex>
              ):
              leaderboard?.length !== 0 ?
                leaderboard?.map((item, idx) => (
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
                          <Text color="black">{item.name}</Text>
                          <Text fontSize="12px" color="#f23f3f">　({item.mmr})</Text>
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
          totalPages={total_page}
          onChange={setPage}
        />
      </Container>
      <FooterNav />
    </Flex>
  );
}