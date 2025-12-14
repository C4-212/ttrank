import SideMenu from "./SideMenu";
import StreamIcons from "./StreamIcons";
import LiveMatch from "./LiveMatch";

export default function OverviewPage() {
  // 실제 데이터는 API fetch로 대체 권장
  const teamA = [
    { name: "PlayerA1", mmr: 2100 },
    { name: "PlayerA2", mmr: 2050 },
  ];
  const teamB = [
    { name: "PlayerB1", mmr: 1950 },
    { name: "PlayerB2", mmr: 2000 },
  ];

  return (
    <>
      <SideMenu />

      <main className="flex-1 p-4 overflow-y-auto">
        <StreamIcons />
        <LiveMatch teamA={teamA} teamB={teamB} />
      </main>
    </>
  );
}