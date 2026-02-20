export const metadata = {
  title: "TT Rank - 플레이어 랭킹",
  description: "TT 방송 랭킹 확인 및 플레이어 검색",
  keywords: "티티랭크, TT랭크, TTRank, TT, MMR, 연승, 승점, 랭킹, 기록, 후원, 아너스, 클럽",
  openGraph: {
    title: "TT Rank - 플레이어 랭킹",
    description: "TT 방송 랭킹 확인 및 플레이어 검색",
    images: ["/og/og_image.png"],
  },
};

import {
  Box,
} from "@chakra-ui/react";

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return (
  <Box bg="gray.200" minH="100vh" py={6}>
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