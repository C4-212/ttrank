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

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}