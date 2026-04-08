import { DNABaseType } from './types';

export const STANDARD_PAIRS: Record<string, string> = {
  'A': 'T',
  'T': 'A',
  'G': 'C',
  'C': 'G',
};

export const MUTATED_PAIRS: Record<string, string> = {
  'N': 'B',
  'İ': 'E',
  'D': 'H',
  'A': 'L',
};

export const STORY_TEXTS = {
  welcome: "Hoş geldin. Bir moleküler biyoloji deneyine başlamak üzeresin. Lütfen laboratuvar kurallarına uy.",
  tutorialComplete: "Standart DNA eşleşmesi başarılı. Ancak sistemde bir anormallik tespit edildi...",
  mutationDate: "Tarih: 28 Mart 2026. Biyoloji kuralları yeniden yazılıyor.",
  finale: "Bazı bağlar bilimle açıklanamaz, sadece hissedilir. N ve B birbirine her zaman kovalent bağlardan daha güçlü bağlı kalacak. Seni seviyorum Nida'm."
};

export const HEIAN_TEXTS =[
  "Biyoloji kuralları silindi...",
  "Tıpkı Heian dönemi Japonya'sında,",
  "Göl kenarında yansımamıza bakarken olduğu gibi.",
  "Je t'aime...",
  "Ti amo, amore mio.",
  "All roads lead to us."
];