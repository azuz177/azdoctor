export type GameItem = {
  term: string;
  emoji: string;
  hint: string;
  wordOptions: string[];
};

export const GAME_ITEMS: GameItem[] = [
  {
    term: "Heart Attack",
    emoji: "❤️",
    hint: "When blood can't reach the heart muscle",
    wordOptions: ["Chest Pain", "Heart Attack", "Headache", "Stomach Ache"],
  },
  {
    term: "Flu",
    emoji: "🤧",
    hint: "Common viral illness with fever and cough",
    wordOptions: ["Cold", "Flu", "Allergies", "Asthma"],
  },
  {
    term: "Diabetes",
    emoji: "🩸",
    hint: "High blood sugar levels",
    wordOptions: ["Diabetes", "Blood Pressure", "Anemia", "Thyroid"],
  },
  {
    term: "Headache",
    emoji: "🤕",
    hint: "Pain in your head",
    wordOptions: ["Migraine", "Headache", "Dizziness", "Nausea"],
  },
  {
    term: "Fever",
    emoji: "🌡️",
    hint: "High body temperature",
    wordOptions: ["Cold", "Fever", "Heat Stroke", "Chills"],
  },
  {
    term: "Stomach Ache",
    emoji: "🤢",
    hint: "Pain in your belly",
    wordOptions: ["Heartburn", "Stomach Ache", "Back Pain", "Cramps"],
  },
];

export function pickRound(count = 4): { items: GameItem[]; answer: GameItem } {
  const shuffled = [...GAME_ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
  const answer = shuffled[Math.floor(Math.random() * shuffled.length)];
  return { items: shuffled, answer };
}
