export default function Footer() {
  return (
    <footer className="relative z-10 w-full max-w-[760px] mx-auto px-[clamp(20px,6vw,80px)] pb-10 flex flex-wrap items-center justify-between gap-[14px] border-t border-[rgba(125,176,255,0.1)] pt-6">
      <div className="flex items-center gap-[10px]">
        <span
          className="w-[10px] h-[10px] rounded-[2px] rotate-45"
          style={{ background: "linear-gradient(135deg,#7DB0FF,#2E7BFF)", boxShadow: "0 0 10px rgba(46,123,255,0.7)" }}
        />
        <span className="font-display font-bold text-[14px] text-[rgba(255,255,255,0.85)]">
          Savaget <span className="text-brand-light font-medium">INFO</span>
        </span>
      </div>
      <span className="font-code text-[10px] tracking-[0.18em] text-[rgba(255,255,255,0.3)]">
        © 2026 · TODOS OS DIREITOS RESERVADOS
      </span>
    </footer>
  );
}
