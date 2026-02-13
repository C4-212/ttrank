"use client";

import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  Spacer,
  Spinner,
  Button,
  Input,
  IconButton,
  Link
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

import { Copy } from "lucide-react";
import { getChampionEmoji, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";
import { RefreshCw } from "lucide-react";

interface FormValues {
  name: string
}

export default function OverviewPage() {
  const [page, setPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const [leaderboard, setLeaderBoard] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [rankingType, setRankingType] = useState<"mmr" | "point">("mmr");

  useEffect(() => {
    const player_list = async () => {
      setLoading(true);
      const res = await fetch("/api/player/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ page: page, keyword: keyword, rankingType: rankingType })
      });

      const player_data = await res.json();

      if (player_data.data !== null) {
        setTotalPage(player_data.pagination.totalPage);
        setLeaderBoard(player_data.data);
      }
      setLoading(false);
    }
    player_list();
  }, [page, keyword, rankingType]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  })

  const nameValue = watch("name");

  const onSubmit = handleSubmit(async (data) => {
    setPage(1);
    if(keyword !== data.name)
    {
      setTotalPage(1);
    }
    setKeyword(!data.name ? "" : data.name);
  });

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
          <Text fontWeight="semibold" color="black">🥇유저 랭킹 ({rankingType === "mmr" ? "MMR" : "Point"})</Text>
          <IconButton
            aria-label="랭킹 전환"
            variant="ghost"
            size="sm"
            onClick={() =>
              setRankingType(prev => (prev === "mmr" ? "point" : "mmr"))
            }
          >
            <RefreshCw
              color="black"
              size={16}
              style={{
                transition: "transform 0.3s ease",
                transform:
                  rankingType === "point" ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </IconButton>
          <Spacer />
          <Link href="/fame" target="_self" rel="noopener noreferrer">
            <Button bg="black" color="white">  🏆명예의전당 </Button>
          </Link>
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
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="60px"
            variants={CardAnim}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={onSubmit}>
              <Flex
                h="50px"
                bg="white"
                align="center"
                justify="center"
                gap="10px"
              >
                <Text color="black">아이디</Text>
                <PlayerSearchInput
                  name="name"
                  value={nameValue}
                  setValue={setValue}
                />
                <Button bg="black" color="white" type="submit">
                  검색
                </Button>
              </Flex>
            </form>
          </MotionBox>
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
              loading ? (
                <Flex h="300px" justify="center" align="center">
                  <Spinner size="lg" />
                </Flex>
              ) :
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
                        <Text w="50px" fontSize="12px" fontWeight="bold" color="black">{keyword!=""?"NONE":item.rank+"등"}</Text>
                        <Flex
                          direction="column"
                          h="100%"
                          justify="center">
                          <Flex
                            align="center">
                            <Text color="black" fontSize={item.name.length >= 10 ? "12px" : "14px"}>{item.name}</Text>
                            <Text pl="5px" fontSize="12px" color="#f23f3f">({item.mmr})</Text>
                            <IconButton
                              aria-label="copy-name"
                              onClick={() => {
                                navigator.clipboard.writeText(item.name);
                                toaster.create({
                                  title: "아이디가 복사되었습니다!",
                                  type: "success",
                                  duration: 500,
                                  closable: false,
                                });
                              }}
                              pl="15px" w="10px" h="10px" minW="10px" bg="white" _hover={{ bg: "gray.100" }} _active={{ bg: "gray.200" }}>
                              <Copy size={6} color="grey" />
                            </IconButton>
                          </Flex>
                          <Flex
                            bg="white"
                            align="center">
                            <Text fontSize="12px" color="green">{item.win} W</Text>
                            <Text fontSize="12px" color="red">　{item.lose} L</Text>
                            <Text fontSize="12px" color="grey">　(♦️{item.point})</Text>
                          </Flex>
                        </Flex>
                        <Spacer />
                        {/* 1~3등은 빨간색 */}
                        <Text fontWeight="normal" color="grey">{getChampionEmoji(item.streak)} {item.streak}연승</Text>
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
