import { Provider } from "@/components/ui/provider";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}