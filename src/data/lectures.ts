export interface Lecture {
  id: string;
  title: string;
  titleUzbek: string;
  scholar: string;
  scholarArabic: string;
  category: string;
  type: 'video' | 'audio';
  duration: string;
  thumbnailUrl?: string;
  audioUrl?: string;
  videoUrl?: string;
  description: string;
  descriptionUzbek: string;
  date: string;
}

export const lectures: Lecture[] = [
  {
    id: 'lecture-1',
    title: 'The Beauty of Islam',
    titleUzbek: 'Islomning go\'zalligi',
    scholar: 'Mufti Menk',
    scholarArabic: 'مفتي منك',
    category: 'Faith',
    type: 'video',
    duration: '45:30',
    description: 'A beautiful reminder about the beauty and completeness of Islam as a way of life.',
    descriptionUzbek: 'Islomning hayot tarzi sifatidagi go\'zalligi va mukammalligi haqida go\'zal eslatma.',
    date: '2024-01-15',
  },
  {
    id: 'lecture-2',
    title: 'Patience and Gratitude',
    titleUzbek: 'Sabr va shukr',
    scholar: 'Nouman Ali Khan',
    scholarArabic: 'نعمان علي خان',
    category: 'Spirituality',
    type: 'audio',
    duration: '38:15',
    description: 'Understanding the importance of patience and gratitude in the life of a believer.',
    descriptionUzbek: 'Mo\'min hayotida sabr va shukrning ahamiyatini tushunish.',
    date: '2024-02-20',
  },
  {
    id: 'lecture-3',
    title: 'The Hereafter',
    titleUzbek: 'Oxirat',
    scholar: 'Omar Suleiman',
    scholarArabic: 'عمر سليمان',
    category: 'Faith',
    type: 'video',
    duration: '52:10',
    description: 'A profound reminder about the afterlife and preparing for our meeting with Allah.',
    descriptionUzbek: 'Oxirat va Alloh bilan uchrashuvga tayyorgarlik haqida chuqur eslatma.',
    date: '2024-03-10',
  },
  {
    id: 'lecture-4',
    title: 'Family in Islam',
    titleUzbek: 'Islomda oila',
    scholar: 'Yasir Qadhi',
    scholarArabic: 'ياسر القاضي',
    category: 'Family',
    type: 'audio',
    duration: '41:45',
    description: 'Islamic teachings on family values, marriage, and raising righteous children.',
    descriptionUzbek: 'Oila qadriyatlari, nikoh va solih farzandlar tarbiyasi haqida islomiy ta\'limotlar.',
    date: '2024-04-05',
  },
  {
    id: 'lecture-5',
    title: 'Stories of the Prophets',
    titleUzbek: 'Payg\'ambarlar qissalari',
    scholar: 'Mufti Menk',
    scholarArabic: 'مفتي منك',
    category: 'History',
    type: 'video',
    duration: '55:20',
    description: 'Inspiring stories from the lives of the prophets and the lessons we can learn.',
    descriptionUzbek: 'Payg\'ambarlar hayotidan ibratli hikoyalar va ulardan olishimiz mumkin bo\'lgan saboqlar.',
    date: '2024-05-12',
  },
  {
    id: 'lecture-6',
    title: 'The Power of Dua',
    titleUzbek: 'Duoning qudrati',
    scholar: 'Nouman Ali Khan',
    scholarArabic: 'نعمان علي خان',
    category: 'Spirituality',
    type: 'audio',
    duration: '35:50',
    description: 'Understanding the power and importance of supplication in a Muslim\'s life.',
    descriptionUzbek: 'Musulmon hayotida duoning qudrati va ahamiyatini tushunish.',
    date: '2024-06-18',
  },
  {
    id: 'lecture-7',
    title: 'Purification of the Heart',
    titleUzbek: 'Qalbni poklash',
    scholar: 'Omar Suleiman',
    scholarArabic: 'عمر سليمان',
    category: 'Spirituality',
    type: 'video',
    duration: '48:30',
    description: 'A guide to purifying the heart from spiritual diseases like envy, pride, and greed.',
    descriptionUzbek: 'Hasad, takabbur va ochko\'zlik kabi ruhiy kasalliklardan qalbni poklash bo\'yicha qo\'llanma.',
    date: '2024-07-22',
  },
  {
    id: 'lecture-8',
    title: 'The Quran: A Guide for Life',
    titleUzbek: 'Qur\'on: Hayot uchun yo\'l ko\'rsatkich',
    scholar: 'Yasir Qadhi',
    scholarArabic: 'ياسر القاضي',
    category: 'Quran',
    type: 'audio',
    duration: '42:15',
    description: 'How the Quran serves as a complete guide for every aspect of our lives.',
    descriptionUzbek: 'Qur\'on hayotimizning har bir jabhasida to\'liq yo\'l ko\'rsatkich bo\'lib xizmat qiladi.',
    date: '2024-08-30',
  },
  {
    id: 'lecture-9',
    title: 'Death and the Grave',
    titleUzbek: 'O\'lim va qabr',
    scholar: 'Mufti Menk',
    scholarArabic: 'مفتي منك',
    category: 'Faith',
    type: 'video',
    duration: '50:45',
    description: 'A sobering reminder about death and what awaits us in the grave.',
    descriptionUzbek: 'O\'lim va qabrda bizni nima kutayotgani haqida jiddiy eslatma.',
    date: '2024-09-15',
  },
  {
    id: 'lecture-10',
    title: 'Good Character',
    titleUzbek: 'Yaxshi xulq',
    scholar: 'Nouman Ali Khan',
    scholarArabic: 'نعمان علي خان',
    category: 'Character',
    type: 'audio',
    duration: '37:20',
    description: 'The importance of good character and manners in Islam.',
    descriptionUzbek: 'Islomda yaxshi xulq va odobning ahamiyati.',
    date: '2024-10-01',
  },
];

export const lectureCategories = [
  'Faith',
  'Spirituality',
  'Family',
  'History',
  'Quran',
  'Character',
];

export function getLecturesByCategory(category: string): Lecture[] {
  return lectures.filter(l => l.category === category);
}

export function getLecturesByType(type: 'video' | 'audio'): Lecture[] {
  return lectures.filter(l => l.type === type);
}

export function getLectureById(id: string): Lecture | undefined {
  return lectures.find(l => l.id === id);
}
