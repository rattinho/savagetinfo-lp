import { ReactNode } from "react";

export default function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-code font-medium text-[10.5px] tracking-[0.28em] uppercase text-[rgba(125,176,255,0.92)] px-4 py-2 rounded-full border border-[rgba(125,176,255,0.2)] bg-[rgba(46,123,255,0.07)] mb-[clamp(16px,2.4vh,28px)]">
      <span className="w-[5px] h-[5px] rounded-full bg-[rgba(125,176,255,0.9)] shadow-[0_0_8px_rgba(46,123,255,0.8)]" />
      {children}
    </span>
  );
}
