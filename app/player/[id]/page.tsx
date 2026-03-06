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
    Table,
} from "@chakra-ui/react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    Brush
} from "recharts";

import { toaster } from "@/components/ui/toaster";

import { Copy } from "lucide-react";
import { formatDate_MD, MMR, Statistics, getChampionEmoji, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
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

export default function OverviewPage() {
    const params = useParams<{ id: string }>();

    const [page, setPage] = useState(1);
    const [playerData, setPlayerData] = useState<Player | null>(null);
    const [statisticsData, setStatisticsData] = useState<Statistics | null>(null);
    const [MMRData, setMMRData] = useState<MMR[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingStatistics, setLoadingStatistics] = useState(false);

    useEffect(() => {
        if (!params?.id) return;

        const mmr_data = async (name: string, curr_mmr: number) => {
            const res = await fetch(`/api/match/mmr/list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name || "",
                }),
            });

            const mmr = await res.json();
            const formattedDate = formatDate_MD(new Date());

            if (mmr.data) {
                // console.log(mmr.data)

                // 마지막 MMR 반영
                // mmr.data[mmr.data.length - 1].mmr = curr_mmr;

                const updatedData: MMR[] = [
                    ...mmr.data,
                    {
                        date: formattedDate,
                        mmr: curr_mmr,
                    },
                ];

                setMMRData(updatedData);
            } else {
                setMMRData([
                    {
                        date: formattedDate,
                        mmr: curr_mmr,
                    },
                ]);
            }

            setLoadingStatistics(false);
        };

        const statistics_data = async (name: string, curr_mmr: number) => {
            const res = await fetch(`/api/statistics/find/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name || ""
                })
            });

            const statistics = await res.json();

            if (statistics.data !== null) {
                setStatisticsData(statistics.data);
                mmr_data(name, curr_mmr);
            }
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
                statistics_data(player.data.name, player.data.mmr);
            }
            setLoading(false);
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
                                                <Text fontSize="12px" color="black">　({((playerData?.win || 0) / ((playerData?.win || 0) + (playerData?.lose || 0)) * 100).toFixed(2)}%)</Text>
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
                                        <Text color="black" fontSize="14px">
                                            <b>{statisticsData.name}</b>님의 상세 정보
                                        </Text>
                                        <br /><br />


                                        <Text color="black" fontStyle="bold" fontSize="14px">1.Maker</Text>
                                        <Table.Root size="sm" variant="outline">
                                            <Table.Header backgroundColor="gray.200">
                                                <Table.Row>
                                                    <Table.ColumnHeader color="black">Matchup</Table.ColumnHeader>
                                                    <Table.ColumnHeader color="black" textAlign="center">Zerg</Table.ColumnHeader>
                                                    <Table.ColumnHeader color="black" textAlign="center">Terran</Table.ColumnHeader>
                                                    <Table.ColumnHeader color="black" textAlign="center">Protoss</Table.ColumnHeader>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="purple.500">
                                                        vs Z
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_ZvsZ_W}W {statisticsData.Maker_ZvsZ_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_TvsZ_W}W {statisticsData.Maker_TvsZ_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_PvsZ_W}W {statisticsData.Maker_PvsZ_L}L
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="blue.400">
                                                        vs T
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_ZvsT_W}W {statisticsData.Maker_ZvsT_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_TvsT_W}W {statisticsData.Maker_TvsT_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_PvsT_W}W {statisticsData.Maker_PvsT_L}L
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="orange.500">
                                                        vs P
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_ZvsP_W}W {statisticsData.Maker_ZvsP_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_TvsP_W}W {statisticsData.Maker_TvsP_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Maker_PvsP_W}W {statisticsData.Maker_PvsP_L}L
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table.Root>

                                        <br />
                                        <Text color="black" fontSize="14px">2. Controller</Text>
                                        <Table.Root size="sm" variant="outline">
                                            <Table.Header backgroundColor="gray.200">
                                                <Table.Row>
                                                    <Table.ColumnHeader color="black">Matchup</Table.ColumnHeader>
                                                    <Table.ColumnHeader color="black" textAlign="center">Zerg</Table.ColumnHeader>
                                                    <Table.ColumnHeader color="black" textAlign="center">Terran</Table.ColumnHeader>
                                                    <Table.ColumnHeader color="black" textAlign="center">Protoss</Table.ColumnHeader>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="purple.500">
                                                        vs Z
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_ZvsZ_W}W {statisticsData.Controller_ZvsZ_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_TvsZ_W}W {statisticsData.Controller_TvsZ_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_PvsZ_W}W {statisticsData.Controller_PvsZ_L}L
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="blue.400">
                                                        vs T
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_ZvsT_W}W {statisticsData.Controller_ZvsT_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_TvsT_W}W {statisticsData.Controller_TvsT_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_PvsT_W}W {statisticsData.Controller_PvsT_L}L
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell fontWeight="bold" color="orange.500">
                                                        vs P
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_ZvsP_W}W {statisticsData.Controller_ZvsP_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_TvsP_W}W {statisticsData.Controller_TvsP_L}L
                                                    </Table.Cell>
                                                    <Table.Cell fontSize="10px" color="grey" textAlign="center">
                                                        {statisticsData.Controller_PvsP_W}W {statisticsData.Controller_PvsP_L}L
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table.Root>
                                        <br /><br />

                                        <Box
                                            bg="white"
                                            borderRadius="xl"
                                            boxShadow="0 8px 24px rgba(0,0,0,0.06)"
                                            p={5}
                                        >
                                            <Text fontSize="14px" color="black" fontWeight="bold" mb={4}>
                                                MMR 변동 (최근 100경기)
                                            </Text>

                                            <Box h="220px">

                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart data={MMRData} tabIndex={-1}>

                                                        <defs>
                                                            <linearGradient id="mmrGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="0%" stopColor="#4F8CFF" stopOpacity={0.8} />
                                                                <stop offset="100%" stopColor="#4F8CFF" stopOpacity={0.8} />
                                                            </linearGradient>
                                                        </defs>

                                                        <CartesianGrid
                                                            vertical={false}
                                                            strokeDasharray="3 3"
                                                            stroke="#a1a1a1"
                                                        />

                                                        <XAxis
                                                            dataKey="date"
                                                            interval="preserveStartEnd"
                                                            minTickGap={25}
                                                            tick={{ fontSize: 4, fill: "#5a5a5a" }}
                                                            axisLine={false}
                                                            tickLine={false}
                                                        />

                                                        <YAxis
                                                            domain={[
                                                                (dataMin: number) => dataMin - 30,
                                                                (dataMax: number) => dataMax + 30,
                                                            ]}
                                                            tick={{ fontSize: 4, fill: "#5a5a5a" }}
                                                            axisLine={false}
                                                            tickLine={false}
                                                        />

                                                        <Tooltip
                                                            cursor={{ stroke: "#4F8CFF", strokeWidth: 1 }}
                                                            contentStyle={{
                                                                borderRadius: "12px",
                                                                border: "none",
                                                                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                                            }}
                                                            labelStyle={{ color: "black" }}
                                                            itemStyle={{ color: "#4F8CFF" }}

                                                        />

                                                        <Area
                                                            type="monotone"
                                                            dataKey="mmr"
                                                            stroke="none"
                                                            fill="url(#mmrGradient)"
                                                        />

                                                        <Line
                                                            type="monotone"
                                                            dataKey="mmr"
                                                            stroke="#4F8CFF"
                                                            strokeWidth={3}
                                                            dot={{ r: 2 }}
                                                            activeDot={{ r: 6 }}
                                                        />

                                                        <Brush
                                                            dataKey="date"
                                                            height={20}
                                                            stroke="#4F8CFF"
                                                            travellerWidth={10}
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
