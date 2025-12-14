import Link from "next/link";

const streams = [
  { name: "SOOP(아프리카)", href: "https://www.sooplive.co.kr/station/prowlgus", emoji: "🟣" },
  { name: "유튜브", href: "https://www.youtube.com/@티티2", emoji: "🔴" },
  { name: "치지직", href: "https://chzzk.naver.com/10a18c8e9a3a0672a9f0987b2f4394e7", emoji: "🔵" },
];

export default function StreamIcons() {
  return (
    <div className="flex justify-around py-4">
      {streams.map((s) => (
        <Link key={s.name} href={s.href} target="_blank">
          <div className="text-4xl text-center">
            {s.emoji}
            <div className="text-xs mt-1 text-neutral-400">{s.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}