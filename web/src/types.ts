export type SlotKey = "top" | "bottom" | "shoes" | "accessory";

export type GamePhase = "intro" | "dressing" | "scoring" | "summary";

export interface RoundResult {
  theme: import("./lib/gameData").Theme;
  selection: import("./lib/gameData").OutfitSelection;
  breakdown: import("./lib/gameData").ScoreBreakdown;
}
