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

import { Honors, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import { setCookie, getCookie } from 'cookies-next';
import FooterNav from "@/app/components/common/footer";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";

export default function OverviewPage() {
    const [page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(1);
    const [leaderboard, setLeaderBoard] = useState<Honors[] | null>(null);
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
            const res = await fetch("/api/honors/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ page: page })
            });

            const honors_data = await res.json();

            if (honors_data.data !== null) {
                setTotalPage(honors_data.pagination.totalPage);
                setLeaderBoard(honors_data.data);
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
                    <Text fontWeight="semibold" color="black">👑아너스클럽</Text>
                    <Spacer />
                    {
                        isAdmin ?
                            <Link href="/components/admin/honors/add">
                                <Button bg="black" color="white"> 후원 추가 </Button>
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
                                                <Text w="50px" fontSize="12px" fontWeight="bold" color="black">{item.rank}등</Text>
                                                <Flex
                                                    direction="column"
                                                    h="100%"
                                                    justify="center">
                                                    <Text color="black" fontSize={item.name.length > 10 ? "12px" : "14px"}>{item.name}</Text>
                                                </Flex>
                                                <Spacer />
                                                <Text fontWeight="normal" color="grey" fontSize="12px">{item.point} 원</Text>
                                            </Flex>
                                        </Box>
                                    )) :
                                    <Flex
                                        h="200px"
                                        bg="white"
                                        align="center"
                                        justify="center">
                                        <Text color="black">아너스클럽 정보가 없습니다.</Text>
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