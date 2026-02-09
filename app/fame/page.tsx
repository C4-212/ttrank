"use client";

import {
    Box,
    Container,
    Flex,
    VStack,
    Text,
    Spacer,
    Spinner,
    Link,
    Button
} from "@chakra-ui/react";

import { formatDate_YMD, Fame, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import { setCookie, getCookie } from 'cookies-next';
import FooterNav from "@/app/components/common/footer";
import { redirect } from "next/navigation";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";

function remove(token: string | undefined, name: string, idx: number) {
    let data = {
        token: token,
        idx: idx
    };

    const removeFame = async () => {

        const ok = window.confirm(name + "을(를) 삭제하시겠습니까?");
        if (!ok) return;

        const res = await fetch("/api/fame/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        console.log(result)

        if (!result.success) {
            alert(result.error || "서버 에러");
            return;
        }

        alert("명예의전당 삭제 성공!");
        window.location.reload();
    }
    removeFame();
}

export default function OverviewPage() {
    const [page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(1);
    const [leaderboard, setLeaderBoard] = useState<Fame[] | null>(null);
    const [loading, setLoading] = useState(false);
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

    useEffect(() => {
        const player_list = async () => {
            setLoading(true);
            const res = await fetch("/api/fame/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ page: page })
            });

            const fame_data = await res.json();

            if (fame_data.data !== null) {
                setTotalPage(fame_data.pagination.totalPage);
                setLeaderBoard(fame_data.data);
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
                    <Text fontWeight="semibold" color="black">🏆명예의전당</Text>
                    <Spacer />
                    {
                        isAdmin ?
                            <Link href="/admin/fame/add">
                                <Button bg="black" color="white"> 추가 </Button>
                            </Link> : ""
                    }
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
                        minH="70px"
                        variants={CardAnim}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.4 }}
                    >
                        <Text fontWeight="medium" color="black">🏆(명예의전당)이란?</Text>
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text color="black">10연승을 달성하면 명예의전당에 기록됩니다.<br />
                                상품으로 ♦️100을 지급합니다. </Text>
                        </Flex>
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
                                                <Text w="50px" fontSize="12px" fontWeight="bold" color="black">{item.round}회</Text>
                                                <Flex
                                                    direction="column"
                                                    h="100%"
                                                    pr="5px"
                                                    justify="center">
                                                    <Text color="black" fontSize={item.name.= 10 ? "12px" : "14px"}>{item.name}</Text>
                                                </Flex>
                                                {
                                                    isAdmin ? <Button onClick={() => remove(authToken, item.name, item.idx)} bg="black" color="white">삭제</Button> : ""
                                                }
                                                <Spacer />
                                                <Text fontWeight="normal" color="grey" fontSize="12px">{item.date}</Text>
                                            </Flex>
                                        </Box>
                                    )) :
                                    <Flex
                                        h="200px"
                                        bg="white"
                                        align="center"
                                        justify="center">
                                        <Text color="black">명예의전당 정보가 없습니다.</Text>
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