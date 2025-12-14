export default function WinRateBar({ winRate }: { winRate: number }) {
  return (
    <div className="mt-4">
      <div className="h-3 w-full bg-neutral-800 rounded overflow-hidden flex">
        <div className="bg-green-500" style={{ width: `${winRate}%` }} />
        <div className="bg-red-500" style={{ width: `${100 - winRate}%` }} />
      </div>
      <div className="flex justify-between text-xs mt-1 text-neutral-400">
        <span>A {winRate}%</span>
        <span>B {100 - winRate}%</span>
      </div>
    </div>
  );
}