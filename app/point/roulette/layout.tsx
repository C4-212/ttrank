export const metadata = {
  metadataBase: new URL("https://ttrank.kr"),
  title: "TT Rank - 룰렛",
  description: "TT 방송용 룰렛",
  keywords: "티티랭크, TT랭크, TTRank, TT, MMR, 연승, 승점, 랭킹, 기록, 후원, 아너스, 클럽, 포인트, 룰렛",
  openGraph: {
    title: "TT Rank - 룰렛",
    description: "TT 방송용 룰렛",
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