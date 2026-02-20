import {
  Box,
} from "@chakra-ui/react";

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return (
  <Box bg="gray.200" minH="100vh">
    <Box
      maxW="430px"
      mx="auto"
      bg="white"
      minH="100vh"
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
    >
      {children}
    </Box>
  </Box>
  );
}