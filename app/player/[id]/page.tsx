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
    Link,
    Table
} from "@chakra-ui/react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { toaster } from "@/components/ui/toaster";

import { Copy } from "lucide-react";
import { Statistics, getChampionEmoji, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form"
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";
import { RefreshCw } from "lucide-react";

interface FormValues {
    name: string
}

const mmrHistory = [
    { date: "02-26", mmr: 1200 },
    { date: "02-27", mmr: 1215 },
    { date: "02-28", mmr: 1190 },
    { date: "03-01", mmr: 1220 },
    { date: "03-02", mmr: 1240 },
    { date: "03-03", mmr: 1230 },
    { date: "03-04", mmr: 1260 },
];

export default function OverviewPage() {
    const params = useParams<{ id: string }>();

    const [page, setPage] = useState(1);
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [statisticsData, setStatisticsData] = useState<Statistics | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingStatistics, setLoadingStatistics] = useState(false);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        if (!params?.id) return;

        const statistics_data = async () => {
            const res = await fetch(`/api/statistics/find/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: playerData?.name || ""
                })
            });

            console.log(res);

            const statistics = await res.json();

            console.log(statistics);

            if (statistics.data !== null) {
                setStatisticsData(statistics.data);
            }
            setLoadingStatistics(false);
        }

        const player_data = async () => {
            const res = await fetch(`/api/player/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const player = await res.json();

            if (player.data !== null) {
                setPlayerData(player.data);
            }
            setLoading(false);
            statistics_data();
        }

        setLoadingStatistics(true);
        setLoading(true);

        player_data();

    }, [params.id]);

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
                    <Text fontWeight="semibold" color="black">👤유저 정보</Text>
                    <Spacer />
                    <Text pl="5px" fontWeight="semibold" fontSize="14px" color="grey">{playerData?.name}</Text>
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
                        {
                            loading ? (
                                <Flex h="30px" justify="center" align="center">
                                    <Spinner size="lg" />
                                </Flex>

                            ) :
                                playerData ? (
                                    <Flex
                                        width="100%"
                                        h="30px"
                                        bg="white"
                                        align="center">
                                        <Flex
                                            direction="column"
                                            h="100%"
                                            justify="center">
                                            <Flex
                                                align="center">
                                                <Text color="black" fontSize="14px">{playerData?.name}</Text>
                                                <Text pl="5px" fontSize="12px" color="#f23f3f">({playerData?.mmr})</Text>
                                                <IconButton
                                                    aria-label="copy-name"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(playerData?.name || "");
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
                                                <Text fontSize="12px" color="green">{playerData?.win} W</Text>
                                                <Text fontSize="12px" color="red">　{playerData?.lose} L</Text>
                                                <Text fontSize="12px" color="black">　({((playerData?.win || 0) / ((playerData?.win || 0) + (playerData?.lose || 1)) * 100).toFixed(2)}%)</Text>
                                                <Text fontSize="12px" color="grey">　(♦️{playerData?.point})</Text>
                                            </Flex>
                                        </Flex>
                                        <Spacer />
                                        <Text fontSize="12px" fontWeight="normal" color="grey">{getChampionEmoji(playerData?.streak ?? 0)} {playerData?.streak}연승</Text>
                                    </Flex>
                                ) : <Text color="black">유저 정보가 없습니다.</Text>
                        }
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
                            loadingStatistics ? (
                                <Flex h="300px" justify="center" align="center">
                                    <Spinner size="lg" />
                                </Flex>
                            ) :
                                statisticsData != null ?
                                    <Box>
                                        <b>{statisticsData.name}</b>님의 상세 정보 <br /><br />


                                        <Text color="black" fontStyle="bold" fontSize="14px">1.Maker</Text>
                                        <Table.Root size="sm" variant="outline">
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeader>Matchup</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="right">Zerg</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="right">Terran</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="right">Protoss</Table.ColumnHeader>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="purple.500">
                                                        vs Z
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_ZvsZ_W}/{statisticsData.Maker_ZvsZ_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_ZvsT_W}/{statisticsData.Maker_ZvsT_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_ZvsP_W}/{statisticsData.Maker_ZvsP_L}
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="blue.400">
                                                        vs T
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_TvsZ_W}/{statisticsData.Maker_TvsZ_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_TvsT_W}/{statisticsData.Maker_TvsT_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_TvsP_W}/{statisticsData.Maker_TvsP_L}
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="orange.500">
                                                        vs P
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_PvsZ_W}/{statisticsData.Maker_PvsZ_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_PvsT_W}/{statisticsData.Maker_PvsT_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Maker_PvsP_W}/{statisticsData.Maker_PvsP_L}
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table.Root>

                                        <br /><br />
                                        <Text color="black" fontSize="14px">2. Controller</Text>
                                        <Table.Root size="sm" variant="outline">
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.ColumnHeader>Matchup</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="right">Zerg</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="right">Terran</Table.ColumnHeader>
                                                    <Table.ColumnHeader textAlign="right">Protoss</Table.ColumnHeader>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="purple.500">
                                                        vs Z
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_ZvsZ_W}/{statisticsData.Controller_ZvsZ_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_ZvsT_W}/{statisticsData.Controller_ZvsT_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_ZvsP_W}/{statisticsData.Controller_ZvsP_L}
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="blue.400">
                                                        vs T
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_TvsZ_W}/{statisticsData.Controller_TvsZ_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_TvsT_W}/{statisticsData.Controller_TvsT_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_TvsP_W}/{statisticsData.Controller_TvsP_L}
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="orange.500">
                                                        vs P
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_PvsZ_W}/{statisticsData.Controller_PvsZ_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_PvsT_W}/{statisticsData.Controller_PvsT_L}
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="right">
                                                        {statisticsData.Controller_PvsP_W}/{statisticsData.Controller_PvsP_L}
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table.Root>

                                        <Box mt={8}>
                                            <Text mb={3} fontWeight="semibold">
                                                최근 1주일 MMR 변화
                                            </Text>

                                            <Box
                                                h="250px"
                                                bg="white"
                                                border="1px solid"
                                                borderColor="gray.200"
                                                borderRadius="lg"
                                                p={3}
                                            >
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={mmrHistory}>
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="date" fontSize={12} />
                                                        <YAxis fontSize={12} />
                                                        <Tooltip />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="mmr"
                                                            stroke="#3182CE"
                                                            strokeWidth={2}
                                                            dot={{ r: 3 }}
                                                        />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </Box>
                                        </Box>

                                    </Box>
                                    :
                                    <Flex
                                        h="200px"
                                        bg="white"
                                        align="center"
                                        justify="center">
                                        <Text color="black">유저 상세 정보가 없습니다.</Text>
                                    </Flex>
                        }
                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}
