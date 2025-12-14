export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      {/* 모바일 최대 폭 */}
      <div className="w-full max-w-[1080px] flex">
        {children}
      </div>
    </div>
  );
}