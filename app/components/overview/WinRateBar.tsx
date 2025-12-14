type Props = {
  teamAWinRate: number; // 0 ~ 100
};

export default function WinRateBar({ teamAWinRate }: Props) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", height: 20, width: "100%" }}>
        <div
          style={{
            width: `${teamAWinRate}%`,
            background: "#4ade80",
          }}
        />
        <div
          style={{
            width: `${100 - teamAWinRate}%`,
            background: "#f87171",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
        }}
      >
        <span>팀 A {teamAWinRate}%</span>
        <span>팀 B {100 - teamAWinRate}%</span>
      </div>
    </div>
  );
}