// ─── Types ───────────────────────────────────────────────────────────────────

export type SlotKey = "top" | "bottom" | "shoes" | "accessory";

export interface WardrobeItem {
  id: string;
  name: string;
  slot: SlotKey;
  emoji: string;
  /** tag set used for theme scoring */
  tags: string[];
  /** shape descriptor for mannequin rendering */
  shape: ItemShape;
}

export interface ItemShape {
  color: string;
  altColor?: string;
  /** extra css class hints for the mannequin layer */
  style?: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: [string, string, string];
}

export interface Theme {
  id: string;
  prompt: string;
  description: string;
  emoji: string;
  /** tags that score well for this theme */
  goodTags: string[];
  /** tags that score poorly */
  badTags: string[];
}

export interface OutfitSelection {
  top: string | null;
  bottom: string | null;
  shoes: string | null;
  accessory: string | null;
  palette: string | null;
}

export interface ScoreBreakdown {
  topScore: number;
  bottomScore: number;
  shoesScore: number;
  accessoryScore: number;
  colorBonus: number;
  completenessBonus: number;
  total: number;
  topLabel: string;
  bottomLabel: string;
  shoesLabel: string;
  accessoryLabel: string;
  colorLabel: string;
}

// ─── Wardrobe Items ───────────────────────────────────────────────────────────

export const TOPS: WardrobeItem[] = [
  { id: "blazer", name: "Sharp Blazer", slot: "top", emoji: "🧥", tags: ["formal", "professional", "elegant", "smart"], shape: { color: "#2c3e50", altColor: "#34495e" } },
  { id: "crop_top", name: "Crop Top", slot: "top", emoji: "👕", tags: ["casual", "beach", "party", "trendy", "summer"], shape: { color: "#ff6b9d", altColor: "#ff8fab" } },
  { id: "turtleneck", name: "Turtleneck", slot: "top", emoji: "🧣", tags: ["cozy", "winter", "smart", "retro", "warm"], shape: { color: "#7f8c8d", altColor: "#95a5a6" } },
  { id: "sequin_top", name: "Sequin Top", slot: "top", emoji: "✨", tags: ["glamour", "party", "night", "elegant", "prom", "glam"], shape: { color: "#f39c12", altColor: "#f1c40f" } },
  { id: "flannel", name: "Flannel Shirt", slot: "top", emoji: "🟥", tags: ["casual", "outdoor", "rainy", "cozy", "grunge"], shape: { color: "#c0392b", altColor: "#e74c3c" } },
  { id: "polo", name: "Polo Shirt", slot: "top", emoji: "👔", tags: ["smart", "casual", "sporty", "preppy", "professional"], shape: { color: "#2980b9", altColor: "#3498db" } },
  { id: "band_tee", name: "Band Tee", slot: "top", emoji: "🎸", tags: ["casual", "retro", "80s", "rock", "edgy", "party"], shape: { color: "#1a1a2e", altColor: "#16213e" } },
  { id: "ruffle_blouse", name: "Ruffle Blouse", slot: "top", emoji: "🌸", tags: ["elegant", "romantic", "formal", "feminine", "prom"], shape: { color: "#d7bde2", altColor: "#c39bd3" } },
  { id: "tank_top", name: "Tank Top", slot: "top", emoji: "🌊", tags: ["beach", "summer", "casual", "sporty", "hot"], shape: { color: "#1abc9c", altColor: "#16a085" } },
  { id: "oversized_hoodie", name: "Oversized Hoodie", slot: "top", emoji: "🏠", tags: ["cozy", "casual", "rainy", "warm", "comfort"], shape: { color: "#8e44ad", altColor: "#9b59b6" } },
];

