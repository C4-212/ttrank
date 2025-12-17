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
import { admin_auth } from "@/app/components/common/auth";
import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form"

interface FormValues {
    id: string
    battletag: string
}

export default function OverviewPage() {

    let authToken = getCookie('authToken')?.toString();
    const isAdmin: boolean = admin_auth(authToken != null ? authToken : "");

    useEffect(() => {
        if (!isAdmin) {
            alert("관리자만 접근 가능합니다.");
            redirect("/");
        }
    }, [isAdmin])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>()

    const onSubmit = handleSubmit((data) => {
        // 검증 및 생성
        console.log(data)
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
                                <Field.Root invalid={!!errors.id}>
                                    <Field.Label>아이디</Field.Label>
                                    <Input {...register("id")} />
                                    <Field.ErrorText>{errors.id?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.battletag}>
                                    <Field.Label>배틀코드</Field.Label>
                                    <Input {...register("battletag")} />
                                    <Field.ErrorText>{errors.battletag?.message}</Field.ErrorText>
                                </Field.Root>

                                <Button type="submit">생성</Button>
                            </Stack>
                        </form>

                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}