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
    point: number
    count: number
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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit = handleSubmit(async (data) => {
        const ok = window.confirm("상품을 추가하시겠습니까?");
        if (!ok) return; 

        data.token = authToken as string;
        const res = await fetch("/api/goods/add", {
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

        alert("상품 추가 성공!");
        redirect("/components/point/goods");
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
                    <Text fontWeight="semibold" color="black">상품 추가</Text>
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
                                    <Field.Label color="black">이름</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("name")} />
                                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.point}>
                                    <Field.Label color="black">포인트</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("point")} />
                                    <Field.ErrorText>{errors.point?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.count}>
                                    <Field.Label color="black">수량</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("count")} />
                                    <Field.ErrorText>{errors.count?.message}</Field.ErrorText>
                                </Field.Root>

                                <Button bg="black" color="white" type="submit">추가</Button>
                            </Stack>
                        </form>

                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}