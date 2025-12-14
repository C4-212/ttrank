"use client";

import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { HiHeart } from "react-icons/hi";

export default function FooterNav() {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      h="64px"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200"
      zIndex="1000"
    >
      <Flex h="100%" align="center" justify="center">
        <Box
          w="33%"
          h="100%"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200">
          <Flex h="100%" align="center" justify="center">
            <Link href="/" target="_self" rel="noopener noreferrer">
              <Text color="black">유저 랭킹</Text>
            </Link>
          </Flex>
        </Box>

        <Box
          w="33%"
          h="100%"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200">
          <Flex h="100%" align="center" justify="center">
            <Link href="/" target="_self" rel="noopener noreferrer">
              <Text color="black">홈으로</Text>
            </Link>
          </Flex>
        </Box>

        <Box
          w="33%"
          h="100%"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200">

          <Flex h="100%" align="center" justify="center">
            <Link href="/" target="_self" rel="noopener noreferrer">
              <Text color="black">최근 전적</Text>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}