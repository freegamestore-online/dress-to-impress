import { ColorPalette } from "../lib/gameData";

interface PalettePickerProps {
  palettes: ColorPalette[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function PalettePicker({ palettes, selectedId, onSelect }: PalettePickerProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        Colour Palette
      </div>
      <div className="flex flex-wrap gap-2">
        {palettes.map(palette => {
          const selected = palette.id === selectedId;
          return (
            <button
              key={palette.id}
              onClick={() => onSelect(palette.id)}
              className="flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-1.5 transition-all active:scale-95"
              style={{
                minWidth: 64,
                borderColor: selected ? "var(--accent)" : "var(--line)",
                background: selected ? "var(--accent-soft)" : "var(--panel)",
                boxShadow: selected ? "0 0 0 2px var(--accent)" : "none",
                cursor: "pointer",
              }}
              aria-label={palette.name}
              aria-pressed={selected}
            >
              <div className="flex gap-0.5">
                {palette.colors.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: c,
                      border: "1px solid rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>
              <span
                className="font-semibold text-center leading-tight"
                style={{ fontSize: 9, color: selected ? "var(--accent)" : "var(--muted)", maxWidth: 60 }}
              >
                {palette.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
