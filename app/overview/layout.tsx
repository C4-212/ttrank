export const metadata = {
  title: "TT Rank - 실시간 MMR & 랭킹",
  description: "TT 방송 경기 MMR/연승/승점 실시간 확인 페이지",
  keywords: "티티랭크, TT랭크, TTRank, TT, MMR, 연승, 승점, 랭킹",
  openGraph: {
    title: "TT Rank - 실시간 MMR & 랭킹",
    description: "TT 방송 경기 MMR/연승/승점 실시간 확인 페이지",
    images: ["/og/og_image.png"],
  },
};

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}