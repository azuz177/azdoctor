// Advanced medical terminology matching game data.
// Specialized clinical terms, syndromes, rare conditions, and pharmacology.

export type GameItem = {
  term: string;
  emoji: string;
  hint: string;
};

export const GAME_ITEMS: GameItem[] = [
  { term: "Pheochromocytoma", emoji: "🧬", hint: "Catecholamine-secreting adrenal tumor" },
  { term: "Tetralogy of Fallot", emoji: "❤️", hint: "VSD, overriding aorta, RVH, pulmonary stenosis" },
  { term: "Wegener's Granulomatosis", emoji: "🫁", hint: "c-ANCA positive vasculitis" },
  { term: "Guillain-Barré", emoji: "🧠", hint: "Ascending demyelinating polyneuropathy" },
  { term: "Charcot-Marie-Tooth", emoji: "🦴", hint: "Hereditary peripheral neuropathy" },
  { term: "Zollinger-Ellison", emoji: "💊", hint: "Gastrin-secreting tumor, refractory ulcers" },
  { term: "Sjögren's Syndrome", emoji: "👁️", hint: "Anti-Ro/La, sicca complex" },
  { term: "Cushing's Triad", emoji: "🩺", hint: "Bradycardia, hypertension, irregular respirations" },
  { term: "Glioblastoma Multiforme", emoji: "🧠", hint: "WHO grade IV astrocytoma" },
  { term: "Pemphigus Vulgaris", emoji: "🩹", hint: "Anti-desmoglein, positive Nikolsky sign" },
  { term: "Achalasia", emoji: "🫁", hint: "Failure of LES relaxation, bird-beak esophagus" },
  { term: "Myasthenia Gravis", emoji: "💪", hint: "Anti-AChR antibodies, ptosis worsens with use" },
  { term: "Pancoast Tumor", emoji: "🫁", hint: "Apical lung mass causing Horner's syndrome" },
  { term: "Kawasaki Disease", emoji: "❤️", hint: "Pediatric vasculitis, coronary aneurysms" },
  { term: "Felty's Syndrome", emoji: "🦴", hint: "RA + splenomegaly + neutropenia" },
  { term: "Prinzmetal Angina", emoji: "❤️", hint: "Coronary vasospasm, ST elevation at rest" },
  { term: "Boerhaave Syndrome", emoji: "🫁", hint: "Spontaneous esophageal rupture" },
  { term: "Sarcoidosis", emoji: "🫁", hint: "Non-caseating granulomas, bilateral hilar adenopathy" },
  { term: "Reye's Syndrome", emoji: "🧠", hint: "Aspirin + viral illness in children → hepatic encephalopathy" },
  { term: "Hashimoto's Thyroiditis", emoji: "🦋", hint: "Anti-TPO antibodies, hypothyroidism" },
  { term: "Takayasu Arteritis", emoji: "🩸", hint: "Pulseless disease, large vessel vasculitis" },
  { term: "Mallory-Weiss Tear", emoji: "🩸", hint: "GE junction tear from retching" },
];

export function pickRound(count = 6): { items: GameItem[]; answer: GameItem } {
  const shuffled = [...GAME_ITEMS].sort(() => Math.random() - 0.5).slice(0, count);
  const answer = shuffled[Math.floor(Math.random() * shuffled.length)];
  return { items: shuffled, answer };
}
