type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: Props) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full w-[260px]
        bg-neutral-900 text-neutral-100
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <span className="font-semibold">메뉴</span>
        <button onClick={onClose} className="text-sm text-neutral-400">
          닫기
        </button>
      </div>

      <nav className="flex flex-col p-2 gap-1">
        <MenuItem label="선수 랭킹" />
        <MenuItem label="경기 기록" />
      </nav>
    </aside>
  );
}

function MenuItem({ label }: { label: string }) {
  return (
    <button className="w-full text-left rounded-lg px-3 py-2 hover:bg-neutral-800">
      {label}
    </button>
  );
}
