"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  Spacer,
  IconButton
} from "@chakra-ui/react";

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
          <Text fontWeight="semibold" color="black">TT Rank</Text>
          <Spacer/>
          <IconButton aria-label="메뉴"> <span>☰</span> </IconButton>
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
        <Heading size="sm" color="black">Header</Heading>
      </Box>

      {/* Main Content */}
      <Container
        maxW="md"
        py={6}
        flex="1"
      >
        <VStack align="stretch">
          {/* Column Card */}
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="120px"
          >
            <Text fontWeight="medium" color="black">Column</Text>
          </Box>

          {/* Content Card */}
          <Box
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
            p={4}
            minH="240px"
          >
            <Text fontWeight="medium" color="black">Content</Text>
          </Box>
        </VStack>
      </Container>
    </Flex>
  );
}