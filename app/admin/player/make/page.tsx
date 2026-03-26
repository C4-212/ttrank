"use client";

import {
    Box,
    Container,
    Flex,
    Heading,
    VStack,
    Image,
    Button,
    Text,
    Spacer,
    Field,
    Input,
    Stack,
} from "@chakra-ui/react";
import { LuUser } from "react-icons/lu"

import { setCookie, getCookie } from 'cookies-next';
import { useEffect } from "react";
import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form"

interface FormValues {
    token: string
    name: string
    battle_tag: string
}

export default function OverviewPage() {
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
        if (isAdmin === false) {
            alert("관리자만 접근 가능합니다.");
            redirect("/");
        }
    }, [isAdmin]);

    // TODO: 시작한 경기가 있다면 메인화면으로

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit = handleSubmit(async (data) => {
        const ok = window.confirm("플레이어를 생성하시겠습니까?");
        if (!ok) return; 

        data.token = authToken as string;
        const res = await fetch("/api/player/make", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        // console.log(result)
        
        if (!result.success) {
            alert(result.error || "서버 에러");
            return;
        }

        // 통계 생성
        const res2 = await fetch("/api/statistics/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        const result2 = await res2.json();
        // console.log(result2)
        
        if (!result2.success) {
            alert(result2.error || "서버 에러");
            return;
        }

        alert("선수 생성 성공!");
        redirect("/");
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
                    <Text fontWeight="semibold" color="black">플레이어 생성</Text>
                    <Spacer />
                </Flex>
            </Box>

            {/* Main Content */}
            <Container
                py={6}
                flex="1"
                pb="96px">
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
                        <form onSubmit={onSubmit}>
                            <Stack gap="4" align="flex-start" maxW="sm">
                                <Field.Root invalid={!!errors.name}>
                                    <Field.Label color="black">아이디</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("name")} />
                                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.battle_tag}>
                                    <Field.Label color="black">배틀태그</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("battle_tag")} />
                                    <Field.ErrorText>{errors.battle_tag?.message}</Field.ErrorText>
                                </Field.Root>

                                <Button bg="black" color="white" type="submit">생성</Button>
                            </Stack>
                        </form>

                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}