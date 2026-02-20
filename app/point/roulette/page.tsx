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
    Input,
    Table
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatDate_YMD, Point, MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import { setCookie, getCookie } from 'cookies-next';
import FooterNav from "@/app/components/common/footer";
import { redirect } from "next/navigation";
import Pagination from "@/app/components/common/pagination";
import { useForm } from "react-hook-form"
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";

const ITEMS = [
    { label: "꽝", weight: 800, color: "#f87171" },
    { label: "♦️1", weight: 700, color: "#f8d971ff" },
    { label: "♦️2", weight: 400, color: "#edfb24ff" },
    { label: "♦️5", weight: 120, color: "#97fb24ff" },
    { label: "♦️10", weight: 50, color: "#34d3cbff" },
    { label: "♦️50", weight: 6, color: "#6a60faff" },
    { label: "♦️100", weight: 4, color: "#d18bfaff" },
    { label: "♦️500", weight: 2, color: "#fb71b1ff" },
];

// // 테스트 코드
// const pickWeightedIndex = () => {
//     const total = ITEMS.reduce((s, i) => s + i.weight, 0);
//     let r = Math.random() * total;
//     for (let i = 0; i < ITEMS.length; i++) {
//         r -= ITEMS[i].weight;
//         if (r <= 0) return i;
//     }
//     return 0;
// };

const size = 320;
const radius = size / 2;
const sliceAngle = (Math.PI * 2) / ITEMS.length;
const TOTAL = ITEMS.reduce((s, i) => s + i.weight, 0);

export default function RouletteCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);
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

    // 테스트 코드
    // const counter = [
    //     { label: "꽝", count: 0 },
    //     { label: "♦️1", count: 0 },
    //     { label: "♦️2", count: 0 },
    //     { label: "♦️5", count: 0 },
    //     { label: "♦️10", count: 0 },
    //     { label: "♦️50", count: 0 },
    //     { label: "♦️100", count: 0 },
    //     { label: "♦️500", count: 0 },
    // ];

    // let count = 0;
    // while(count < 100000)
    // {
    //     count++;
    //     counter[pickWeightedIndex()].count++;
    // }

    // console.log(counter);

    const draw = (angle: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, size, size);

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle);

        ITEMS.forEach((item, i) => {
            const start = i * sliceAngle;
            const end = start + sliceAngle;

            // 섹션
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, start, end);
            ctx.fillStyle = item.color;
            ctx.fill();

            // 텍스트
            ctx.save();
            ctx.rotate(start + sliceAngle / 2);
            ctx.textAlign = "right";
            ctx.fillStyle = "#111";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(item.label, radius - 16, 5);
            ctx.restore();
        });

        ctx.restore();

        // ▼ 포인터
        ctx.fillStyle = "#000000ff";
        ctx.beginPath();
        ctx.moveTo(size + 2, radius - 5);
        ctx.lineTo(size + 2, radius + 5);
        ctx.lineTo(size - 18, radius);
        ctx.closePath();
        ctx.fill();
    };

    const spin = async () => {
        if (spinning) return;

        setSpinning(true);
        setResult(null);

        const res = await fetch("/api/roulette", {
            method: "POST",
        });
        const data = await res.json();

        const winIndex = data.winIndex;

        const initialAngle = 0;
        setRotation(initialAngle);
        draw(initialAngle);

        const targetAngle =
            Math.PI * 6 - (winIndex * sliceAngle + sliceAngle / 2);

        const start = performance.now();
        const duration = 3500;

        const animate = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current = initialAngle + targetAngle * easeOut;

            setRotation(current);
            draw(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setResult(data.label);
                setSpinning(false);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        draw(rotation);
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
                    <Text fontWeight="semibold" color="black">🎯룰렛 돌리기 (방송용)</Text>
                    <Spacer />
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
                        <Text fontWeight="medium" color="black">🎯룰렛 돌리기란?</Text>
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text color="black">방송에서 사용하는 룰렛입니다. (1회:♦️5)<br />
                            1,000원 이상 후원시 룰렛 기회가 주어집니다.</Text>
                        </Flex>
                    </MotionBox>
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
                        <VStack align="center">
                            <canvas
                                ref={canvasRef}
                                width={size}
                                height={size}
                                style={{ display: "block" }}
                            />

                            <Button
                                onClick={spin}
                                disabled={spinning}
                                bg="black"
                                color="white"
                            >
                                {spinning ? "돌리는 중..." : "룰렛 돌리기"}
                            </Button>

                            {result && (
                                <Text color="black" fontSize="lg" fontWeight="bold">
                                    🎉 결과: {result}
                                </Text>
                            )}
                        </VStack>
                    </MotionBox>
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
                        <Text fontWeight="medium" color="black" pb="4px">🎁확률표</Text>
                        <Table.Root size="sm">
                            <Table.Header>
                                <Table.Row bg="#eeeeeeff">
                                    <Table.ColumnHeader color="black">결과</Table.ColumnHeader>
                                    <Table.ColumnHeader color="black" textAlign="right">
                                        확률
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body bg="white">
                                {ITEMS.map((item) => (
                                    <Table.Row bg="white" key={item.label}>
                                        <Table.Cell bg="white" color="black">
                                            {item.label}
                                        </Table.Cell>
                                        <Table.Cell bg="white" color="black" textAlign="right">
                                            {((item.weight / TOTAL) * 100).toFixed(1)}%
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                                <Table.Row bg="white" fontWeight="bold">
                                    <Table.Cell bg="white" color="black">합계</Table.Cell>
                                    <Table.Cell bg="white" color="black" textAlign="right">100%</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}