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
    { label: "꽝", weight: 50, color: "#f87171" },
    { label: "♦️1", weight: 50, color: "#f8d971ff" },
    { label: "♦️5", weight: 20, color: "#97fb24ff" },
    { label: "♦️10", weight: 10, color: "#34d3cbff" },
    { label: "리액션", weight: 5, color: "#71acf8ff" },
    { label: "♦️50", weight: 5, color: "#6a60faff" },
    { label: "♦️100", weight: 2, color: "#d18bfaff" },
    { label: "♦️500", weight: 1, color: "#fb71b1ff" },
];

const pickWeightedIndex = () => {
    const total = ITEMS.reduce((s, i) => s + i.weight, 0);
    let r = Math.random() * total;
    for (let i = 0; i < ITEMS.length; i++) {
        r -= ITEMS[i].weight;
        if (r <= 0) return i;
    }
    return 0;
};

export default function RouletteCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState<string | null>(null);

    const size = 320;
    const radius = size / 2;
    const sliceAngle = (Math.PI * 2) / ITEMS.length;
    const TOTAL = ITEMS.reduce((s, i) => s + i.weight, 0);

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
        ctx.moveTo(size + 2, radius - 10);
        ctx.lineTo(size + 2, radius + 10);
        ctx.lineTo(size - 18, radius);
        ctx.closePath();
        ctx.fill();
    };

    const spin = () => {
        if (spinning) return;

        setSpinning(true);
        setResult(null);

        // ✅ 초기화
        const initialAngle = 0;
        setRotation(initialAngle);
        draw(initialAngle);

        const winIndex = pickWeightedIndex();

        const targetAngle =
            Math.PI * 6 - (winIndex * sliceAngle + sliceAngle / 2);

        const start = performance.now();
        const duration = 2400;

        const animate = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const current =
                initialAngle + targetAngle * easeOut;

            setRotation(current);
            draw(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setResult(ITEMS[winIndex].label);
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
                    <Text fontWeight="semibold" color="black">🎁룰렛 돌리기 (방송용)</Text>
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
                        <Text fontWeight="medium" color="black">🎁룰렛 돌리기란?</Text>
                        <Flex
                            h="70px"
                            bg="white"
                            align="center"
                            justify="center"
                        >
                            <Text color="black">방송에서 사용하는 룰렛입니다.<br />
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
                                <Text fontSize="lg" fontWeight="bold">
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
                                <Table.Row bg="gray.100">
                                    <Table.ColumnHeader>결과</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="right">
                                        확률
                                    </Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {ITEMS.map((item) => (
                                    <Table.Row key={item.label}>
                                        <Table.Cell>
                                            {item.label}
                                        </Table.Cell>
                                        <Table.Cell textAlign="right">
                                            {((item.weight / TOTAL) * 100).toFixed(1)}%
                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                                <Table.Row fontWeight="bold">
                                    <Table.Cell>합계</Table.Cell>
                                    <Table.Cell textAlign="right">100%</Table.Cell>
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