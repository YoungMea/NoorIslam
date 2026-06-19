export interface Dua {
  id: string;
  category: DuaCategory;
  title: string;
  titleArabic: string;
  arabicText: string;
  transliteration: string;
  translation: string;
  translationUzbek: string;
  reference: string;
  audioUrl?: string;
}

export type DuaCategory = 
  | 'morning'
  | 'evening'
  | 'daily'
  | 'travel'
  | 'food'
  | 'sleep'
  | 'protection'
  | 'forgiveness';

export const duaCategories: { key: DuaCategory; titleKey: string; icon: string; color: string }[] = [
  { key: 'morning', titleKey: 'morningDuas', icon: '🌅', color: '#F59E0B' },
  { key: 'evening', titleKey: 'eveningDuas', icon: '🌙', color: '#6366F1' },
  { key: 'daily', titleKey: 'dailyDuas', icon: '📿', color: '#10B981' },
  { key: 'travel', titleKey: 'travelDuas', icon: '✈️', color: '#3B82F6' },
  { key: 'food', titleKey: 'foodDuas', icon: '🍽️', color: '#EF4444' },
  { key: 'sleep', titleKey: 'sleepDuas', icon: '🛌', color: '#8B5CF6' },
  { key: 'protection', titleKey: 'protectionDuas', icon: '🛡️', color: '#EC4899' },
  { key: 'forgiveness', titleKey: 'forgivenessDuas', icon: '🤲', color: '#14B8A6' },
];

