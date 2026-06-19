import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationContent {
  title: string;
  body: string;
  data?: Record<string, any>;
}

const motivationalMessages: NotificationContent[] = [
  {
    title: '🌅 Assalamu Alaikum!',
    body: 'How is your day going today? Remember to start it with Bismillah!',
    data: { type: 'motivation', mood: 'morning' },
  },
  {
    title: '🌤️ Good Afternoon!',
    body: 'Have you remembered Allah today? Take a moment for dhikr.',
    data: { type: 'motivation', mood: 'afternoon' },
  },
  {
    title: '🌙 Peaceful Evening',
    body: 'May Allah bless your evening. Don\'t forget your evening adhkar.',
    data: { type: 'motivation', mood: 'evening' },
  },
];

export const notificationsService = {
  async requestPermission(): Promise<boolean> {
    if (!Device.isDevice) {
      return false;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Notification permission error:', error);
      return false;
    }
  },

  async scheduleMotivationalNotifications(): Promise<void> {
    // Cancel existing scheduled notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule morning notification (8 AM)
    await Notifications.scheduleNotificationAsync({
      content: motivationalMessages[0],
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1, // For testing; in production use daily
        repeats: false,
      },
    });

    // Schedule afternoon notification (1 PM)
    await Notifications.scheduleNotificationAsync({
      content: motivationalMessages[1],
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: false,
      },
    });

    // Schedule evening notification (7 PM)
    await Notifications.scheduleNotificationAsync({
      content: motivationalMessages[2],
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 10,
        repeats: false,
      },
    });
  },

  async scheduleDailyNotification(title: string, body: string, hour: number, minute: number): Promise<string> {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { type: 'daily' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
    return id;
  },

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  addNotificationReceivedListener(callback: (notification: Notifications.Notification) => void) {
    return Notifications.addNotificationReceivedListener(callback);
  },

  addNotificationResponseReceivedListener(callback: (response: Notifications.NotificationResponse) => void) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  },

  async getLastNotificationResponse(): Promise<Notifications.NotificationResponse | null> {
    return Notifications.getLastNotificationResponseAsync();
  },
};

// Motivational content based on mood
export const motivationalContent = {
  good: {
    verses: [
      { text: 'إِنَّ اللَّهَ مَعَ الَّذِينَ اتَّقَوْا وَالَّذِينَ هُمْ مُحْسِنُونَ', translation: 'Indeed, Allah is with those who fear Him and those who are doers of good.' },
      { text: 'وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ', translation: 'And my success is only through Allah.' },
    ],
    messages: [
      'Alhamdulillah for your beautiful day! Continue spreading positivity.',
      'Your gratitude brings more blessings. Keep smiling!',
    ],
    duas: [
      'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً',
      'اللَّهُمَّ لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ',
    ],
  },
  average: {
    verses: [
      { text: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', translation: 'For indeed, with hardship comes ease.' },
      { text: 'وَعَسَىٰ أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ', translation: 'Perhaps you dislike something and it is good for you.' },
    ],
    messages: [
      'Every day is a new opportunity. Make the most of this moment.',
      'Take a deep breath, make wudu, and pray. Peace is waiting for you.',
    ],
    duas: [
      'اللَّهُمَّ ارْحَمْنَا وَاغْفِرْ لَنَا وَارْزُقْنَا',
      'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    ],
  },
  bad: {
    verses: [
      { text: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ', translation: 'And do not lose hope in the mercy of Allah. Indeed, no one despairs of Allah\'s mercy except the disbelieving people.' },
      { text: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ', translation: 'Indeed, Allah does not allow the reward of the doers of good to be lost.' },
    ],
    messages: [
      'Every difficulty is a test from Allah. Your patience will be rewarded.',
      'Turn to Allah in your sadness. He is the Most Merciful and He hears you.',
      'This too shall pass. Trust in Allah\'s plan for you.',
    ],
    duas: [
      'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ',
      'رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ',
      'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَىٰ نَفْسِي طَرْفَةَ عَيْنٍ',
    ],
  },
};
