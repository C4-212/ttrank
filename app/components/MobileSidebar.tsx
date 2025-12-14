"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 상단 바 */}
      <header className="fixed top-0 left-0 w-full h-14 bg-black border-b border-zinc-800 flex items-center px-4 z-50">
        <button onClick={() => setOpen(!open)} className="text-white text-xl">
          ☰
        </button>
        <h1 className="ml-4 text-white font-bold">TT Rank</h1>
      </header>

      {/* 사이드바 */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mt-16 px-4 space-y-4">
          <Link href="/ranking" onClick={() => setOpen(false)}>
            <div className="text-white p-3 rounded bg-zinc-800">선수 랭킹</div>
          </Link>
          <Link href="/matches" onClick={() => setOpen(false)}>
            <div className="text-white p-3 rounded bg-zinc-800">경기 기록</div>
          </Link>
        </div>
      </aside>

      {/* 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}