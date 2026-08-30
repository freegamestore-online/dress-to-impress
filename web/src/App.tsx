import { useState, useCallback, useEffect } from "react";
import { GameShell, GameTopbar, GameAuth } from "@freegamestore/games";
import {
  TOPS, BOTTOMS, SHOES, ACCESSORIES, PALETTES,
  OutfitSelection, scoreOutfit, pickThemes, TOTAL_ROUNDS,
  Theme, ColorPalette,
} from "./lib/gameData";
import { useHighScore } from "./hooks/useHighScore";
import { RoundResult } from "./types";
import Mannequin from "./components/Mannequin";
import WardrobeSlot from "./components/WardrobeSlot";
import PalettePicker from "./components/PalettePicker";
import ScoreReveal from "./components/ScoreReveal";
import Summary from "./components/Summary";

type GamePhase = "intro" | "dressing" | "scoring" | "summary";

const EMPTY_SELECTION: OutfitSelection = { top: null, bottom: null, shoes: null, accessory: null, palette: null };

// ─── Slot tabs for mobile navigation ─────────────────────────────────────────
const SLOT_TABS = [
  { key: "top" as const, label: "Top", emoji: "👕" },
  { key: "bottom" as const, label: "Bottom", emoji: "👖" },
  { key: "shoes" as const, label: "Shoes", emoji: "👟" },
  { key: "accessory" as const, label: "Accessory", emoji: "💎" },
  { key: "palette" as const, label: "Palette", emoji: "🎨" },
];

type SlotTab = "top" | "bottom" | "shoes" | "accessory" | "palette";

// ─── Intro Screen ─────────────────────────────────────────────────────────────
function IntroScreen({ onStart, highScore }: { onStart: () => void; highScore: number }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
      <div className="text-6xl">👗</div>
      <div>
        <h1 className="text-3xl font-black mb-2" style={{ fontFamily: "Fraunces, serif", color: "var(--ink)" }}>
          Dress to Impress
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", maxWidth: 320 }}>
          Style 5 outfits across different theme prompts. Mix and match tops, bottoms, shoes, and accessories — then score points for how well your look fits the vibe!
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs">
        <div className="flex justify-between text-sm rounded-xl px-4 py-2" style={{ background: "var(--panel)", border: "1.5px solid var(--line)" }}>
          <span style={{ color: "var(--muted)" }}>Best Score</span>
          <span className="font-black" style={{ color: "var(--accent)" }}>{highScore} pts</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: "var(--muted)" }}>
          {[
            { emoji: "🎬", label: "Red Carpet" },
            { emoji: "🌧️", label: "Rainy Day" },
            { emoji: "💃", label: "80s Prom" },
            { emoji: "💼", label: "Job Interview" },
            { emoji: "🏖️", label: "Beach Party" },
          ].map(t => (
            <div key={t.label} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ background: "var(--panel)", border: "1px solid var(--line)" }}>
              <span>{t.emoji}</span><span>{t.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ background: "var(--panel)", border: "1px solid var(--line)" }}>
            <span>🎲</span><span>+ more…</span>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-10 py-4 rounded-2xl font-black text-white text-lg transition-all active:scale-95"
        style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)", minHeight: 56, minWidth: 200 }}
      >
        Start Styling! ✨
      </button>

      <GameAuth />
    </div>
  );
}

// ─── Dressing Screen ──────────────────────────────────────────────────────────
interface DressingProps {
  theme: Theme;
  roundNumber: number;
  selection: OutfitSelection;
  onSelect: (slot: keyof OutfitSelection, id: string) => void;
  onSubmit: () => void;
}