export const BOTTOMS: WardrobeItem[] = [
  { id: "pencil_skirt", name: "Pencil Skirt", slot: "bottom", emoji: "💼", tags: ["professional", "formal", "elegant", "smart"], shape: { color: "#2c3e50", altColor: "#34495e" } },
  { id: "denim_shorts", name: "Denim Shorts", slot: "bottom", emoji: "🩳", tags: ["beach", "casual", "summer", "hot", "party"], shape: { color: "#2980b9", altColor: "#3498db" } },
  { id: "wide_leg_pants", name: "Wide Leg Pants", slot: "bottom", emoji: "👖", tags: ["trendy", "casual", "retro", "80s", "party"], shape: { color: "#8e44ad", altColor: "#9b59b6" } },
  { id: "mini_skirt", name: "Mini Skirt", slot: "bottom", emoji: "🌟", tags: ["party", "night", "trendy", "glam", "prom", "80s"], shape: { color: "#e74c3c", altColor: "#c0392b" } },
  { id: "trousers", name: "Tailored Trousers", slot: "bottom", emoji: "👔", tags: ["professional", "formal", "smart", "elegant"], shape: { color: "#2c3e50", altColor: "#34495e" } },
  { id: "joggers", name: "Joggers", slot: "bottom", emoji: "🏃", tags: ["casual", "sporty", "comfort", "rainy", "cozy"], shape: { color: "#7f8c8d", altColor: "#95a5a6" } },
  { id: "maxi_skirt", name: "Maxi Skirt", slot: "bottom", emoji: "🌺", tags: ["beach", "boho", "summer", "elegant", "romantic"], shape: { color: "#f39c12", altColor: "#f1c40f" } },
  { id: "leather_pants", name: "Leather Pants", slot: "bottom", emoji: "🖤", tags: ["edgy", "night", "rock", "80s", "glam", "prom"], shape: { color: "#1a1a1a", altColor: "#2d2d2d" } },
  { id: "cargo_pants", name: "Cargo Pants", slot: "bottom", emoji: "🎒", tags: ["casual", "outdoor", "rainy", "practical", "rugged"], shape: { color: "#27ae60", altColor: "#2ecc71" } },
  { id: "tutu_skirt", name: "Tutu Skirt", slot: "bottom", emoji: "🩰", tags: ["prom", "party", "glam", "80s", "fun", "formal"], shape: { color: "#ff6b9d", altColor: "#ff8fab" } },
];

export const SHOES: WardrobeItem[] = [
  { id: "stilettos", name: "Stilettos", slot: "shoes", emoji: "👠", tags: ["elegant", "formal", "glamour", "prom", "night", "glam"], shape: { color: "#e74c3c" } },
  { id: "sneakers", name: "Sneakers", slot: "shoes", emoji: "👟", tags: ["casual", "sporty", "comfort", "party", "trendy"], shape: { color: "#ffffff", altColor: "#ecf0f1" } },
  { id: "rain_boots", name: "Rain Boots", slot: "shoes", emoji: "🥾", tags: ["rainy", "outdoor", "practical", "cozy", "warm"], shape: { color: "#27ae60" } },
  { id: "loafers", name: "Loafers", slot: "shoes", emoji: "🥿", tags: ["professional", "smart", "casual", "preppy", "formal"], shape: { color: "#795548" } },
  { id: "platform_boots", name: "Platform Boots", slot: "shoes", emoji: "🥾", tags: ["80s", "rock", "edgy", "retro", "glam", "prom"], shape: { color: "#1a1a1a", altColor: "#8B4513" } },
  { id: "flip_flops", name: "Flip Flops", slot: "shoes", emoji: "🩴", tags: ["beach", "summer", "casual", "hot", "vacation"], shape: { color: "#f39c12" } },
  { id: "oxford_shoes", name: "Oxford Shoes", slot: "shoes", emoji: "👞", tags: ["professional", "formal", "smart", "elegant", "classic"], shape: { color: "#2c3e50" } },
  { id: "chunky_heels", name: "Chunky Heels", slot: "shoes", emoji: "👡", tags: ["party", "trendy", "night", "prom", "glam", "80s"], shape: { color: "#9b59b6" } },
  { id: "ballet_flats", name: "Ballet Flats", slot: "shoes", emoji: "🩰", tags: ["elegant", "casual", "romantic", "feminine", "smart"], shape: { color: "#f1948a" } },
  { id: "hiking_boots", name: "Hiking Boots", slot: "shoes", emoji: "🥾", tags: ["outdoor", "rugged", "casual", "practical", "rainy"], shape: { color: "#795548", altColor: "#5D4037" } },
];

