import { WardrobeItem, TOPS, BOTTOMS, SHOES, ACCESSORIES, ColorPalette } from "../lib/gameData";

interface MannequinProps {
  topId: string | null;
  bottomId: string | null;
  shoesId: string | null;
  accessoryId: string | null;
  palette: ColorPalette | null;
}

function getItem(list: WardrobeItem[], id: string | null): WardrobeItem | null {
  if (!id) return null;
  return list.find(i => i.id === id) ?? null;
}

export default function Mannequin({ topId, bottomId, shoesId, accessoryId, palette }: MannequinProps) {
  const top = getItem(TOPS, topId);
  const bottom = getItem(BOTTOMS, bottomId);
  const shoes = getItem(SHOES, shoesId);
  const accessory = getItem(ACCESSORIES, accessoryId);

  const accentColor = palette ? palette.colors[0] : "#c8a4d4";
  const accentSoft = palette ? palette.colors[1] : "#e8d5f0";

  return (
    <div className="relative flex flex-col items-center select-none" style={{ width: 120, height: 240 }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-2xl"
        style={{ background: accentColor, transform: "scale(0.8) translateY(10%)" }}
      />

      {/* Head */}
      <div
        className="relative z-10 rounded-full border-2"
        style={{
          width: 36,
          height: 36,
          background: "#FDDBB4",
          borderColor: "#d4956a",
          marginTop: 0,
          flexShrink: 0,
        }}
      >
        {/* Face */}
        <div className="absolute" style={{ top: 10, left: 7, width: 6, height: 6, borderRadius: "50%", background: "#6b4226" }} />
        <div className="absolute" style={{ top: 10, right: 7, width: 6, height: 6, borderRadius: "50%", background: "#6b4226" }} />
        <div className="absolute" style={{ bottom: 8, left: "50%", transform: "translateX(-50%)", width: 12, height: 4, borderRadius: "0 0 6px 6px", background: "#d4956a" }} />
        {/* Accessory on head */}
        {accessory && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base leading-none">
            {["tiara", "bucket_hat", "scrunchie"].includes(accessory.id) ? accessory.emoji : null}
          </div>
        )}
      </div>

      {/* Neck */}
      <div style={{ width: 10, height: 8, background: "#FDDBB4", flexShrink: 0 }} />

      {/* Torso / Top */}
      <div
        className="relative z-10 rounded-t-lg flex items-center justify-center"
        style={{
          width: 64,
          height: 62,
          background: top ? top.shape.color : accentSoft,
          borderBottom: "2px solid rgba(0,0,0,0.1)",
          flexShrink: 0,
          transition: "background 0.3s",
        }}
      >
        {/* Arms */}
        <div className="absolute" style={{ left: -18, top: 4, width: 18, height: 12, borderRadius: "6px 0 0 6px", background: top ? top.shape.color : accentSoft, transition: "background 0.3s" }} />
        <div className="absolute" style={{ right: -18, top: 4, width: 18, height: 12, borderRadius: "0 6px 6px 0", background: top ? top.shape.color : accentSoft, transition: "background 0.3s" }} />
        {/* Alt color detail */}
        {top?.shape.altColor && (
          <div style={{ width: 28, height: 8, borderRadius: 4, background: top.shape.altColor, opacity: 0.6 }} />
        )}
        {/* Emoji */}
        <span className="absolute bottom-1 right-1 text-xs opacity-70">{top?.emoji}</span>
        {/* Accessory on body */}
        {accessory && ["pearl_necklace", "statement_earrings"].includes(accessory.id) && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 text-xs">{accessory.emoji}</div>
        )}
      </div>

      {/* Bottom */}
      <div
        className="relative z-10 flex items-center justify-center"
        style={{
          width: 68,
          height: 66,
          background: bottom ? bottom.shape.color : accentSoft,
          borderTop: "1px solid rgba(0,0,0,0.08)",
          flexShrink: 0,
          transition: "background 0.3s",
          borderRadius: "0 0 8px 8px",
        }}
      >
        {bottom?.shape.altColor && (
          <div style={{ width: 24, height: 6, borderRadius: 3, background: bottom.shape.altColor, opacity: 0.5 }} />
        )}
        <span className="absolute bottom-1 right-1 text-xs opacity-70">{bottom?.emoji}</span>
      </div>

      {/* Shoes */}
      <div className="relative z-10 flex gap-2 mt-1" style={{ flexShrink: 0 }}>
        <div
          className="rounded"
          style={{
            width: 24,
            height: 14,
            background: shoes ? shoes.shape.color : "#c8c8c8",
            borderRadius: "4px 4px 6px 6px",
            transition: "background 0.3s",
          }}
        />
        <div
          className="rounded"
          style={{
            width: 24,
            height: 14,
            background: shoes ? shoes.shape.color : "#c8c8c8",
            borderRadius: "4px 4px 6px 6px",
            transition: "background 0.3s",
          }}
        />
      </div>

      {/* Hand-held accessory */}
      {accessory && ["briefcase", "tote_bag", "fanny_pack", "umbrella", "sunglasses"].includes(accessory.id) && (
        <div
          className="absolute z-20 text-xl"
          style={{ right: -8, top: "45%", transform: "translateY(-50%)" }}
        >
          {accessory.emoji}
        </div>
      )}

      {/* Palette stripe at bottom */}
      {palette && (
        <div className="flex gap-0.5 mt-1">
          {palette.colors.map((c, i) => (
            <div key={i} style={{ width: 12, height: 6, borderRadius: 3, background: c }} />
          ))}
        </div>
      )}
    </div>
  );
}
