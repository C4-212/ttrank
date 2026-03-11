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
  IconButton,
  Input,
  Checkbox
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { Copy } from "lucide-react";
import { getChampionEmoji, formatDate, Player, Match, MotionBox, MotionFlex, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";

interface FormValues {
  name: string
  is_champion: boolean
}

export default function OverviewPage() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total_page, setTotalPage] = useState(1);
  const [matches, setMatches] = useState<Match[] | null>(null);
  const [keyword, setKeyword] = useState("");
  const [is_champion, setIsChampion] = useState(false);

  useEffect(() => {
    const match_list = async () => {
      setLoading(true);
      const res = await fetch("/api/match/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ page: page, keyword: keyword, is_champion:is_champion })
      });

      const match_data = await res.json();

      if (match_data.data !== null) {
        setTotalPage(match_data.pagination.totalPage);
        setMatches(match_data.data);
      }
      setLoading(false);
    }
    match_list();
  }, [page, keyword, is_champion]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      is_champion: false,
    },
  })

  const nameValue = watch("name");

  const onSubmit = handleSubmit(async (data) => {
    setPage(1);
    if(keyword !== data.name || is_champion !== data.is_champion)
    {
      setTotalPage(1);
    }

    setIsChampion(data.is_champion);
    setKeyword(!data.name?"":data.name);
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
              <Checkbox.Root
                checked={watch("is_champion")}
                onCheckedChange={(e) => setValue("is_champion", !!e.checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control 
                  bg="white" 
                  color="black"
                  borderColor="gray.300"
                  _checked={{
                    bg: "black",
                    borderColor: "black",
                    color: "white"
                  }} />
                <Checkbox.Label color="black">🏆챔피언 매치만 검색</Checkbox.Label>
              </Checkbox.Root> 
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
                matches?.length !== 0 ?
                  matches?.map((item, idx) => (
                    <Box
                      w="100%"
                      bg="white"
                      border="1px solid"
                      borderColor="gray.200"
                      minH="160px"
                      marginBottom="5px">
                      <Flex
                        minH="10px"
                        bg="white"
                        align="center"
                        justify="center"
                      >
                        <Text fontSize="10px" fontWeight="normal" color="grey" p={4} pb="1px">{formatDate(item.updated_at)}</Text>
                        <Spacer />
                        <Text fontSize="10px" fontWeight="normal" color="black" p={4} pb="1px">♦️{item.point} {item.is_champion ? "챔피언" : ""} 매치</Text>
                      </Flex>
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
                            <Text fontWeight="bold" fontSize="12px" color="#f23f3f">[1팀 {item.team1_race}]</Text>
                            {item.winner == "1" ? <Text fontSize="12px" fontWeight="bold" color="green">　👑승리!</Text> : ""}
                            <Spacer />
                          </Flex>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center">
                            <Text
                              color="black"
                              fontSize={item.team1_player1_name.length >= 10 ? "10px" : "10px"}>
                              {item.team1_player1_name}
                            </Text>
                            <IconButton
                              aria-label="copy-name"
                              onClick={() => {
                                navigator.clipboard.writeText(item.team1_player1_name);
                                toaster.create({
                                  title: "아이디가 복사되었습니다!",
                                  type: "success",
                                  duration: 500,
                                  closable: false,
                                });
                              }}
                              pl="15px" w="6px" h="6px" minW="6px" bg="white" _hover={{ bg: "gray.100" }} _active={{ bg: "gray.200" }}>
                              <Copy size={3} color="grey" />
                            </IconButton>
                          </Flex>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center">
                            <Text fontSize="10px" color="grey">{getChampionEmoji(item.team1_player1_streak)} {item.team1_player1_streak}연승 ({item.team1_player1_mmr})</Text>
                            <Text fontWeight="bold" fontSize="10px" color={item.winner == "1" ? "green" : "red"}>　({item.team1_player1_mmr_changed >= 0 ? "+" : ""}{item.team1_player1_mmr_changed})</Text>
                          </Flex>
                          <Box minH="10px"></Box>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center">
                            <Text
                              color="black"
                              fontSize={item.team1_player2_name.length >= 10 ? "10px" : "10px"}>
                              {item.team1_player2_name}
                            </Text>
                            <IconButton
                              aria-label="copy-name"
                              onClick={() => {
                                navigator.clipboard.writeText(item.team1_player2_name);
                                toaster.create({
                                  title: "아이디가 복사되었습니다!",
                                  type: "success",
                                  duration: 500,
                                  closable: false,
                                });
                              }}
                              pl="15px" w="6px" h="6px" minW="6px" bg="white" _hover={{ bg: "gray.100" }} _active={{ bg: "gray.200" }}>
                              <Copy size={3} color="grey" />
                            </IconButton>
                          </Flex>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center">
                            <Text fontSize="10px" color="grey">{getChampionEmoji(item.team1_player2_streak)} {item.team1_player2_streak}연승 ({item.team1_player2_mmr})</Text>
                            <Text fontWeight="bold" fontSize="10px" color={item.winner == "1" ? "green" : "red"}>　({item.team1_player2_mmr_changed >= 0 ? "+" : ""}{item.team1_player2_mmr_changed})</Text>
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
                            {item.winner == "2" ? <Text fontSize="12px" fontWeight="bold" color="green">　👑승리!</Text> : ""}
                            <Text fontWeight="bold" fontSize="12px" color="#4775ea">　[2팀 {item.team2_race}]</Text>
                          </Flex>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center">
                            <Spacer/>
                            <Text
                              color="black"
                              fontSize={item.team2_player1_name.length >= 10 ? "10px" : "10px"}>
                              {item.team2_player1_name} </Text>
                            <IconButton
                              aria-label="copy-name"
                              onClick={() => {
                                navigator.clipboard.writeText(item.team2_player1_name);
                                toaster.create({
                                  title: "아이디가 복사되었습니다!",
                                  type: "success",
                                  duration: 500,
                                  closable: false,
                                });
                              }}
                              pl="15px" w="6px" h="6px" minW="6px" bg="white" _hover={{ bg: "gray.100" }} _active={{ bg: "gray.200" }}>
                              <Copy size={3} color="grey" />
                            </IconButton>
                          </Flex>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center"
                            textAlign="right">
                            <Spacer />
                            <Text fontSize="10px" color="grey">{getChampionEmoji(item.team2_player1_streak)} {item.team2_player1_streak}연승 ({item.team2_player1_mmr})</Text>
                            <Text fontWeight="bold" fontSize="10px" color={item.winner == "2" ? "green" : "red"}>　({item.team2_player1_mmr_changed >= 0 ? "+" : ""}{item.team2_player1_mmr_changed})</Text>
                          </Flex>
                          <Box minH="10px"></Box>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center">
                            <Spacer/>
                            <Text
                              color="black"
                              fontSize={item.team2_player2_name.length >= 10 ? "10px" : "10px"}>
                              {item.team2_player2_name} </Text>
                            <IconButton
                              aria-label="copy-name"
                              onClick={() => {
                                navigator.clipboard.writeText(item.team2_player2_name);
                                toaster.create({
                                  title: "아이디가 복사되었습니다!",
                                  type: "success",
                                  duration: 500,
                                  closable: false,
                                });
                              }}
                              pl="15px" w="6px" h="6px" minW="6px" bg="white" _hover={{ bg: "gray.100" }} _active={{ bg: "gray.200" }}>
                              <Copy size={3} color="grey" />
                            </IconButton>
                          </Flex>
                          <Flex
                            h="100%"
                            bg="white"
                            align="center"
                            textAlign="right">
                            <Spacer />
                            <Text fontSize="10px" color="grey">{getChampionEmoji(item.team2_player2_streak)} {item.team2_player2_streak}연승 ({item.team2_player2_mmr})</Text>
                            <Text fontWeight="bold" fontSize="10px" color={item.winner == "2" ? "green" : "red"}>　({item.team2_player2_mmr_changed >= 0 ? "+" : ""}{item.team2_player2_mmr_changed})</Text>
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
                    <Text color="black">경기 정보가 없습니다.</Text>
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
