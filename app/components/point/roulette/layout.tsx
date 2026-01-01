export const metadata = {
  title: "TT Rank - 룰렛",
  description: "TT 방송용 룰렛",
  keywords: "티티랭크, TT랭크, TTRank, TT, MMR, 연승, 승점, 랭킹, 기록, 후원, 아너스, 클럽, 포인트, 룰렛",
  openGraph: {
    title: "TT Rank - 룰렛",
    description: "TT 방송용 룰렛",
    images: ["/og/og_image.png"],
  },
};

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}