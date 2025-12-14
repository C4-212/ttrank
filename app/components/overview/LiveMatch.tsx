import WinRateBar from "./WinRateBar";

type Player = {
  name: string;
  mmr: number;
};

type Props = {
  teamA: Player[];
  teamB: Player[];
};

function calcWinRate(teamA: Player[], teamB: Player[]) {
  const avgA =
    teamA.reduce((sum, p) => sum + p.mmr, 0) / teamA.length;
  const avgB =
    teamB.reduce((sum, p) => sum + p.mmr, 0) / teamB.length;

  return Math.round((avgA / (avgA + avgB)) * 100);
}

export default function LiveMatch({ teamA, teamB }: Props) {
  const winRateA = calcWinRate(teamA, teamB);

  return (
    <div
      style={{
        border: "1px solid #333",
        padding: 16,
        borderRadius: 8,
        marginTop: 24,
      }}
    >
      <h3>🔴 실시간 경기</h3>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h4>Team A</h4>
          {teamA.map((p) => (
            <div key={p.name}>
              {p.name} (MMR {p.mmr})
            </div>
          ))}
        </div>

        <div>
          <h4>Team B</h4>
          {teamB.map((p) => (
            <div key={p.name}>
              {p.name} (MMR {p.mmr})
            </div>
          ))}
        </div>
      </div>

      <WinRateBar teamAWinRate={winRateA} />
    </div>
  );
}