export const ACCESSORIES: WardrobeItem[] = [
  { id: "pearl_necklace", name: "Pearl Necklace", slot: "accessory", emoji: "📿", tags: ["elegant", "formal", "classic", "prom", "glamour"], shape: { color: "#f5f5f5" } },
  { id: "sunglasses", name: "Sunglasses", slot: "accessory", emoji: "🕶️", tags: ["beach", "summer", "cool", "casual", "party"], shape: { color: "#1a1a1a" } },
  { id: "umbrella", name: "Umbrella", slot: "accessory", emoji: "☂️", tags: ["rainy", "practical", "outdoor", "cozy"], shape: { color: "#3498db" } },
  { id: "statement_earrings", name: "Statement Earrings", slot: "accessory", emoji: "💎", tags: ["glam", "prom", "night", "party", "80s", "bold"], shape: { color: "#f39c12" } },
  { id: "briefcase", name: "Briefcase", slot: "accessory", emoji: "💼", tags: ["professional", "formal", "smart", "business"], shape: { color: "#795548" } },
  { id: "bucket_hat", name: "Bucket Hat", slot: "accessory", emoji: "🎩", tags: ["beach", "summer", "casual", "trendy", "hot"], shape: { color: "#f39c12" } },
  { id: "scrunchie", name: "Scrunchie", slot: "accessory", emoji: "🎀", tags: ["80s", "retro", "party", "fun", "casual"], shape: { color: "#e74c3c" } },
  { id: "tote_bag", name: "Canvas Tote", slot: "accessory", emoji: "👜", tags: ["casual", "practical", "beach", "outdoor", "everyday"], shape: { color: "#d4a574" } },
  { id: "fanny_pack", name: "Fanny Pack", slot: "accessory", emoji: "👝", tags: ["80s", "retro", "casual", "fun", "sporty"], shape: { color: "#e74c3c", altColor: "#c0392b" } },
  { id: "tiara", name: "Tiara", slot: "accessory", emoji: "👑", tags: ["prom", "glam", "elegant", "formal", "party", "glamour"], shape: { color: "#f1c40f" } },
];

// ─── Colour Palettes ──────────────────────────────────────────────────────────

export const PALETTES: ColorPalette[] = [
  { id: "monochrome", name: "Monochrome", colors: ["#1a1a1a", "#555555", "#aaaaaa"] },
  { id: "pastels", name: "Pastel Dream", colors: ["#ffb3c6", "#b3d9ff", "#b3ffcc"] },
  { id: "earth", name: "Earth Tones", colors: ["#8B6914", "#A0785A", "#D4B896"] },
  { id: "neon", name: "Neon Brights", colors: ["#ff006e", "#3a86ff", "#8338ec"] },
  { id: "nautical", name: "Nautical", colors: ["#003087", "#ffffff", "#e63946"] },
  { id: "sunset", name: "Sunset", colors: ["#ff6b35", "#f7c59f", "#efefd0"] },
  { id: "forest", name: "Forest", colors: ["#2d6a4f", "#74c69d", "#d8f3dc"] },
  { id: "jewel", name: "Jewel Tones", colors: ["#9b2335", "#1b4d7e", "#1d6b45"] },
];

// ─── Themes ───────────────────────────────────────────────────────────────────

