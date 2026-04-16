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
    RadioGroup,
    Checkbox
} from "@chakra-ui/react";

import { setCookie, getCookie } from 'cookies-next';
import { useEffect, useMemo } from "react";
import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";

interface FormValues {
    type: string | null
    point: string | null
}

const items = [
    { label: "1:1", value: "1vs1" },
    { label: "2:2", value: "2vs2" },
]

export default function OverviewPage() {
    const [selectType, setselectType] = useState<string | null>("1vs1");
    const [point, setPoint] = useState<string>("0");

    const authToken = getCookie('authToken')?.toString();

    const resultText = useMemo(() => {
        if (!point) return "";

        const pointNum = Number(point);
        let pointSum: number = 0;

        switch (selectType) {
            case "1vs1":
                pointSum = pointNum * 2;
                break;
            case "2vs2":
                pointSum = pointNum * 4;
                break;
        }

        if (selectType === "1vs1") {
            pointSum = pointNum * 2;
        }

        else if (selectType === "2vs2") {
            pointSum = pointNum * 4;
        }

        const commission = Math.ceil(pointSum * 0.05);
        const winnerPoint = Math.floor((pointSum - commission) / (selectType === "1vs1" ? 1 : 2));

        return (
            <VStack align="start" spaceY={1} mt="10px">
                <Text color="black" fontSize="14px">참여 인원 : {selectType === "1vs1" ? "2명" : "4명"}</Text>
                <Text color="black" fontSize="14px">총 참여 포인트 : ♦️{pointSum}</Text>
                <Text color="black" fontSize="14px">승리 포인트 : ♦️1</Text>
                <Text color="black" fontSize="14px" mb="20px">운영 포인트 : ♦️{commission}</Text>

                <Text color="black" fontWeight="bold" fontSize="16px">승리 시 1인당 획득 포인트 : ♦️{winnerPoint} + 1(승리 포인트)</Text>
            </VStack>
        );
    }, [point, selectType]);

    return (
        <Flex minH="100vh" bg="gray.50" direction="column">
            <meta name="format-detection" content="telephone=no" />
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
                    <Text fontWeight="semibold" color="black">🚩포인트 규칙</Text>
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
                        minH="30px"
                        variants={CardAnim}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.4 }}
                    >
                        <Flex
                            h="30px"
                            bg="white"
                            align="center"
                            justify="center">
                            <Text fontWeight="medium" color="black">♦️포인트 규칙</Text>
                            <Spacer />
                        </Flex>
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text color="black" fontSize="14px">포인트는 타인에게 양도 불가능합니다.<br />
                                본인의 계정에 한해서만 인증 완료 후 이동 가능합니다.<br />
                                타인에게 사용해주는 것은 가능합니다. (참가비/상품교환)</Text>
                            <Spacer />
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
                        <Text fontWeight="medium" color="black" mb="4px">♦️포인트빵 계산기</Text>
                        <Text fontSize="14px" color="black" mb="2px">[기본 규칙]</Text>
                        <Text fontSize="12px" color="grey" mb="2px">운영 포인트 : 총 참여 포인트의 5% ※소수점 올림</Text>
                        <Text fontSize="12px" color="grey" mb="10px">승리 포인트 : ♦️1</Text>

                        <Text fontSize="14px" color="black" mb="2px">[승리 시 1인당 획득 포인트(♦️)] ※소수점 버림</Text>
                        <Text fontSize="12px" color="grey" mb="20px">([총 참여 포인트] - [운영 포인트]) / ([참여 인원] / 2) + [승리 포인트]</Text>

                        <RadioGroup.Root
                            marginBottom="10px"
                            defaultValue="1vs1"
                            onValueChange={(details) => setselectType(details.value)}>
                            <Text fontSize="14px" color="black" mb="2px">[게임 종류]</Text>
                            <HStack gap="3">
                                {items.map((item) => (
                                    <RadioGroup.Item color="black"
                                        key={item.value}
                                        value={item.value}
                                        px={3}
                                        py={1}
                                        border="1px solid"
                                        borderColor="gray.400"
                                        borderRadius="md"
                                        _checked={{
                                            bg: "black",
                                            color: "white",
                                            borderColor: "black",
                                        }}
                                    >
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                ))}
                            </HStack>
                        </RadioGroup.Root>
                        <Field.Root marginBottom="10px">
                            <Field.Label color="black">사용 포인트 (1인당)</Field.Label>
                            <Input
                                w="60%"
                                maxLength={5}
                                fontSize="16px"
                                color="black"
                                value={point}
                                onChange={(e) => {
                                    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                                    setPoint(onlyNumber);
                                }}
                            />
                        </Field.Root>
                        {resultText}
                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}
