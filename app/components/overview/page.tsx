"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  VStack,
  Image,
  Link,
  Text,
  Spacer,
  Icon,
  IconButton,
  Center
} from "@chakra-ui/react";
import FooterNav from "../common/footer";
import { HiHeart } from "react-icons/hi";

export default function OverviewPage() {
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
          <Text fontWeight="semibold" color="black">승점/MMR 확인</Text>
          <Spacer />
          {/* <IconButton aria-label="메뉴"> <span>☰</span> </IconButton> */}
        </Flex>
      </Box>

      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={4}
        py={3}
      >
        <Flex align="center" w="100%" h="100%">
          <Link href="https://www.sooplive.co.kr/station/prowlgus" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/streaming/icon_soop.png"
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt="SOOP"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            />
          </Link>
          <Spacer />
          <Link href="https://www.youtube.com/@티티2" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/streaming/icon_youtube.png"
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt="Youtube"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            />
          </Link>
          <Spacer />
          <Link href="https://chzzk.naver.com/10a18c8e9a3a0672a9f0987b2f4394e7" target="_blank" rel="noopener noreferrer">
            <Image
              src="/icons/streaming/icon_chzzk.png"
              boxSize="50px"
              borderRadius="full"
              fit="cover"
              alt="CHZZK"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            />
          </Link>
        </Flex>
      </Box>
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={4}
        py={3}
      >
        <Flex h="100%" align="center" justify="center">
          <Icon as={HiHeart} color="red.400" mr={2} />
          <Text fontSize="sm" color="black"> 후원 계좌 : 601027-5611-9562 농협 (강천수) </Text>
        </Flex>
      </Box>

      {/* Main Content */}
      <Container
        py={6}
        flex="1"
        pb="96px"
      >
        <VStack align="stretch">
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="120px"
          >
            <Text fontWeight="medium" color="black">📢공지사항</Text>
            <Flex
              h="100px"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">TT 티비 방송에서 플레이한 경기의 승점 및 MMR을 확인할 수 있는 페이지 입니다.</Text>
            </Flex>
          </Box>

          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="240px"
          >
            <Text fontWeight="medium" color="black">🔥실시간 라이브</Text>
            <Flex
              h="200px"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">진행중인 경기가 없습니다.</Text>
            </Flex>
          </Box>

          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="300px"
          >
            <Text fontWeight="medium" color="black">🥇유저 랭킹</Text>
            <Flex
              h="200px"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">유저 랭킹 정보가 없습니다.</Text>
            </Flex>
          </Box>
        </VStack>
      </Container>
      <FooterNav />
    </Flex>
  );
}