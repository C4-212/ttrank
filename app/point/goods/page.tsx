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
    Button,
    Image
} from "@chakra-ui/react";

import { formatDate_YMD, Goods, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import { setCookie, getCookie } from 'cookies-next';
import FooterNav from "@/app/components/common/footer";
import { redirect } from "next/navigation";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";

export default function OverviewPage() {
    const [page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(1);
    const [leaderboard, setLeaderBoard] = useState<Goods[] | null>(null);
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
            const res = await fetch("/api/goods/list", {
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
                    <Text fontWeight="semibold" color="black">🎁상품 리스트</Text>
                    <Spacer />
                    {
                        isAdmin ?
                            <Link href="/admin/goods/add">
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
                        <Text fontWeight="medium" color="black">🎁상품 리스트란?</Text>
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text color="black">♦️(포인트)를 상품으로 교환할 수 있습니다.</Text>
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
                                                align="center"
                                                marginBottom="5px">
                                                <Image alt="goods" w="50px" h="50px" pr="5px" src={item.src ? `/goods/${item.src}` : "/goods/default.webp"} onError={(e) => {
                                                    (e.currentTarget as HTMLImageElement).src = "/goods/default.webp";
                                                }}/>
                                                <Flex
                                                    direction="column"
                                                    h="100%"
                                                    pr="5px"
                                                    justify="center">
                                                    <Text color="black" fontSize={item.name.length > 10 ? "12px" : "14px"}>{item.name}</Text>
                                                </Flex>
                                                {
                                                    isAdmin ? <Link href={"/admin/goods/edit/" + item.idx}><Button bg="black" color="white">변경</Button></Link> : ""
                                                }
                                                <Spacer />
                                                <Text fontWeight="normal" color="black" fontSize="12px">♦️{item.point}</Text>
                                            </Flex>
                                            {
                                                item.count > 0?<Text pt="5px" fontWeight="normal" color="black" fontSize="12px">{item.count}개 남음</Text>:
                                                <Text pt="5px" fontWeight="normal" color="red" fontSize="12px">재고없음</Text>
                                            }
                                            
                                        </Box>
                                    )) :
                                    <Flex
                                        h="200px"
                                        bg="white"
                                        align="center"
                                        justify="center">
                                        <Text color="black">상품 정보가 없습니다.</Text>
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