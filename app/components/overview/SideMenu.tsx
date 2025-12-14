import Link from "next/link";

const menus = [
  { name: "선수 랭킹", href: "/ranking" },
  { name: "경기 기록", href: "/matches" },
];

export default function SideMenu() {
  return (
    <aside className="w-[220px] bg-neutral-900 border-r border-neutral-800 flex flex-col p-4">
      <div className="text-xl font-bold mb-6 text-center">
        TT Rank
      </div>

      <nav className="flex flex-col gap-4">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            className="text-lg text-neutral-300 hover:text-white transition"
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}