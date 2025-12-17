"use client";

import {
    Box,
    Container,
    Flex,
    Heading,
    VStack,
    HStack,
    Image,
    Link,
    Text,
    Spacer,
    Icon,
    IconButton,
    Center,
    Button,
    RadioGroup 
} from "@chakra-ui/react";

import { setCookie, getCookie } from 'cookies-next';
import { useEffect } from "react";
import { admin_auth } from "@/app/components/common/auth";
import { Player, MatchPlayer, MotionBox, MotionFlex, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";

const items = [
  { label: "팀1 승리", value: "1" },
  { label: "팀2 승리", value: "2" },
]

export default function OverviewPage() {

    let authToken = getCookie('authToken')?.toString();
    const isAdmin: boolean = admin_auth(authToken != null ? authToken : "");

    useEffect(() => {
        if (!isAdmin) {
            alert("관리자만 접근 가능합니다.");
            redirect("/");
        }
    }, [isAdmin])

    let match_player: MatchPlayer = {
        team1_player1: new Player,
        team1_player2: new Player,
        team2_player1: new Player,
        team2_player2: new Player,
        win_rate: 0,
    };

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
                    <Text fontWeight="semibold" color="black">경기 수정</Text>
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
                        <Box w="100%" bg="white">
                            <Flex
                                h="100%"
                                bg="white"
                                align="center"
                                justify="center"
                                pb="5px"
                            >
                                <Box
                                    w="40%"
                                    bg="white"
                                    p={4}
                                    pb="1px"
                                    minH="150px">
                                    <Text fontWeight="bold" color="#f23f3f" pb="5px">[1팀]</Text>
                                    <Text
                                        color="black"
                                        fontSize={match_player.team1_player1.player_name.length > 10 ? "10px" : "16px"}>
                                        {match_player.team1_player1.player_name}
                                    </Text>
                                    <Text fontSize="12px" color="grey">{match_player.team1_player1.streak}연승 ({match_player.team1_player1.player_mmr})</Text>
                                    <Box minH="10px"></Box>
                                    <Text
                                        color="black"
                                        fontSize={match_player.team1_player2.player_name.length > 10 ? "10px" : "16px"}>
                                        {match_player.team1_player2.player_name}
                                    </Text>
                                    <Text fontSize="12px" color="grey">{match_player.team1_player2.streak}연승 ({match_player.team1_player2.player_mmr})</Text>
                                </Box>
                                <Spacer />
                                <Text fontWeight="bold" fontSize="32px" color="black">VS</Text>
                                <Spacer />
                                <Box
                                    w="40%"
                                    bg="white"
                                    p={4}
                                    pb="1px"
                                    textAlign="right"
                                    minH="150px">
                                    <Text fontWeight="bold" color="#4775ea" pb="5px">[2팀]</Text>
                                    <Text
                                        color="black"
                                        fontSize={match_player.team2_player1.player_name.length > 10 ? "10px" : "16px"}>
                                        {match_player.team2_player1.player_name} </Text>
                                    <Text fontSize="12px" color="grey">{match_player.team2_player1.streak}연승 ({match_player.team2_player1.player_mmr})</Text>
                                    <Box minH="10px"></Box>
                                    <Text
                                        color="black"
                                        fontSize={match_player.team2_player2.player_name.length > 10 ? "10px" : "16px"}>
                                        {match_player.team2_player2.player_name} </Text>
                                    <Text fontSize="12px" color="grey">{match_player.team2_player2.streak}연승 ({match_player.team2_player2.player_mmr})</Text>
                                </Box>
                            </Flex>
                        </Box>
                        <RadioGroup.Root marginBottom="30px" defaultValue="1">
                            <HStack gap="6">
                                {items.map((item) => (
                                    <RadioGroup.Item key={item.value} value={item.value}>
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator />
                                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                ))}
                            </HStack>
                        </RadioGroup.Root>
                        <Button marginRight="5px">변경</Button>
                        <Button>경기무효</Button>
                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}