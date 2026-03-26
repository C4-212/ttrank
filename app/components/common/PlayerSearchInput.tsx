"use client";

import { Box, Input, Text, Spinner, Flex, Spacer } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { getChampionEmoji } from "@/app/components/common/class";
import { UseFormSetValue } from "react-hook-form";

interface Props {
    name: string;
    value: string;
    setValue: UseFormSetValue<any>;
}

export default function PlayerSearchInput({ name, value, setValue }: Props) {
    const [list, setList] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const isSelectingRef = useRef(false);

    useEffect(() => {
        if (!value || isSelectingRef.current) {
            setList([]);
            isSelectingRef.current = false;
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            const res = await fetch("/api/player/list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword: value }),
            });

            const data = await res.json();
            setList(data.data);
            setOpen(true);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [value]);

    return (
        <Box position="relative" w="60%">
            <Input
                maxLength={30}
                fontSize="16px"
                color="black"
                value={value}
                onChange={(e) =>
                    setValue(name, e.target.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                    })
                }
                onFocus={() => list.length > 0 && setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
            />

            {open && (
                <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    zIndex={20}
                    maxH="200px"
                    overflowY="auto"
                >
                    {loading ? (
                        <Box p={2} textAlign="center">
                            <Spinner size="sm" />
                        </Box>
                    ) : list.length === 0 ? (
                        <Text p={2} fontSize="12px" color="gray.500">
                            검색 결과 없음
                        </Text>
                    ) : (
                        list.map((player) => (
                            <Box
                                key={player.id}
                                px={3}
                                py={2}
                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        isSelectingRef.current = true;
                                        setOpen(false);
                                    }
                                }}

                                onMouseDown={() => {
                                    isSelectingRef.current = true;
                                    setValue(name, player.name, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    });
                                    setOpen(false);
                                }}
                            >
                                <Flex
                                    minH="12px"
                                    bg="transparent"
                                    align="center"
                                    justify="center">
                                        <Box>
                                        <Flex
                                            bg="transparent"
                                            align="center"
                                            justify="center">
                                            <Text fontSize="10px" fontWeight="normal" color="black">{player.name}</Text>
                                            <Text fontSize="10px" fontWeight="normal" color="grey">　({player.mmr})</Text>
                                        </Flex>
                                        <Flex
                                            bg="transparent"
                                            align="center"
                                            justify="center">
                                            <Text fontSize="10px" fontWeight="normal" color="grey">{player.streak} 연승 {getChampionEmoji(player.streak)}</Text>
                                            <Spacer/>
                                        </Flex>
                                        </Box>
                                    <Spacer/>
                                    <Text fontSize="10px" fontWeight="normal" color="black">♦️{player.point}</Text>
                                </Flex>
                            </Box>
                        ))
                    )}
                </Box>
            )}
        </Box>
    );
}
