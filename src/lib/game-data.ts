// Easier medical terminology matching game data with common terms and emojis.

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
    wordOptions: ["Chest Pain", "Heart Attack", "Headache", "Stomach Ache"]
  },
  {
    term: "Flu",
    emoji: "🤧",
    hint: "Common viral illness with fever and cough",
    wordOptions: ["Cold", "Flu", "Allergies", "Asthma"]
  },
  {
    term: "Diabetes",
    emoji: "🩸",
    hint: "High blood sugar levels",
    wordOptions: ["Diabetes", "Blood Pressure", "Anemia", "Thyroid"]
  },
  {
    term: "Headache",
    emoji: "🤕",
    hint: "Pain in your head",
    wordOptions: ["Migraine", "Headache", "Dizziness", "Nausea"]
  },
  {
    term: "Fever",
    emoji: "🌡️",
    hint: "High body temperature",
    wordOptions: ["Cold", "Fever", "Heat Stroke", "Chills"]
  },
  {
    term: "Stomach Ache",
    emoji: "🤢",
    hint: "Pain in your belly",
    wordOptions: ["Heartburn", "Stomach Ache", "Back Pain", "Cramps"]
  },
  {
    term: "Allergy",
    emoji: "🤧",
    hint: "Body reaction to pollen, food, or animals",
    wordOptions: ["Cold", "Flu", "Allergy", "Infection"]
  },
  {
    term: "Fracture",
    emoji: "🦴",
    hint: "Broken bone",
    wordOptions: ["Sprain", "Fracture", "Bruise", "Cut"]
  },
  {
    term: "Sunburn",
    emoji: "☀️",
    hint: "Skin damage from too much sun",
    wordOptions: ["Rash", "Sunburn", "Heat Rash", "Allergy"]
  },
  {
    term: "Cough",
    emoji: "🫁",
    hint: "Expelling air from lungs suddenly",
    wordOptions: ["Sneeze", "Cough", "Wheeze", "Hiccup"]
  },
  {
    term: "Rash",
    emoji: "🔴",
    hint: "Red irritated skin",
    wordOptions: ["Bruise", "Rash", "Burn", "Cut"]
  },
  {
    term: "Nausea",
    emoji: "🤢",
    hint: "Feeling like you might vomit",
    wordOptions: ["Hunger", "Nausea", "Heartburn", "Thirst"]
  },
  {
    term: "Back Pain",
    emoji: "🦴",
    hint: "Discomfort in your spine area",
    wordOptions: ["Neck Pain", "Back Pain", "Leg Pain", "Arm Pain"]
  },
  {
    term: "Ear Infection",
    emoji: "👂",
    hint: "Painful condition inside your ear",
    wordOptions: ["Hearing Loss", "Ear Infection", "Ringing", "Dizziness"]
  },
  {
    term: "Blood Pressure",
    emoji: "🩺",
    hint: "Force of blood against artery walls",
    wordOptions: ["Heart Rate", "Blood Pressure", "Oxygen", "Pulse"]
  },
];

export function pickRound(count = 4): { items: GameItem[]; answer: GameItem } {
  const shuffled = [...GAME_ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
  const answer = shuffled[Math.floor(Math.random() * shuffled.length)];
  return { items: shuffled, answer };
}
