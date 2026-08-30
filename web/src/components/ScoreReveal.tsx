import { useEffect, useState } from "react";
import { ScoreBreakdown, Theme } from "../lib/gameData";
import { MAX_SCORE_PER_ROUND } from "../lib/gameData";

interface ScoreRevealProps {
  breakdown: ScoreBreakdown;
  theme: Theme;
  roundNumber: number;
  totalRounds: number;
  onNext: () => void;
  isLastRound: boolean;
}

function ScoreBar({ score, max, color, label, delay }: { score: number; max: number; color: string; label: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const pct = Math.round((score / max) * 100);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), delay);
    return () => clearTimeout(t);
  }, [pct, delay]);

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold" style={{ color: "var(--ink)" }}>{label}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{score}/{max}</span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 8, background: "var(--line)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${width}%`, background: color, transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      </div>
    </div>
  );
}

function CountUp({ target, duration = 800 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setVal(Math.round(prog * target));
      if (prog < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return <>{val}</>;
}

export default function ScoreReveal({ breakdown, theme, roundNumber, totalRounds, onNext, isLastRound }: ScoreRevealProps) {
  const [visible, setVisible] = useState(false);
  const pct = breakdown.total / MAX_SCORE_PER_ROUND;
  const grade = pct >= 0.85 ? { label: "Iconic!", emoji: "🌟", color: "#f59e0b" }
    : pct >= 0.65 ? { label: "Chic!", emoji: "✨", color: "#8b5cf6" }
    : pct >= 0.45 ? { label: "Not Bad", emoji: "👍", color: "#3b82f6" }
    : { label: "Try Again!", emoji: "😬", color: "#ef4444" };

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="flex flex-col gap-4 w-full max-w-md mx-auto transition-all"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transitionDuration: "400ms" }}
    >
      {/* Theme header */}
      <div className="flex items-center gap-3 rounded-2xl p-3" style={{ background: "var(--panel)", border: "1.5px solid var(--line)" }}>
        <span className="text-3xl">{theme.emoji}</span>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Round {roundNumber}/{totalRounds}</div>
          <div className="font-bold text-base" style={{ fontFamily: "Fraunces, serif", color: "var(--ink)" }}>{theme.prompt}</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-2xl font-black tabular-nums" style={{ color: grade.color, fontFamily: "Fraunces, serif" }}>
            <CountUp target={breakdown.total} duration={900} />
          </div>
          <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>/ {MAX_SCORE_PER_ROUND}</div>
        </div>
      </div>

      {/* Grade badge */}
      <div className="flex items-center justify-center gap-2 py-2 rounded-2xl font-black text-lg" style={{ background: `${grade.color}18`, color: grade.color, fontFamily: "Fraunces, serif" }}>
        {grade.emoji} {grade.label}
      </div>

      {/* Breakdown */}
      <div className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: "var(--panel)", border: "1.5px solid var(--line)" }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--muted)" }}>Score Breakdown</div>

        <ScoreBar score={breakdown.topScore} max={25} color="#ec4899" label={breakdown.topLabel} delay={200} />
        <ScoreBar score={breakdown.bottomScore} max={25} color="#8b5cf6" label={breakdown.bottomLabel} delay={350} />
        <ScoreBar score={breakdown.shoesScore} max={25} color="#3b82f6" label={breakdown.shoesLabel} delay={500} />
        <ScoreBar score={breakdown.accessoryScore} max={25} color="#f59e0b" label={breakdown.accessoryLabel} delay={650} />

        <div className="border-t my-1" style={{ borderColor: "var(--line)" }} />

        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold" style={{ color: "var(--ink)" }}>{breakdown.colorLabel}</span>
          <span className="text-xs font-bold" style={{ color: "#10b981" }}>+{breakdown.colorBonus}</span>
        </div>
        {breakdown.completenessBonus > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold" style={{ color: "var(--ink)" }}>Full outfit bonus 🎉</span>
            <span className="text-xs font-bold" style={{ color: "#10b981" }}>+{breakdown.completenessBonus}</span>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-95"
        style={{ background: grade.color, color: "#fff", fontSize: 16, minHeight: 56 }}
      >
        {isLastRound ? "See Final Results →" : "Next Round →"}
      </button>
    </div>
  );
}
