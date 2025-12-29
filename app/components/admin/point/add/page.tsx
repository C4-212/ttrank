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
    RadioGroup,
    HStack
} from "@chakra-ui/react";
import { LuUser } from "react-icons/lu"

import { setCookie, getCookie } from 'cookies-next';
import { useEffect } from "react";
import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form"
import PlayerSearchInput from "@/app/components/common/PlayerSearchInput";

interface FormValues {
    token: string,
    name: string,
    point: number,
    type: string | null,
    description: string | null,
    date: string
}

const type = [
    { label: "소모", value: "1" },
    { label: "적립", value: "2" },
]

const description = [
    { label: "상품", value: "1" },
    { label: "매치", value: "2" },
    { label: "관리자", value: "3" },
]

export default function OverviewPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>("1");
    const [selectedDescription, setSelectedDescription] = useState<string | null>("1");

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
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
        },
    });

    const nameValue = watch("name");

    const onSubmit = handleSubmit(async (data) => {
        const ok = window.confirm("포인트를 추가/사용 하시겠습니까?");
        if (!ok) return;

        data.token = authToken as string;

        data.type = selectedType;
        data.description = selectedDescription;

        const res = await fetch("/api/point/make", {
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

        alert("포인트 추가/사용 성공!");
        redirect("/components/point");
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
                    <Text fontWeight="semibold" color="black">포인트 추가/사용</Text>
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
                                    <Field.Label color="black">아이디</Field.Label>
                                    <PlayerSearchInput
                                        name="name"
                                        value={nameValue}
                                        setValue={setValue}
                                    />
                                </Field.Root>

                                <RadioGroup.Root
                                    marginBottom="30px"
                                    defaultValue="1"
                                    onValueChange={(details) => setSelectedType(details.value)}
                                >
                                    <Text fontSize="12px" color="grey" pb="2px">타입 선택</Text>
                                    <HStack gap="6">
                                        {type.map((item) => (
                                            <RadioGroup.Item key={item.value} value={item.value}>
                                                <RadioGroup.ItemHiddenInput />
                                                <RadioGroup.ItemIndicator />
                                                <RadioGroup.ItemText color="black">{item.label}</RadioGroup.ItemText>
                                            </RadioGroup.Item>
                                        ))}
                                    </HStack>
                                </RadioGroup.Root>

                                <RadioGroup.Root
                                    marginBottom="30px"
                                    defaultValue="1"
                                    onValueChange={(details) => setSelectedDescription(details.value)}
                                >
                                    <Text fontSize="12px" color="grey" pb="2px">설명 선택</Text>
                                    <HStack gap="6">
                                        {description.map((item) => (
                                            <RadioGroup.Item key={item.value} value={item.value}>
                                                <RadioGroup.ItemHiddenInput />
                                                <RadioGroup.ItemIndicator />
                                                <RadioGroup.ItemText color="black">{item.label}</RadioGroup.ItemText>
                                            </RadioGroup.Item>
                                        ))}
                                    </HStack>
                                </RadioGroup.Root>

                                <Field.Root invalid={!!errors.point}>
                                    <Field.Label color="black">포인트</Field.Label>
                                    <Input maxLength={7} fontSize="16px" color="black"{...register("point")} />
                                    <Field.ErrorText>{errors.point?.message}</Field.ErrorText>
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