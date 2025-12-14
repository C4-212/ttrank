import StreamIcons from "./StreamIcons";
import LiveMatch from "./LiveMatch";

export default function OverviewPage() {
  return (
    <main style={{ padding: 32 }}>
      <h1>TT Rank Overview</h1>

      {/* 방송 송출 */}
      <section>
        <h2>📺 방송 송출</h2>
        <StreamIcons />
      </section>

      {/* 실시간 경기 */}
      <section>
        <LiveMatch
          teamA={[
            { name: "PlayerA1", mmr: 2100 },
            { name: "PlayerA2", mmr: 2000 },
          ]}
          teamB={[
            { name: "PlayerB1", mmr: 1900 },
            { name: "PlayerB2", mmr: 1950 },
          ]}
        />
      </section>
    </main>
  );
}