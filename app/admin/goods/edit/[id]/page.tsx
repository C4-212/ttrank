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
import { MotionFlex, Player, MotionBox, CardAnim } from "@/app/components/common/class";
import FooterNav from "@/app/components/common/footer";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form"
import { useParams } from "next/navigation";

interface FormValues {
    token: string
    name: string
    point: number
    count: number
}

function remove(token: string | undefined, name: string, idx: number) {
    let data = {
        token: token,
        idx: idx
    };

    const removeFame = async () => {

        const ok = window.confirm(name + "을(를) 삭제하시겠습니까?");
        if (!ok) return;

        const res = await fetch(`/api/goods/delete/${idx}`, {
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

        alert("상품 삭제 성공!");
        redirect("/point/goods");
    }
    removeFame();
}

export default function OverviewPage() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const authToken = getCookie('authToken')?.toString();
    const params = useParams<{ id: string }>();

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
        getValues,
        formState: { errors },
    } = useForm<FormValues>()

    useEffect(() => {
        if (!params?.id) return;

        const fetchGoods = async () => {
            const res = await fetch(`/api/goods/${params.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!data.success) {
                alert("상품 정보를 불러오지 못했습니다.");
                return;
            }

            // 👇 react-hook-form 값 세팅
            setValue("name", data.data.name);
            setValue("point", data.data.point);
            setValue("count", data.data.count);
        };

        fetchGoods();
    }, [params?.id, setValue]);    

    const onSubmit = handleSubmit(async (data) => {
        const ok = window.confirm("상품을 수정하시겠습니까?");
        if (!ok) return;

        data.token = authToken as string;
        const res = await fetch(`/api/goods/edit/${params.id}`, {
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

        alert("상품 수정 성공!");
        redirect("/point/goods");
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
                    <Text fontWeight="semibold" color="black">상품 수정</Text>
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
                        <form onSubmit={onSubmit}>
                            <Stack gap="4" align="flex-start" maxW="sm">
                                <Field.Root invalid={!!errors.name}>
                                    <Field.Label color="black">이름</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("name")} />
                                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.point}>
                                    <Field.Label color="black">포인트</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("point")} />
                                    <Field.ErrorText>{errors.point?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.count}>
                                    <Field.Label color="black">수량</Field.Label>
                                    <Input maxLength={30} fontSize="16px" color="black"{...register("count")} />
                                    <Field.ErrorText>{errors.count?.message}</Field.ErrorText>
                                </Field.Root>

                                <Flex align="center" w="100%" h="100%">
                                    <Button bg="black" color="white" type="submit">변경</Button>
                                    <Button marginLeft="5px" onClick={() => { remove(authToken, getValues("name"), Number(params.id)) }} bg="black" color="white">삭제</Button>
                                </Flex>
                            </Stack>
                        </form>

                    </MotionBox>
                </VStack>
            </Container>
            <FooterNav />
        </Flex>
    );
}