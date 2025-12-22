export const metadata = {
  title: "TT Rank - 명예의전당",
  description: "TT 방송 경기 명예의 전당",
  keywords: "TT, MMR, 연승, 승점, 랭킹, 명예의 전당",
  openGraph: {
    title: "TT Rank - 명예의 전당",
    description: "TT 방송 경기 명예의 전당",
    images: ["/og/og_image.png"],
  },
};

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}