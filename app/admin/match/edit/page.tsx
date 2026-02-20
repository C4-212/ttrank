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
    RadioGroup,
    Spinner
} from "@chakra-ui/react";

import { setCookie, getCookie } from 'cookies-next';
import { getChampionEmoji, Player, LiveMatch, MotionBox, MotionFlex, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

const items = [
    { label: "팀1", value: "1" },
    { label: "팀2", value: "2" },
]

function update(authToken: string, match: LiveMatch, winner: string) {
    const ok = window.confirm("정말 변경하시겠습니까?");
    if (!ok) return;

    const match_update = async () => {
        const res = await fetch("/api/match/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idx: match?.idx, token: authToken, winner: winner, status: "completed", point:match.point })
        });

        const match_data = await res.json();

        if (match_data.success) {
            alert("경기가 완료되었습니다.");
            redirect("/");
        }
        else {
            alert(match_data.error);
            redirect("/");
        }
    }
    match_update();
}

function cancel(authToken: string, match: LiveMatch) {
    const ok = window.confirm("정말 취소하시겠습니까?");
    if (!ok) return;

    const match_cancel = async () => {
        const res = await fetch("/api/match/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idx: match?.idx, token: authToken, winner: "", status: "cancelled" })
        });

        const match_data = await res.json();

        if (match_data.success) {
            alert("경기가 취소되었습니다.");
            redirect("/");
        }
        else {
            alert(match_data.error);
            redirect("/");
        }

    }
    match_cancel();
}

export default function OverviewPage() {

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [match, setMatch] = useState<LiveMatch | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<string | null>("1");
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        const match_live = async () => {
            setLoading(true);
            const res = await fetch("/api/match/live", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: authToken })
            });

            const match_data = await res.json();

            if (match_data.data !== null) {
                const newMatch: LiveMatch = new LiveMatch();

                newMatch.idx = match_data.data.idx;

                newMatch.team1_race = match_data.data.team1_race;

                newMatch.team1_player1_name = match_data.data.team1_player1_name;
                newMatch.team1_player1_streak = match_data.data.team1_player1_streak;
                newMatch.team1_player1_mmr = match_data.data.team1_player1_mmr;
                newMatch.team1_player1_mmr_changed = match_data.data.team1_player1_mmr_changed;
                newMatch.team1_player1_point = match_data.data.team1_player1_point;

                newMatch.team1_player2_name = match_data.data.team1_player2_name;
                newMatch.team1_player2_streak = match_data.data.team1_player2_streak;
                newMatch.team1_player2_mmr = match_data.data.team1_player2_mmr;
                newMatch.team1_player2_mmr_changed = match_data.data.team1_player2_mmr_changed;
                newMatch.team1_player2_point = match_data.data.team1_player2_point;

                newMatch.team2_race = match_data.data.team2_race;

                newMatch.team2_player1_name = match_data.data.team2_player1_name;
                newMatch.team2_player1_streak = match_data.data.team2_player1_streak;
                newMatch.team2_player1_mmr = match_data.data.team2_player1_mmr;
                newMatch.team2_player1_mmr_changed = match_data.data.team2_player1_mmr_changed;
                newMatch.team2_player1_point = match_data.data.team2_player1_point;

                newMatch.team2_player2_name = match_data.data.team2_player2_name;
                newMatch.team2_player2_streak = match_data.data.team2_player2_streak;
                newMatch.team2_player2_mmr = match_data.data.team2_player2_mmr;
                newMatch.team2_player2_mmr_changed = match_data.data.team2_player2_mmr_changed;
                newMatch.team2_player2_point = match_data.data.team2_player2_point;

                newMatch.point = match_data.data.point;

                setMatch(newMatch);
            }
            setLoading(false);
        }
        match_live();
    }, []);

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
                        {
                            loading ? (
                                <Flex h="300px" justify="center" align="center">
                                    <Spinner size="lg" />
                                </Flex>
                            ) :
                            match !== null ?
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
                                            <Text fontWeight="bold" fontSize="12px" color="#f23f3f" pb="5px">[1팀 {match.team1_race}]</Text>
                                            <Text
                                                color="black"
                                                fontSize={match.team1_player1_name.length >= 10 ? "10px" : "16px"}>
                                                {match.team1_player1_name}
                                            </Text>
                                            <Text fontSize="12px" color="grey">{getChampionEmoji(match.team1_player1_streak)} {match.team1_player1_streak}연승 ({match.team1_player1_mmr}) ♦️{match.team1_player1_point}</Text>
                                            <Box minH="10px"></Box>
                                            <Text
                                                color="black"
                                                fontSize={match.team1_player2_name.length >= 10 ? "10px" : "16px"}>
                                                {match.team1_player2_name}
                                            </Text>
                                            <Text fontSize="12px" color="grey">{getChampionEmoji(match.team1_player2_streak)} {match.team1_player2_streak}연승 ({match.team1_player2_mmr}) ♦️{match.team1_player2_point}</Text>
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
                                            <Text fontWeight="bold" fontSize="12px" color="#4775ea" pb="5px">[2팀 {match.team2_race}]</Text>
                                            <Text
                                                color="black"
                                                fontSize={match.team2_player1_name.length >= 10 ? "10px" : "16px"}>
                                                {match.team2_player1_name} </Text>
                                            <Text fontSize="12px" color="grey">{getChampionEmoji(match.team2_player1_streak)} {match.team2_player1_streak}연승 ({match.team2_player1_mmr}) ♦️{match.team2_player1_point}</Text>
                                            <Box minH="10px"></Box>
                                            <Text
                                                color="black"
                                                fontSize={match.team2_player2_name.length >= 10 ? "10px" : "16px"}>
                                                {match.team2_player2_name} </Text>
                                            <Text fontSize="12px" color="grey">{getChampionEmoji(match.team2_player2_streak)} {match.team2_player2_streak}연승 ({match.team2_player2_mmr}) ♦️{match.team2_player2_point}</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                                : ""
                        }
                        <RadioGroup.Root
                            marginBottom="30px"
                            defaultValue="1"
                            onValueChange={(details) => setSelectedTeam(details.value)}
                        >
                            <Text fontSize="12px" color="grey" pb="2px">승리팀 선택</Text>
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
                        <Button onClick={() => {
                            if (authToken !== undefined && match !== null && selectedTeam !== null) {
                                update(authToken, match, selectedTeam);
                            }
                        }}
                            bg="black" color="white" marginRight="5px">
                            변경
                        </Button>
                        <Button onClick={() => {
                            if (authToken !== undefined && match !== null) {
                                cancel(authToken, match);
                            }
                        }}
                            bg="black" color="white">
                            경기무효
                        </Button>
                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}