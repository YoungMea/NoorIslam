import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  LANGUAGE: '@noor_islam_language',
  THEME: '@noor_islam_theme',
  BOOKMARKS: '@noor_islam_bookmarks',
  FAVORITE_DUAS: '@noor_islam_favorite_duas',
  FAVORITE_SURAHS: '@noor_islam_favorite_surahs',
  TASBIH_COUNT: '@noor_islam_tasbih_count',
  READING_PROGRESS: '@noor_islam_reading_progress',
  RECENTLY_PLAYED: '@noor_islam_recently_played',
};

export const storage = {
  async getString(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },

  async setString(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // silently fail
    }
  },

  async getObject<T>(key: string): Promise<T | null> {
    try {
      const json = await AsyncStorage.getItem(key);
      return json ? JSON.parse(json) : null;
    } catch {
      return null;
    }
  },

  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // silently fail
    }
  },

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // silently fail
    }
  },

  // Language
  async getLanguage(): Promise<string | null> {
    return storage.getString(KEYS.LANGUAGE);
  },
  async setLanguage(lang: string): Promise<void> {
    return storage.setString(KEYS.LANGUAGE, lang);
  },

  // Theme
  async getTheme(): Promise<string | null> {
    return storage.getString(KEYS.THEME);
  },
  async setTheme(theme: string): Promise<void> {
    return storage.setString(KEYS.THEME, theme);
  },

  // Bookmarks
  async getBookmarks(): Promise<{ surahId: number; verseNumber: number; surahName: string }[]> {
    return (await storage.getObject<{ surahId: number; verseNumber: number; surahName: string }[]>(KEYS.BOOKMARKS)) || [];
  },
  async addBookmark(bookmark: { surahId: number; verseNumber: number; surahName: string }): Promise<void> {
    const bookmarks = await storage.getBookmarks();
    if (!bookmarks.find(b => b.surahId === bookmark.surahId && b.verseNumber === bookmark.verseNumber)) {
      bookmarks.push(bookmark);
      await storage.setObject(KEYS.BOOKMARKS, bookmarks);
    }
  },
  async removeBookmark(surahId: number, verseNumber: number): Promise<void> {
    const bookmarks = await storage.getBookmarks();
    const filtered = bookmarks.filter(b => !(b.surahId === surahId && b.verseNumber === verseNumber));
    await storage.setObject(KEYS.BOOKMARKS, filtered);
  },
  async isBookmarked(surahId: number, verseNumber: number): Promise<boolean> {
    const bookmarks = await storage.getBookmarks();
    return bookmarks.some(b => b.surahId === surahId && b.verseNumber === verseNumber);
  },

  // Favorite Duas
  async getFavoriteDuas(): Promise<string[]> {
    return (await storage.getObject<string[]>(KEYS.FAVORITE_DUAS)) || [];
  },
  async toggleFavoriteDua(duaId: string): Promise<boolean> {
    const favorites = await storage.getFavoriteDuas();
    const index = favorites.indexOf(duaId);
    if (index >= 0) {
      favorites.splice(index, 1);
      await storage.setObject(KEYS.FAVORITE_DUAS, favorites);
      return false;
    } else {
      favorites.push(duaId);
      await storage.setObject(KEYS.FAVORITE_DUAS, favorites);
      return true;
    }
  },
  async isFavoriteDua(duaId: string): Promise<boolean> {
    const favorites = await storage.getFavoriteDuas();
    return favorites.includes(duaId);
  },

  // Tasbih
  async getTasbihCounts(): Promise<Record<string, number>> {
    return (await storage.getObject<Record<string, number>>(KEYS.TASBIH_COUNT)) || {};
  },
  async saveTasbihCounts(counts: Record<string, number>): Promise<void> {
    await storage.setObject(KEYS.TASBIH_COUNT, counts);
  },

  // Reading Progress
  async getReadingProgress(): Promise<{ surahId: number; verseNumber: number } | null> {
    return storage.getObject(KEYS.READING_PROGRESS);
  },
  async saveReadingProgress(progress: { surahId: number; verseNumber: number }): Promise<void> {
    await storage.setObject(KEYS.READING_PROGRESS, progress);
  },

  // Recently Played
  async getRecentlyPlayed(): Promise<string[]> {
    return (await storage.getObject<string[]>(KEYS.RECENTLY_PLAYED)) || [];
  },
  async addRecentlyPlayed(lectureId: string): Promise<void> {
    const recent = await storage.getRecentlyPlayed();
    const filtered = recent.filter(id => id !== lectureId);
    filtered.unshift(lectureId);
    await storage.setObject(KEYS.RECENTLY_PLAYED, filtered.slice(0, 20));
  },
};

export { KEYS };
