// Medical terminology matching game data.
// Each term is paired with an emoji "image" to keep the bundle light and
// universally legible. Easy to swap for generated images later.

export type GameItem = {
  term: string;
  emoji: string;
  hint: string;
};

export const GAME_ITEMS: GameItem[] = [
  { term: "Stethoscope", emoji: "🩺", hint: "Listens to heart & lungs" },
  { term: "Syringe", emoji: "💉", hint: "Delivers injection" },
  { term: "Heart", emoji: "❤️", hint: "Pumps blood" },
  { term: "Brain", emoji: "🧠", hint: "Central nervous system" },
  { term: "Lungs", emoji: "🫁", hint: "Gas exchange" },
  { term: "Bone", emoji: "🦴", hint: "Skeletal structure" },
  { term: "Tooth", emoji: "🦷", hint: "Mastication" },
  { term: "Eye", emoji: "👁️", hint: "Vision organ" },
  { term: "Microbe", emoji: "🦠", hint: "Pathogen" },
  { term: "Pill", emoji: "💊", hint: "Oral medication" },
  { term: "Bandage", emoji: "🩹", hint: "Wound dressing" },
  { term: "Test tube", emoji: "🧪", hint: "Lab specimen" },
  { term: "DNA", emoji: "🧬", hint: "Genetic code" },
  { term: "Thermometer", emoji: "🌡️", hint: "Measures temperature" },
  { term: "Hospital", emoji: "🏥", hint: "Care facility" },
  { term: "Ambulance", emoji: "🚑", hint: "Emergency transport" },
];

export function pickRound(count = 4): { items: GameItem[]; answer: GameItem } {
  const shuffled = [...GAME_ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
  const answer = shuffled[Math.floor(Math.random() * shuffled.length)];
  return { items: shuffled, answer };
}
