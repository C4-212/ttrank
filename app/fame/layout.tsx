export const metadata = {
  metadataBase: new URL("https://ttrank.kr"),
  title: "TT Rank - 명예의전당",
  description: "TT 방송 경기 명예의 전당",
  keywords: "티티랭크, TT랭크, TTRank, TT, MMR, 연승, 승점, 랭킹, 명예의 전당",
  openGraph: {
    title: "TT Rank - 명예의 전당",
    description: "TT 방송 경기 명예의 전당",
    images: ["/og/og_image.png"],
  },
};

import {
  Box,
} from "@chakra-ui/react";

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return (
  <Box bg="gray.200" minH="100vh" >
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