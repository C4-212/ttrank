"use client";

import { Box, Input, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState, useRef  } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
    name: string;
    setValue: UseFormSetValue<any>;
}

export default function PlayerSearchInput({ name, setValue }: Props) {
    const [keyword, setKeyword] = useState("");
    const [list, setList] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isSelectingRef = useRef(false);

    useEffect(() => {
        if (!keyword || isSelectingRef.current) {
            setList([]);
            isSelectingRef.current = false;
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            const res = await fetch("/api/player/list", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword: keyword }),
            });

            const data = await res.json();
            setList(data.data);
            setOpen(true);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [keyword]);

    return (
        <Box position="relative" w="60%">
            <Input
                maxLength={30}
                fontSize="16px"
                color="black"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => list.length > 0 && setOpen(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setOpen(false);
                    }, 150);
                }}

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
                                onMouseDown={() => {
                                    isSelectingRef.current = true;
                                    setKeyword(player.name);
                                    setValue(name, player.name);
                                    setOpen(false);
                                }}
                            >
                                <Text color="black">{player.name}</Text>
                            </Box>
                        ))
                    )}
                </Box>
            )}
        </Box>
    );
}