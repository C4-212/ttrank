export const metadata = {
  title: "TT Rank - 경기 기록",
  description: "TT 방송 경기 기록 확인",
  keywords: "TT, MMR, 연승, 승점, 랭킹, 기록",
  openGraph: {
    title: "TT Rank - 경기 기록",
    description: "TT 방송 경기 기록 확인",
    images: ["/og/og_image.png"],
  },
};

export default function OverviewPage({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}