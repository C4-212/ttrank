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
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}