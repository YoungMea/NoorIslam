import en, { Translations } from './en';
import uz from './uz';
import uzCyrillic from './uz_cyrillic';

export type Language = 'uz' | 'uz_cyrillic' | 'en';

const translations: Record<Language, Translations> = {
  uz,
  uz_cyrillic: uzCyrillic as unknown as Translations,
  en,
};

let currentLanguage: Language = 'uz';

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function t(key: keyof Translations): string {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
}

export function getTranslations(lang: Language): Translations {
  return translations[lang] ?? translations.en;
}

export function getLanguageName(lang: Language): string {
  switch (lang) {
    case 'uz':
      return "O'zbek (Lotin)";
    case 'uz_cyrillic':
      return 'Ўзбек (Кирилл)';
    case 'en':
      return 'English';
  }
}

export { translations };