function DressingScreen({ theme, roundNumber, selection, onSelect, onSubmit }: DressingProps) {
  const [activeTab, setActiveTab] = useState<SlotTab>("top");
  const palette = PALETTES.find(p => p.id === selection.palette) ?? null;

  const filledCount = [selection.top, selection.bottom, selection.shoes, selection.accessory, selection.palette].filter(Boolean).length;

  const tabItems: Record<SlotTab, React.ReactNode> = {
    top: (
      <WardrobeSlot
        label="Tops"
        items={TOPS}
        selectedId={selection.top}
        onSelect={id => onSelect("top", id)}
        accentColor="#ec4899"
      />
    ),
    bottom: (
      <WardrobeSlot
        label="Bottoms"
        items={BOTTOMS}
        selectedId={selection.bottom}
        onSelect={id => onSelect("bottom", id)}
        accentColor="#8b5cf6"
      />
    ),
    shoes: (
      <WardrobeSlot
        label="Shoes"
        items={SHOES}
        selectedId={selection.shoes}
        onSelect={id => onSelect("shoes", id)}
        accentColor="#3b82f6"
      />
    ),
    accessory: (
      <WardrobeSlot
        label="Accessories"
        items={ACCESSORIES}
        selectedId={selection.accessory}
        onSelect={id => onSelect("accessory", id)}
        accentColor="#f59e0b"
      />
    ),
    palette: (
      <PalettePicker
        palettes={PALETTES}
        selectedId={selection.palette}
        onSelect={id => onSelect("palette", id)}
      />
    ),
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Theme banner */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)", color: "#fff" }}
      >
        <span className="text-2xl">{theme.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold opacity-80 uppercase tracking-widest">Round {roundNumber}/{TOTAL_ROUNDS} — Theme</div>
          <div className="font-black text-lg leading-tight truncate" style={{ fontFamily: "Fraunces, serif" }}>
            {theme.prompt}
          </div>
          <div className="text-xs opacity-75 truncate">{theme.description}</div>
        </div>
        {/* Mini mannequin preview */}
        <div className="flex-shrink-0 scale-75 origin-right">
          <Mannequin
            topId={selection.top}
            bottomId={selection.bottom}
            shoesId={selection.shoes}
            accessoryId={selection.accessory}
            palette={palette}
          />
        </div>
      </div>

      {/* Slot tabs */}
      <div className="flex flex-shrink-0 border-b" style={{ borderColor: "var(--line)" }}>
        {SLOT_TABS.map(tab => {
          const isActive = activeTab === tab.key;
          const isFilled = tab.key === "palette"
            ? !!selection.palette
            : !!selection[tab.key as keyof OutfitSelection];
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-all relative"
              style={{
                color: isActive ? "var(--accent)" : "var(--muted)",
                borderBottom: isActive ? "2.5px solid var(--accent)" : "2.5px solid transparent",
                background: "none",
                minHeight: 44,
              }}
            >
              <span className="text-base leading-none">{tab.emoji}</span>
              <span className="font-bold" style={{ fontSize: 9 }}>{tab.label}</span>
              {isFilled && (
                <span
                  className="absolute top-1 right-1/4 w-2 h-2 rounded-full"
                  style={{ background: "#10b981" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Item grid — scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ WebkitOverflowScrolling: "touch" }}>
        {tabItems[activeTab]}
      </div>

      {/* Submit bar */}
      <div className="flex-shrink-0 px-4 py-3 border-t" style={{ borderColor: "var(--line)", background: "var(--dock)" }}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
              {filledCount}/5 slots filled
              {filledCount === 5 && <span className="ml-1 text-green-500">✓</span>}
            </div>
            <div className="flex gap-1 mt-1">
              {SLOT_TABS.map(tab => {
                const filled = tab.key === "palette"
                  ? !!selection.palette
                  : !!selection[tab.key as keyof OutfitSelection];
                return (
                  <div
                    key={tab.key}
                    className="rounded-full transition-all"
                    style={{ width: 8, height: 8, background: filled ? "#10b981" : "var(--line)" }}
                  />
                );
              })}
            </div>
          </div>
          <button
            onClick={onSubmit}
            disabled={filledCount < 4}
            className="px-6 py-3 rounded-xl font-black text-white transition-all active:scale-95 disabled:opacity-40"
            style={{
              background: filledCount >= 4 ? "linear-gradient(135deg, #ec4899, #8b5cf6)" : "var(--muted)",
              minHeight: 48,
              fontSize: 14,
            }}
          >
            Submit Look ✨
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [themes, setThemes] = useState<Theme[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [selection, setSelection] = useState<OutfitSelection>(EMPTY_SELECTION);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [highScore, updateHighScore] = useHighScore("dress_to_impress_highscore");

  const currentTheme = themes[roundIndex] ?? null;

  const handleStart = useCallback(() => {
    const picked = pickThemes();
    setThemes(picked);
    setRoundIndex(0);
    setSelection(EMPTY_SELECTION);
    setResults([]);
    setTotalScore(0);
    setPhase("dressing");
  }, []);

  const handleSelect = useCallback((slot: keyof OutfitSelection, id: string) => {
    setSelection(prev => ({ ...prev, [slot]: id }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!currentTheme) return;
    const breakdown = scoreOutfit(selection, currentTheme);
    const result: RoundResult = { theme: currentTheme, selection, breakdown };
    setResults(prev => [...prev, result]);
    setTotalScore(prev => prev + breakdown.total);
    setPhase("scoring");
  }, [currentTheme, selection]);

  const handleNext = useCallback(() => {
    const nextIndex = roundIndex + 1;
    if (nextIndex >= TOTAL_ROUNDS) {
      setPhase("summary");
    } else {
      setRoundIndex(nextIndex);
      setSelection(EMPTY_SELECTION);
      setPhase("dressing");
    }
  }, [roundIndex]);

  const handlePlayAgain = useCallback(() => {
    setPhase("intro");
  }, []);

  // Update high score when game ends
  useEffect(() => {
    if (phase === "summary" && totalScore > 0) {
      updateHighScore(totalScore);
    }
  }, [phase, totalScore, updateHighScore]);

  const lastResult = results[results.length - 1] ?? null;

  return (
    <GameShell topbar={<GameTopbar title="Dress to Impress" score={totalScore} />}>
      <div className="h-full overflow-hidden" style={{ background: "var(--paper)" }}>
        {phase === "intro" && (
          <IntroScreen onStart={handleStart} highScore={highScore} />
        )}

        {phase === "dressing" && currentTheme && (
          <DressingScreen
            theme={currentTheme}
            roundNumber={roundIndex + 1}
            selection={selection}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
          />
        )}

        {phase === "scoring" && lastResult && currentTheme && (
          <div className="h-full overflow-y-auto px-4 py-4">
            <ScoreReveal
              breakdown={lastResult.breakdown}
              theme={lastResult.theme}
              roundNumber={roundIndex + 1}
              totalRounds={TOTAL_ROUNDS}
              onNext={handleNext}
              isLastRound={roundIndex + 1 >= TOTAL_ROUNDS}
            />
          </div>
        )}

        {phase === "summary" && (
          <div className="h-full overflow-y-auto px-4 py-4">
            <Summary results={results} onPlayAgain={handlePlayAgain} />
          </div>
        )}
      </div>
    </GameShell>
  );
}
