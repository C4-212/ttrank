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
import { useState } from "react";
import FooterNav from "../common/footer";
import Pagination from "../common/pagination";

export default function OverviewPage() {
  const [page, setPage] = useState(1);
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
          <Text fontWeight="semibold" color="black">🧾경기 기록</Text>
          <Spacer />
          {/* <IconButton aria-label="메뉴"> <span>☰</span> </IconButton> */}
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
            minH="600px"
          >
            <Flex
              h="100%"
              bg="white"
              align="center"
              justify="center"
            >
              <Text color="black">경기 기록 정보가 없습니다.</Text>
            </Flex>
          </Box>
        </VStack>
        <Pagination
          page={page}
          totalPages={10}
          onChange={setPage}
        />
      </Container>
      <FooterNav />
    </Flex>
  );
}