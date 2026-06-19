import { Platform } from 'react-native';
import Constants from 'expo-constants';

const BASE_URL = 'https://api.alquran.cloud/v1';

export interface QuranApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

export interface SurahInfo {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface AyahInfo {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

export interface SurahDetail {
  surah: SurahInfo;
  ayahs: AyahInfo[];
  edition?: EditionInfo;
}

export interface EditionInfo {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface AudioInfo {
  audioUrl: string;
  duration?: number;
}

// Default editions
const ARABIC_EDITION = 'quran-uthmani';
const UZBEK_EDITION = 'uzb-muhammadkarim';
const ENGLISH_EDITION = 'en.asad';

export const api = {
  // Get all surahs
  async getAllSurahs(): Promise<SurahInfo[]> {
    try {
      const response = await fetch(`${BASE_URL}/surah`);
      const data: QuranApiResponse<SurahInfo[]> = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch surahs:', error);
      return [];
    }
  },

  // Get surah detail with verses
  async getSurahDetail(surahNumber: number, edition: string = ARABIC_EDITION): Promise<SurahDetail | null> {
    try {
      const response = await fetch(`${BASE_URL}/surah/${surahNumber}/${edition}`);
      const data: QuranApiResponse<SurahDetail> = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch surah ${surahNumber}:`, error);
      return null;
    }
  },

  // Get surah with multiple editions
  async getSurahWithTranslations(surahNumber: number): Promise<{
    arabic: SurahDetail | null;
    uzbek: SurahDetail | null;
    english: SurahDetail | null;
  } | null> {
    try {
      const [arabic, uzbek, english] = await Promise.all([
        api.getSurahDetail(surahNumber, ARABIC_EDITION),
        api.getSurahDetail(surahNumber, UZBEK_EDITION),
        api.getSurahDetail(surahNumber, ENGLISH_EDITION),
      ]);
      return { arabic, uzbek, english };
    } catch (error) {
      console.error(`Failed to fetch translations for surah ${surahNumber}:`, error);
      return null;
    }
  },

  // Get audio URL for a surah
  getSurahAudioUrl(surahNumber: number): string {
    // Using the common audio source - Mishary Rashid Alafasy
    const surahPadded = String(surahNumber).padStart(3, '0');
    return `https://server8.mp3quran.net/afs/${surahPadded}.mp3`;
  },

  // Get verse audio URL
  getVerseAudioUrl(surahNumber: number, verseNumber: number): string {
    return `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`;
  },

  // Search Quran
  async searchQuran(query: string): Promise<any[]> {
    try {
      const response = await fetch(`${BASE_URL}/search/${query}/all/en`);
      const data = await response.json();
      return data.data?.matches || [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  },

  // Get Juz (part) of Quran
  async getJuz(juzNumber: number): Promise<{ surah: SurahInfo; ayahs: AyahInfo[] } | null> {
    try {
      const response = await fetch(`${BASE_URL}/juz/${juzNumber}/${ARABIC_EDITION}`);
      const data: QuranApiResponse<{ surah: SurahInfo; ayahs: AyahInfo[] }> = await response.json();
      return data.data;
    } catch (error) {
      console.error(`Failed to fetch juz ${juzNumber}:`, error);
      return null;
    }
  },
};

// Prayer Times API
const PRAYER_API = 'https://api.aladhan.com/v1';

export const prayerApi = {
  async getPrayerTimes(latitude: number, longitude: number, date?: string): Promise<any> {
    try {
      const today = date || new Date().toISOString().split('T')[0];
      const response = await fetch(
        `${PRAYER_API}/timings/${today}?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
      return null;
    }
  },

  async getHijriDate(date?: string): Promise<any> {
    try {
      const today = date || new Date().toISOString().split('T')[0];
      const response = await fetch(`${PRAYER_API}/gToH/${today}`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch hijri date:', error);
      return null;
    }
  },
};

// Hadith API
export const hadithApi = {
  async getDailyHadith(): Promise<{ text: string; narrator: string; reference: string } | null> {
    try {
      const response = await fetch('https://api.hadith.sutanlab.id/books/bukhari/random');
      const data = await response.json();
      if (data.data) {
        return {
          text: data.data.contents?.arab || data.data.contents?.id || '',
          narrator: data.data.contents?.narrator || '',
          reference: `Hadith ${data.data.number}`,
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch hadith:', error);
      return null;
    }
  },

  // Fallback hadith when offline
  getFallbackHadith(): { text: string; narrator: string; reference: string } {
    return {
      text: "The best of you are those who are best to their families.",
      narrator: 'Tirmidhi',
      reference: 'Tirmidhi, Hadith 3895',
    };
  },
};
