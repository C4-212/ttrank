import WinRateBar from "./WinRateBar";

export default function LiveMatch({
  teamA,
  teamB,
}: {
  teamA: { name: string; mmr: number }[];
  teamB: { name: string; mmr: number }[];
}) {
  const avgA = teamA.reduce((s, p) => s + p.mmr, 0) / teamA.length;
  const avgB = teamB.reduce((s, p) => s + p.mmr, 0) / teamB.length;
  const winRate = Math.round((avgA / (avgA + avgB)) * 100);

  return (
    <div className="bg-neutral-900 rounded-lg p-4 mt-6">
      <h3 className="text-lg mb-2">🔴 실시간 경기</h3>
      <div className="flex justify-between text-sm">
        <div>
          <div className="font-semibold mb-1">TEAM A</div>
          {teamA.map((p) => (
            <div key={p.name}>{p.name} (MMR {p.mmr})</div>
          ))}
        </div>
        <div>
          <div className="font-semibold mb-1">TEAM B</div>
          {teamB.map((p) => (
            <div key={p.name}>{p.name} (MMR {p.mmr})</div>
          ))}
        </div>
      </div>
      <WinRateBar winRate={winRate} />
    </div>
  );
}