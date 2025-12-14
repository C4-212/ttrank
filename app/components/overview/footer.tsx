"use client";

import { Box, Flex, Text, Icon } from "@chakra-ui/react";
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
        <Icon as={HiHeart} color="red.400" mr={2} />
        <Text fontSize="sm" color="black">
          TT Rank
        </Text>
      </Flex>
    </Box>
  );
}