export const THEMES: Theme[] = [
  {
    id: "red_carpet",
    prompt: "Red Carpet",
    description: "You're at a Hollywood premiere. Dazzle the cameras!",
    emoji: "🎬",
    goodTags: ["elegant", "glamour", "formal", "glam", "night", "prom"],
    badTags: ["casual", "outdoor", "sporty", "rainy", "rugged", "cozy"],
  },
  {
    id: "rainy_day",
    prompt: "Rainy Day Errands",
    description: "Puddles everywhere. Stay dry and stylish.",
    emoji: "🌧️",
    goodTags: ["rainy", "practical", "cozy", "warm", "outdoor", "comfort"],
    badTags: ["beach", "summer", "hot", "glamour", "glam", "formal"],
  },
  {
    id: "80s_prom",
    prompt: "80s Prom",
    description: "Big hair, bigger dreams. It's totally radical!",
    emoji: "💃",
    goodTags: ["80s", "retro", "prom", "glam", "party", "bold", "fun"],
    badTags: ["professional", "casual", "outdoor", "practical", "rugged"],
  },
  {
    id: "job_interview",
    prompt: "Job Interview",
    description: "First impressions matter. Dress for the role you want!",
    emoji: "💼",
    goodTags: ["professional", "formal", "smart", "elegant", "classic", "business"],
    badTags: ["casual", "beach", "party", "edgy", "rock", "glam", "80s"],
  },
  {
    id: "beach_party",
    prompt: "Beach Party",
    description: "Sun, sand, and good vibes. Dress for the occasion!",
    emoji: "🏖️",
    goodTags: ["beach", "summer", "casual", "hot", "party", "vacation", "trendy"],
    badTags: ["formal", "professional", "winter", "cozy", "warm", "rainy"],
  },
  {
    id: "night_out",
    prompt: "Night Out",
    description: "The city's alive after dark. Look the part!",
    emoji: "🌃",
    goodTags: ["night", "party", "glam", "trendy", "edgy", "bold"],
    badTags: ["casual", "outdoor", "rainy", "professional", "sporty"],
  },
  {
    id: "music_festival",
    prompt: "Music Festival",
    description: "Three days of music and mud. Be iconic.",
    emoji: "🎵",
    goodTags: ["casual", "retro", "80s", "edgy", "fun", "rock", "trendy", "sporty"],
    badTags: ["formal", "professional", "elegant", "glamour"],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────

function scoreItem(item: WardrobeItem | undefined, theme: Theme): number {
  if (!item) return 0;
  let score = 5; // baseline for wearing something
  for (const tag of item.tags) {
    if (theme.goodTags.includes(tag)) score += 10;
    if (theme.badTags.includes(tag)) score -= 6;
  }
  return Math.max(0, Math.min(25, score));
}

function paletteCoherenceBonus(palette: ColorPalette | undefined, theme: Theme): { bonus: number; label: string } {
  if (!palette) return { bonus: 0, label: "No palette selected" };

  // Map palette id to theme affinity
  const affinities: Record<string, string[]> = {
    monochrome: ["red_carpet", "job_interview", "night_out"],
    pastels: ["80s_prom", "beach_party", "music_festival"],
    earth: ["rainy_day", "music_festival", "job_interview"],
    neon: ["80s_prom", "night_out", "music_festival"],
    nautical: ["beach_party", "rainy_day"],
    sunset: ["beach_party", "music_festival"],
    forest: ["rainy_day", "music_festival"],
    jewel: ["red_carpet", "night_out", "80s_prom"],
  };

  const goodPalettes = affinities[palette.id] ?? [];
  if (goodPalettes.includes(theme.id)) {
    return { bonus: 15, label: `${palette.name} is a perfect match! +15` };
  }
  return { bonus: 5, label: `${palette.name} works here. +5` };
}

export function scoreOutfit(
  selection: OutfitSelection,
  theme: Theme,
): ScoreBreakdown {
  const top = TOPS.find(i => i.id === selection.top);
  const bottom = BOTTOMS.find(i => i.id === selection.bottom);
  const shoes = SHOES.find(i => i.id === selection.shoes);
  const accessory = ACCESSORIES.find(i => i.id === selection.accessory);
  const palette = PALETTES.find(p => p.id === selection.palette);

  const topScore = scoreItem(top, theme);
  const bottomScore = scoreItem(bottom, theme);
  const shoesScore = scoreItem(shoes, theme);
  const accessoryScore = scoreItem(accessory, theme);

  const { bonus: colorBonus, label: colorLabel } = paletteCoherenceBonus(palette, theme);

  const filledSlots = [selection.top, selection.bottom, selection.shoes, selection.accessory, selection.palette]
    .filter(Boolean).length;
  const completenessBonus = filledSlots === 5 ? 10 : filledSlots >= 3 ? 5 : 0;

  const total = topScore + bottomScore + shoesScore + accessoryScore + colorBonus + completenessBonus;

  function itemLabel(score: number, item: WardrobeItem | undefined, slotName: string): string {
    if (!item) return `No ${slotName} selected`;
    if (score >= 20) return `${item.name} — Spot on! ✨`;
    if (score >= 14) return `${item.name} — Works well 👍`;
    if (score >= 8) return `${item.name} — Okay choice 😐`;
    return `${item.name} — Doesn't fit the vibe 😬`;
  }

  return {
    topScore,
    bottomScore,
    shoesScore,
    accessoryScore,
    colorBonus,
    completenessBonus,
    total,
    topLabel: itemLabel(topScore, top, "top"),
    bottomLabel: itemLabel(bottomScore, bottom, "bottom"),
    shoesLabel: itemLabel(shoesScore, shoes, "shoes"),
    accessoryLabel: itemLabel(accessoryScore, accessory, "accessory"),
    colorLabel,
  };
}

// ─── Round helpers ────────────────────────────────────────────────────────────

export const TOTAL_ROUNDS = 5;
export const MAX_SCORE_PER_ROUND = 25 * 4 + 15 + 10; // 125

export function pickThemes(): Theme[] {
  const shuffled = [...THEMES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, TOTAL_ROUNDS);
}
