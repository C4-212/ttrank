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
    Input
} from "@chakra-ui/react";

import { formatDate_YMD, Point, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import { setCookie, getCookie } from 'cookies-next';
import FooterNav from "@/app/components/common/footer";
import { redirect } from "next/navigation";
import Pagination from "@/app/components/common/pagination";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";

interface FormValues {
    name: string
}

export default function OverviewPage() {
    const [page, setPage] = useState(1);
    const [total_page, setTotalPage] = useState(1);
    const [leaderboard, setLeaderBoard] = useState<Point[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
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
            const res = await fetch("/api/point/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ page: page, keyword: keyword })
            });

            const fame_data = await res.json();

            if (fame_data.data !== null) {
                setTotalPage(fame_data.pagination.totalPage);
                setLeaderBoard(fame_data.data);
            }
            setLoading(false);
        }
        player_list();
    }, [page, keyword]);

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
        setKeyword(data.name);
    });

    return (
        <Flex minH="100vh" bg="gray.50" direction="column">
            <meta name="format-detection" content="telephone=no"/>
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
                    <Text fontWeight="semibold" color="black">♦️포인트 사용내역</Text>
                    <Spacer />
                    {
                        isAdmin ?
                            <Link href="/point/roulette">
                                <Button bg="black" color="white"> 🎯룰렛 </Button>
                            </Link> : ""
                    }
                    {
                        isAdmin ?
                            <Link href="/admin/point/add">
                                <Button marginLeft="2px" bg="black" color="white"> 추가 </Button>
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
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text fontWeight="medium" color="black">♦️(포인트)란?</Text>
                            <Spacer/>
                            <Link href="/point/goods">
                                <Button marginLeft="2px" bg="black" color="white"> 🎁상품 리스트 </Button>
                            </Link>
                        </Flex>
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text color="black">경기에서 승리 시 얻을 수 있는 점수입니다.<br />
                                획득한 포인트는 상품으로 교환 가능합니다. </Text>
                        </Flex>
                    </MotionBox>
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
                                                <Text w="60px" fontWeight="normal" color="grey" fontSize="10px">{formatDate_YMD(item.updated_at)}</Text>
                                                <Flex
                                                    direction="column"
                                                    h="100%"
                                                    pr="5px"
                                                    justify="center">
                                                    <Text color="black" fontSize={item.name.length >= 10 ? "10px" : "12px"}>{item.name}</Text>
                                                </Flex>
                                                <Text color="grey" fontSize="10px">({item.description})</Text>
                                                <Spacer />
                                                <Text fontWeight="bold" fontSize="12px" color={item.type == "pay" ? "red" : "green"}>♦️{item.point} {item.type == "pay" ? "소모" : "적립"}</Text>
                                            </Flex>
                                        </Box>
                                    )) :
                                    <Flex
                                        h="200px"
                                        bg="white"
                                        align="center"
                                        justify="center">
                                        <Text color="black">포인트 내역이 없습니다.</Text>
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