export const duas: Dua[] = [
  // Morning Duas
  {
    id: 'morning-1',
    category: 'morning',
    title: 'Morning Remembrance',
    titleArabic: 'أذكار الصباح',
    arabicText: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan nushur.',
    translation: 'O Allah, by You we have reached the morning, by You we have reached the evening, by You we live, by You we die, and to You is the resurrection.',
    translationUzbek: "Allohim, Sendan ertalabga yetdik, Sendan kechga yetdik, Sendan tirikmiz, Sendan o'lamiz va qaytish Senga.",
    reference: 'Tirmidhi',
  },
  {
    id: 'morning-2',
    category: 'morning',
    title: 'Protection in Morning',
    titleArabic: 'دعاء الصباح للحماية',
    arabicText: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: "Bismillahilladhi la yadurru ma'asmihi shay'un fil ardi wa la fis sama'i wa huwas sami'ul 'alim.",
    translation: 'In the name of Allah, with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, the All-Knowing.',
    translationUzbek: "Allohning nomi bilanki, Uning nomi bilan osmonu zaminda hech narsa zarar yetkaza olmas. U eshituvchi va biluvchidir.",
    reference: 'Abu Dawud',
  },
  {
    id: 'morning-3',
    category: 'morning',
    title: 'Morning Praise',
    titleArabic: 'تسبيح الصباح',
    arabicText: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subhanallahi wa bihamdihi, subhanallahil azim.',
    translation: 'Glory be to Allah and praise Him, glory be to Allah the Almighty.',
    translationUzbek: "Allohga tasbeh va hamd bolsin, Buyuk Allohga tasbeh bolsin.",
    reference: 'Bukhari, Muslim',
  },
  
  // Evening Duas
  {
    id: 'evening-1',
    category: 'evening',
    title: 'Evening Remembrance',
    titleArabic: 'أذكار المساء',
    arabicText: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    transliteration: 'Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal masir.',
    translation: 'O Allah, by You we have reached the evening, by You we have reached the morning, by You we live, by You we die, and to You is the final return.',
    translationUzbek: "Allohim, Sendan kechga yetdik, Sendan ertalabga yetdik, Sendan tirikmiz, Sendan o'lamiz va qaytish Senga.",
    reference: 'Tirmidhi',
  },
  {
    id: 'evening-2',
    category: 'evening',
    title: 'Protection in Evening',
    titleArabic: 'دعاء المساء للحماية',
    arabicText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: "A'udhu bikalimatillahit tammati min sharri ma khalaq.",
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    translationUzbek: "Allohning mukammal kalimlari bilan Uning yaratgan narsalari yomonligidan panoh tilayman.",
    reference: 'Muslim',
  },
  
  // Daily Duas
  {
    id: 'daily-1',
    category: 'daily',
    title: 'Dua for Entering Home',
    titleArabic: 'دعاء دخول المنزل',
    arabicText: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna.",
    translation: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord Allah we rely.',
    translationUzbek: "Alloh nomi bilan kirdik, Alloh nomi bilan chiqdik va Robbimiz Allohga tavakkul qildik.",
    reference: 'Abu Dawud',
  },
  {
    id: 'daily-2',
    category: 'daily',
    title: 'Dua for Leaving Home',
    titleArabic: 'دعاء الخروج من المنزل',
    arabicText: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: "Bismillahi, tawakkaltu 'ala Allahi, wa la hawla wa la quwwata illa billah.",
    translation: 'In the name of Allah, I trust in Allah, and there is no power nor strength except with Allah.',
    translationUzbek: "Alloh nomi bilan, Allohga tavakkul qildim, Allohdan ozga kuch va quvvat yoq.",
    reference: 'Tirmidhi',
  },
  {
    id: 'daily-3',
    category: 'daily',
    title: 'Dua for Knowledge',
    titleArabic: 'دعاء طلب العلم',
    arabicText: 'رَبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni ilma.',
    translation: 'My Lord, increase me in knowledge.',
    translationUzbek: "Robbim, ilmimni ziyoda qil.",
    reference: 'Quran 20:114',
  },
  
  // Travel Duas
  {
    id: 'travel-1',
    category: 'travel',
    title: 'Dua for Travel',
    titleArabic: 'دعاء السفر',
    arabicText: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: "Subhanalladhi sakhkhara lana hadha wa ma kunna lahu muqrinin wa inna ila rabbina lamunqalibun.",
    translation: 'Glory to Him who has subjected this to us, and we could not have done it ourselves. And indeed, to our Lord we will return.',
    translationUzbek: "Buni bizga boysundirgan Alloh pokdir. Biz bunga qodir emas edik. Va albatta Robbimizga qaytguvchilarmiz.",
    reference: 'Quran 43:13-14',
  },
  {
    id: 'travel-2',
    category: 'travel',
    title: 'Dua for Safe Journey',
    titleArabic: 'دعاء السفر الآمن',
    arabicText: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',
    transliteration: "Allahumma inna nasaluka fi safarina hadha al-birra wat-taqwa, wa minal amali ma tarda.",
    translation: 'O Allah, we ask You for righteousness and piety in this journey of ours, and for deeds that please You.',
    translationUzbek: "Allohim, bu safarimizda Senda yaxshilik va taqvo va roziligingga erishadigan amallarni soraymiz.",
    reference: 'Muslim',
  },
  
  // Food Duas
  {
    id: 'food-1',
    category: 'food',
    title: 'Dua Before Eating',
    titleArabic: 'دعاء قبل الطعام',
    arabicText: 'بِسْمِ اللَّهِ',
    transliteration: "Bismillah.",
    translation: 'In the name of Allah.',
    translationUzbek: "Alloh nomi bilan.",
    reference: 'Bukhari',
  },
  {
    id: 'food-2',
    category: 'food',
    title: 'Dua After Eating',
    titleArabic: 'دعاء بعد الطعام',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ',
    transliteration: "Alhamdulillahilladhi at'amana wa saqana wa ja'alana minal muslimin.",
    translation: 'Praise be to Allah who fed us, gave us drink, and made us among the Muslims.',
    translationUzbek: "Bizga taom bergan, suv bergan va musulmonlardan qilgan Allohga hamd bolsin.",
    reference: 'Tirmidhi',
  },
  {
    id: 'food-3',
    category: 'food',
    title: 'Dua for Guest',
    titleArabic: 'دعاء للضيف',
    arabicText: 'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ',
    transliteration: "Allahumma barik lahum fima razaqtahum, waghfir lahum warhamhum.",
    translation: 'O Allah, bless them in what You have provided them, forgive them, and have mercy on them.',
    translationUzbek: "Allohim, ularga bergan rizqingda baraka bergin, ularni magfirat qilgin va rahm etgin.",
    reference: 'Muslim',
  },
  
  // Sleep Duas
  {
    id: 'sleep-1',
    category: 'sleep',
    title: 'Dua Before Sleep',
    titleArabic: 'دعاء النوم',
    arabicText: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: "Bismika Allahumma amutu wa ahya.",
    translation: 'In Your name, O Allah, I die and I live.',
    translationUzbek: "Allohim, Sening noming bilan o'laman va tirilaman.",
    reference: 'Bukhari',
  },
  {
    id: 'sleep-2',
    category: 'sleep',
    title: 'Dua Upon Waking',
    titleArabic: 'دعاء الاستيقاظ',
    arabicText: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: "Alhamdulillahilladhi ahyana ba'da ma amatana wa ilayhin nushur.",
    translation: 'Praise be to Allah who gave us life after death, and to Him is the resurrection.',
    translationUzbek: "Bizni oldirgandan keyin tiriltirgan Allohga hamd bolsin va qaytish Ungadir.",
    reference: 'Bukhari',
  },
  {
    id: 'sleep-3',
    category: 'sleep',
    title: 'Ayat-ul-Kursi before Sleep',
    titleArabic: 'آية الكرسي قبل النوم',
    arabicText: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    transliteration: "Allahu la ilaha illa huwal hayyul qayyum...",
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...',
    translationUzbek: "Allohdan ozga iloh yoq, U tirik va qayyumdir...",
    reference: 'Quran 2:255',
  },
  
  // Protection Duas
  {
    id: 'protection-1',
    category: 'protection',
    title: 'Seeking Protection',
    titleArabic: 'دعاء الحماية',
    arabicText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ',
    transliteration: "A'udhu bikalimatillahit tammati min kulli shaytanin wa hammatin wa min kulli 'aynin lammah.",
    translation: 'I seek refuge in the perfect words of Allah from every devil and poisonous creature and from every evil eye.',
    translationUzbek: "Allohning mukammal kalimlari bilan har bir shayton, zaharli jonzot va har bir yomon kozdan panoh tilayman.",
    reference: 'Bukhari',
  },
  {
    id: 'protection-2',
    category: 'protection',
    title: 'Protection from Anxiety',
    titleArabic: 'دعاء الهم والحزن',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ',
    transliteration: "Allahumma inni a'udhu bika minal hammi wal hazan, wa a'udhu bika minal 'ajzi wal kasal.",
    translation: 'O Allah, I seek refuge in You from anxiety and grief, and I seek refuge in You from incapacity and laziness.',
    translationUzbek: "Allohim, g'am-qayg'udan Senga panoh tilayman, ojizlik va dangasalikdan Senga panoh tilayman.",
    reference: 'Bukhari',
  },
  {
    id: 'protection-3',
    category: 'protection',
    title: 'The Three Quls',
    titleArabic: 'القلاقل الثلاث',
    arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ...',
    transliteration: "Qul huwallahu ahad... Qul a'udhu bi rabbil falaq... Qul a'udhu bi rabbin nas...",
    translation: 'Say: He is Allah, the One... Say: I seek refuge in the Lord of the dawn... Say: I seek refuge in the Lord of mankind...',
    translationUzbek: "Ayting: U Alloh yagonadir... Ayting: Tong Robbidan panoh tilayman... Ayting: Odamlar Robbilariga panoh tilayman...",
    reference: 'Quran 112-114',
  },
  
  // Forgiveness Duas
  {
    id: 'forgiveness-1',
    category: 'forgiveness',
    title: 'Seeking Forgiveness',
    titleArabic: 'دعاء الاستغفار',
    arabicText: 'أَسْتَغْفِرُ اللَّهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ',
    transliteration: "Astaghfirullaha rabbi min kulli dhambin wa atubu ilayh.",
    translation: 'I seek forgiveness from Allah, my Lord, from every sin and I repent to Him.',
    translationUzbek: "Robbim Allohdan har bir gunohim uchun magfirat tilayman va Unga tavba qilaman.",
    reference: 'Quran',
  },
  {
    id: 'forgiveness-2',
    category: 'forgiveness',
    title: 'Sayyidul Istighfar',
    titleArabic: 'سيد الاستغفار',
    arabicText: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
    transliteration: "Allahumma anta rabbi la ilaha illa anta, khalaqtani wa ana abduka...",
    translation: 'O Allah, You are my Lord, there is no deity except You. You created me and I am Your servant...',
    translationUzbek: "Allohim, Sen Robbimsan, Sendan ozga iloh yoq. Meni Sen yaratding va men Sening bandangman...",
    reference: 'Bukhari',
  },
  {
    id: 'forgiveness-3',
    category: 'forgiveness',
    title: 'Dua for Mercy',
    titleArabic: 'دعاء الرحمة',
    arabicText: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا',
    transliteration: 'Rabbana-ghfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana.',
    translation: 'Our Lord, forgive us our sins and our excess in our affairs and plant firmly our feet.',
    translationUzbek: "Robbimiz, gunohlarimizni va ishimizdagi haddan oshganliklarimizni magfirat qil va qadamlarimizni mustahkam qil.",
    reference: 'Quran 3:147',
  },
];

export function getDuasByCategory(category: DuaCategory): Dua[] {
  return duas.filter(d => d.category === category);
}

export function getDuaById(id: string): Dua | undefined {
  return duas.find(d => d.id === id);
}
