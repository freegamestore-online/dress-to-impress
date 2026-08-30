import { WardrobeItem } from "../lib/gameData";

interface WardrobeSlotProps {
  label: string;
  items: WardrobeItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  accentColor?: string;
}

export default function WardrobeSlot({ label, items, selectedId, onSelect, accentColor = "var(--accent)" }: WardrobeSlotProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className="flex flex-col items-center gap-0.5 rounded-xl border-2 px-2 py-1.5 transition-all active:scale-95"
              style={{
                minWidth: 56,
                minHeight: 56,
                borderColor: selected ? accentColor : "var(--line)",
                background: selected ? `${accentColor}18` : "var(--panel)",
                boxShadow: selected ? `0 0 0 2px ${accentColor}44` : "none",
                cursor: "pointer",
              }}
              aria-label={item.name}
              aria-pressed={selected}
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              <span
                className="text-center font-semibold leading-tight"
                style={{ fontSize: 9, color: selected ? accentColor : "var(--muted)", maxWidth: 52 }}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
