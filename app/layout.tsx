import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <style>
          {`
            html, body, #__next {
              background: transparent !important;
            }
          `}
        </style>
      </head>
      <body>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://ttrank.kr/#org",
                name: "TTRank",
                alternateName: ["TTRank", "티티랭크", "TT랭크"],
                url: "https://ttrank.kr/",
                sameAs: [
                  "https://www.sooplive.co.kr/station/prowlgus",
                  "https://www.youtube.com/@%ED%8B%B0%ED%8B%B02",
                  "https://chzzk.naver.com/10a18c8e9a3a0672a9f0987b2f4394e7",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "TTRank",
                url: "https://ttrank.kr/",
                inLanguage: "ko-KR",
                publisher: { "@id": "https://ttrank.kr/#org" },
                hasPart: [
                  { "@type": "WebPage", name: "유저 랭킹", url: "https://ttrank.kr/player" },
                  { "@type": "WebPage", name: "경기 기록", url: "https://ttrank.kr/match" },
                  { "@type": "WebPage", name: "아너스클럽", url: "https://ttrank.kr/honors" },
                  { "@type": "WebPage", name: "명예의전당", url: "https://ttrank.kr/fame" },
                  { "@type": "WebPage", name: "포인트", url: "https://ttrank.kr/point" },
                  { "@type": "WebPage", name: "상품", url: "https://ttrank.kr/point/goods" },
                  { "@type": "WebPage", name: "룰렛", url: "https://ttrank.kr/point/roulette" },
                ],
              },
            ]),
          }}
        />
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
