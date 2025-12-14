import Link from "next/link";

const streams = [
  {
    name: "SOOP(아프리카)",
    href: "https://www.sooplive.co.kr/station/prowlgus",
    icon: "🟣",
  },
  {
    name: "유튜브",
    href: "https://www.youtube.com/@티티2",
    icon: "🔴",
  },
  {
    name: "치지직",
    href: "https://chzzk.naver.com/10a18c8e9a3a0672a9f0987b2f4394e7",
    icon: "🔵",
  },
];

export default function StreamIcons() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      {streams.map((s) => (
        <Link key={s.name} href={s.href} target="_blank">
          <div
            style={{
              fontSize: 40,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {s.icon}
            <div style={{ fontSize: 12 }}>{s.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}