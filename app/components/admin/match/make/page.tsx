"use client";

import {
    Box,
    Container,
    Flex,
    Heading,
    VStack,
    HStack,
    Image,
    Button,
    Text,
    Spacer,
    Field,
    Input,
    Stack,
    RadioGroup
} from "@chakra-ui/react";

import { setCookie, getCookie } from 'cookies-next';
import { useEffect } from "react";
import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form"

interface FormValues {
    token: string

    team1_race: string|null
    team1_player1_name: string
    team1_player2_name: string

    team2_race: string|null
    team2_player1_name: string
    team2_player2_name: string
}

const items = [
    { label: "Zerg", value: "1" },
    { label: "Terran", value: "2" },
    { label: "Protoss", value: "3" },
]

export default function OverviewPage() {

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [selectedTeam1, setSelectedTeam1] = useState<string | null>("Z");
    const [selectedTeam2, setSelectedTeam2] = useState<string | null>("Z");

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
         const ok = window.confirm("매치를 생성하시겠습니까?");
        if (!ok) return; 

        data.token = authToken as string;

        data.team1_race = selectedTeam1;
        data.team2_race = selectedTeam2;

        const res = await fetch("/api/match/make", {
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

        alert("매치 생성 성공!");
        redirect("/");
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
                    <Text fontWeight="semibold" color="black">경기 생성</Text>
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
                            <RadioGroup.Root
                                marginBottom="10px"
                                defaultValue="1"
                                onValueChange={(details) => setSelectedTeam1(details.value)}
                            >
                                <Text fontSize="12px" color="grey" pb="2px">1팀 종족</Text>
                                <HStack gap="6">
                                    {items.map((item) => (
                                        <RadioGroup.Item key={item.value} value={item.value}>
                                            <RadioGroup.ItemHiddenInput />
                                            <RadioGroup.ItemIndicator />
                                            <RadioGroup.ItemText color="black">{item.label}</RadioGroup.ItemText>
                                        </RadioGroup.Item>
                                    ))}
                                </HStack>
                            </RadioGroup.Root>
                            <Stack gap="4" align="flex-start" maxW="sm">
                                <Field.Root invalid={!!errors.team1_player1_name}>
                                    <Field.Label color="black">[팀1] Maker ID</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("team1_player1_name")} />
                                    <Field.ErrorText>{errors.team1_player1_name?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.team1_player2_name}>
                                    <Field.Label color="black">[팀1] Controller ID</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("team1_player2_name")} />
                                    <Field.ErrorText>{errors.team1_player2_name?.message}</Field.ErrorText>
                                </Field.Root>

                                <RadioGroup.Root
                                    marginTop="30px"
                                    marginBottom="10px"
                                    defaultValue="1"
                                    onValueChange={(details) => setSelectedTeam2(details.value)}
                                >
                                    <Text fontSize="12px" color="grey" pb="2px">2팀 종족</Text>
                                    <HStack gap="6">
                                        {items.map((item) => (
                                            <RadioGroup.Item key={item.value} value={item.value}>
                                                <RadioGroup.ItemHiddenInput />
                                                <RadioGroup.ItemIndicator />
                                                <RadioGroup.ItemText color="black">{item.label}</RadioGroup.ItemText>
                                            </RadioGroup.Item>
                                        ))}
                                    </HStack>
                                </RadioGroup.Root>

                                <Field.Root invalid={!!errors.team2_player1_name}>
                                    <Field.Label color="black">[팀2] Maker ID</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("team2_player1_name")} />
                                    <Field.ErrorText>{errors.team2_player1_name?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.team2_player2_name}>
                                    <Field.Label color="black">[팀2] Controller ID</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("team2_player2_name")} />
                                    <Field.ErrorText>{errors.team2_player2_name?.message}</Field.ErrorText>
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