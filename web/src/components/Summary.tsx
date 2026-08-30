import { useEffect, useState } from "react";
import { RoundResult } from "../types";
import { MAX_SCORE_PER_ROUND, TOTAL_ROUNDS } from "../lib/gameData";

interface SummaryProps {
  results: RoundResult[];
  onPlayAgain: () => void;
}

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(eased * target));
      if (prog < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{val}</>;
}

export default function Summary({ results, onPlayAgain }: SummaryProps) {
  const total = results.reduce((s, r) => s + r.breakdown.total, 0);
  const maxTotal = MAX_SCORE_PER_ROUND * TOTAL_ROUNDS;
  const pct = total / maxTotal;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const grade =
    pct >= 0.85 ? { label: "Fashion Icon", emoji: "👑", color: "#f59e0b", desc: "You were born for the runway." }
    : pct >= 0.70 ? { label: "Style Star", emoji: "🌟", color: "#8b5cf6", desc: "You've got serious style chops." }
    : pct >= 0.55 ? { label: "Trend Setter", emoji: "✨", color: "#3b82f6", desc: "Not bad — you know your stuff." }
    : pct >= 0.40 ? { label: "Getting There", emoji: "👗", color: "#10b981", desc: "A bit more practice and you'll shine." }
    : { label: "Fashion Newbie", emoji: "😅", color: "#ef4444", desc: "Keep experimenting — style takes time!" };

  return (
    <div
      className="flex flex-col gap-4 w-full max-w-md mx-auto transition-all"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transitionDuration: "500ms" }}
    >
      {/* Hero score */}
      <div className="flex flex-col items-center gap-2 py-6 rounded-3xl" style={{ background: `linear-gradient(135deg, ${grade.color}22, ${grade.color}08)`, border: `2px solid ${grade.color}44` }}>
        <div className="text-5xl">{grade.emoji}</div>
        <div className="text-2xl font-black" style={{ fontFamily: "Fraunces, serif", color: grade.color }}>{grade.label}</div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>{grade.desc}</div>
        <div className="flex items-end gap-1 mt-2">
          <span className="text-5xl font-black tabular-nums" style={{ color: grade.color, fontFamily: "Fraunces, serif" }}>
            <CountUp target={total} />
          </span>
          <span className="text-lg font-bold mb-1" style={{ color: "var(--muted)" }}>/ {maxTotal}</span>
        </div>
      </div>

      {/* Round-by-round recap */}
      <div className="flex flex-col gap-2 rounded-2xl p-4" style={{ background: "var(--panel)", border: "1.5px solid var(--line)" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Round Recap</div>
        {results.map((r, i) => {
          const roundPct = r.breakdown.total / MAX_SCORE_PER_ROUND;
          const roundColor = roundPct >= 0.75 ? "#f59e0b" : roundPct >= 0.5 ? "#8b5cf6" : "#ef4444";
          return (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{r.theme.emoji}</span>
              <div className="flex-1">
                <div className="text-xs font-bold" style={{ color: "var(--ink)" }}>{r.theme.prompt}</div>
                <div className="rounded-full overflow-hidden mt-0.5" style={{ height: 6, background: "var(--line)" }}>
                  <div style={{ width: `${roundPct * 100}%`, height: "100%", background: roundColor, borderRadius: 9999, transition: "width 0.8s ease" }} />
                </div>
              </div>
              <span className="text-sm font-black tabular-nums" style={{ color: roundColor, minWidth: 36, textAlign: "right" }}>
                {r.breakdown.total}
              </span>
            </div>
          );
        })}
      </div>

      {/* Best round */}
      {results.length > 0 && (() => {
        const best = results.reduce((a, b) => a.breakdown.total >= b.breakdown.total ? a : b);
        return (
          <div className="flex items-center gap-3 rounded-2xl p-3" style={{ background: "#f59e0b18", border: "1.5px solid #f59e0b44" }}>
            <span className="text-2xl">🏆</span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "#f59e0b" }}>Best Look</div>
              <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{best.theme.prompt} — {best.breakdown.total} pts</div>
            </div>
          </div>
        );
      })()}

      <button
        onClick={onPlayAgain}
        className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
        style={{ background: grade.color, color: "#fff", fontSize: 16, minHeight: 56 }}
      >
        Play Again 🎀
      </button>
    </div>
  );
}
