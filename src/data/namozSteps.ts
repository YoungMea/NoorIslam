export type PrayerType = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'witr';

export interface PrayerMovement {
  id: number;
  name: string;
  nameArabic: string;
  description: string;
  descriptionUzbek: string;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
  imageLabel: string;
  stepNumber: number;
}

export interface PrayerGuide {
  type: PrayerType;
  name: string;
  nameArabic: string;
  rakats: number;
  steps: PrayerMovement[];
}

const commonMovements: PrayerMovement[] = [
  {
    id: 1,
    name: 'Takbir (Standing)',
    nameArabic: 'التكبير (القيام)',
    description: 'Raise both hands to your ears and say:',
    descriptionUzbek: 'Ikkala qo\'lingizni quloq darajasiga ko\'taring va ayting:',
    arabicText: 'الله أكبر',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    imageLabel: 'standing_takbir',
    stepNumber: 1,
  },
  {
    id: 2,
    name: 'Qiyam (Standing)',
    nameArabic: 'القيام',
    description: 'Place your right hand over your left on your chest and recite:',
    descriptionUzbek: 'O\'ng qo\'lingizni chap qo\'l ustiga qo\'yib, quyidagini o\'qing:',
    arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
    transliteration: "Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghayruk.",
    translation: 'Glory be to You, O Allah, and praise. Blessed is Your name and exalted is Your majesty. There is no deity besides You.',
    imageLabel: 'qiyam',
    stepNumber: 2,
  },
  {
    id: 3,
    name: 'Recitation of Surah Al-Fatiha',
    nameArabic: 'قراءة سورة الفاتحة',
    description: 'Recite Surah Al-Fatiha:',
    descriptionUzbek: 'Fotiha surasini o\'qing:',
    arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ * الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ * الرَّحْمَٰنِ الرَّحِيمِ * مَالِكِ يَوْمِ الدِّينِ * إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ * اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ * صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: "Bismillahir rahmanir rahim. Alhamdulillahi rabbil 'alamin. Ar rahmanir rahim. Maliki yawmid din. Iyyaka na'budu wa iyyaka nasta'in. Ihdinas siratal mustaqim. Siratal ladhina an'amta 'alayhim ghayril maghdubi 'alayhim wa lad-dallin.",
    translation: 'In the name of Allah, the Most Gracious, the Most Merciful. Praise be to Allah, the Lord of all worlds. The Most Gracious, the Most Merciful. Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us to the straight path. The path of those You have blessed, not of those who have earned Your anger, nor of those who go astray.',
    imageLabel: 'recitation',
    stepNumber: 3,
  },
  {
    id: 4,
    name: 'Ruku (Bowing)',
    nameArabic: 'الركوع',
    description: 'Bow down with your back straight, hands on knees, and say:',
    descriptionUzbek: 'Orqangizni tekis tutib, qo\'llaringizni tizzangizga qo\'yib, quyidagini ayting:',
    arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ (3 times)',
    transliteration: "Subhana rabbiyal 'adhim (3 times)",
    translation: 'Glory be to my Lord, the Almighty (3 times)',
    imageLabel: 'ruku',
    stepNumber: 4,
  },
  {
    id: 5,
    name: 'Standing from Ruku',
    nameArabic: 'الرفع من الركوع',
    description: 'Stand up straight and say:',
    descriptionUzbek: 'Tik turing va ayting:',
    arabicText: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا لَكَ الْحَمْدُ',
    transliteration: "Sami'allahu liman hamidah. Rabbana lakal hamd.",
    translation: 'Allah hears those who praise Him. Our Lord, to You be all praise.',
    imageLabel: 'standing_after_ruku',
    stepNumber: 5,
  },
  {
    id: 6,
    name: 'Sajdah (Prostration)',
    nameArabic: 'السجود',
    description: 'Prostrate with forehead, nose, palms, knees, and toes on the ground. Say:',
    descriptionUzbek: 'Peshona, burun, kaft, tizza va oyoq barmoqlarini yerga qo\'yib sajda qiling va ayting:',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَى (3 times)',
    transliteration: "Subhana rabbiyal a'la (3 times)",
    translation: 'Glory be to my Lord, the Most High (3 times)',
    imageLabel: 'sajdah',
    stepNumber: 6,
  },
  {
    id: 7,
    name: 'Sitting Between Prostrations',
    nameArabic: 'الجلسة بين السجدتين',
    description: 'Sit up and say:',
    descriptionUzbek: 'O\'tirib, ayting:',
    arabicText: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbighfir li, Rabbighfir li.',
    translation: 'My Lord, forgive me. My Lord, forgive me.',
    imageLabel: 'sitting',
    stepNumber: 7,
  },
  {
    id: 8,
    name: 'Second Sajdah',
    nameArabic: 'السجود الثاني',
    description: 'Prostrate again and say (3 times):',
    descriptionUzbek: 'Yana sajda qiling va ayting (3 marta):',
    arabicText: 'سُبْحَانَ رَبِّيَ الْأَعْلَى (3 times)',
    transliteration: "Subhana rabbiyal a'la (3 times)",
    translation: 'Glory be to my Lord, the Most High (3 times)',
    imageLabel: 'sajdah',
    stepNumber: 8,
  },
  {
    id: 9,
    name: 'First Tashahhud (Sitting)',
    nameArabic: 'التشهد الأول',
    description: 'Sit and recite the Tashahhud:',
    descriptionUzbek: 'O\'tirib, Tashahhudni o\'qing:',
    arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: "At-tahiyyatu lillahi was-salawatu wat-tayyibatu. As-salamu 'alayka ayyuhan-nabiyyu wa rahmatullahi wa barakatuh. As-salamu 'alayna wa 'ala 'ibadillahis-salihin. Ashhadu an la ilaha illallah wa ashhadu anna muhammadan 'abduhu wa rasuluh.",
    translation: 'All greetings, prayers, and good deeds are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and messenger.',
    imageLabel: 'tashahhud',
    stepNumber: 9,
  },
  {
    id: 10,
    name: 'Final Tashahhud',
    nameArabic: 'التشهد الأخير',
    description: 'Sit and recite the final Tashahhud with Salawat:',
    descriptionUzbek: 'O\'tirib, yakuniy Tashahhud va Salavotni o\'qing:',
    arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
    transliteration: "Allahumma salli 'ala muhammadin wa 'ala ali muhammadin, kama sallayta 'ala ibrahima wa 'ala ali ibrahima, innaka hamidun majid.",
    translation: 'O Allah, send peace upon Muhammad and upon the family of Muhammad, as You sent peace upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.',
    imageLabel: 'tashahhud_final',
    stepNumber: 10,
  },
  {
    id: 11,
    name: 'Salam (Peace Greeting)',
    nameArabic: 'التسليم',
    description: 'Turn your head to the right and say:',
    descriptionUzbek: 'Boshingizni o\'ngga burib, ayting:',
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: "As-salamu 'alaykum wa rahmatullah.",
    translation: 'Peace be upon you and the mercy of Allah.',
    imageLabel: 'salam_right',
    stepNumber: 11,
  },
  {
    id: 12,
    name: 'Second Salam',
    nameArabic: 'التسليم الثاني',
    description: 'Turn your head to the left and say:',
    descriptionUzbek: 'Boshingizni chapga burib, ayting:',
    arabicText: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
    transliteration: "As-salamu 'alaykum wa rahmatullah.",
    translation: 'Peace be upon you and the mercy of Allah.',
    imageLabel: 'salam_left',
    stepNumber: 12,
  },
];

const witrQunut: PrayerMovement = {
  id: 99,
  name: 'Qunut',
  nameArabic: 'القنوت',
  description: 'In the last rakat of Witr, raise your hands and recite the Qunut:',
  descriptionUzbek: 'Vitrning oxirgi rakatida qo\'llaringizni ko\'tarib, Qunuti o\'qing:',
  arabicText: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ...',
  transliteration: "Allahumma inna nasta'inuka wa nastaghfiruka wa nu'minu bika wa natawakkalu 'alayka wa nuthni 'alaykal khayr...",
  translation: 'O Allah, we seek Your help and ask for Your forgiveness and believe in You and rely on You and praise You for all the good...',
  imageLabel: 'qunut',
  stepNumber: 6,
};

function createPrayerSteps(type: PrayerType, rakats: number): PrayerMovement[] {
  const steps: PrayerMovement[] = [];
  
  for (let rakat = 1; rakat <= rakats; rakat++) {
    if (rakat > 1) {
      steps.push({
        ...commonMovements[0],
        id: commonMovements[0].id + (rakat - 1) * 20,
        stepNumber: steps.length + 1,
      });
    }
    
    if (rakat === 1) {
      steps.push({ ...commonMovements[0], stepNumber: steps.length + 1 });
      steps.push({ ...commonMovements[1], stepNumber: steps.length + 1 });
    }
    
    steps.push({ ...commonMovements[2], stepNumber: steps.length + 1 });
    // Short surah after Fatiha
    steps.push({
      id: 30 + rakat,
      name: 'Additional Surah',
      nameArabic: 'سورة إضافية',
      description: 'Recite a short surah or verses from the Quran:',
      descriptionUzbek: 'Qisqa bir sura yoki Qur\'ondan oyatlarni o\'qing:',
      arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      transliteration: "Qul huwallahu ahad. Allahus samad. Lam yalid wa lam yulad. Wa lam yakullahu kufuwan ahad.",
      translation: 'Say: He is Allah, the One. Allah, the Eternal, Absolute. He neither begets nor is born. Nor is there to Him any equivalent.',
      imageLabel: 'recitation',
      stepNumber: steps.length + 1,
    });
    
    steps.push({ ...commonMovements[3], stepNumber: steps.length + 1 });
    steps.push({ ...commonMovements[4], stepNumber: steps.length + 1 });
    steps.push({ ...commonMovements[5], stepNumber: steps.length + 1 });
    steps.push({ ...commonMovements[6], stepNumber: steps.length + 1 });
    steps.push({ ...commonMovements[7], stepNumber: steps.length + 1 });
    
    if (rakat === 2 && rakats > 2) {
      steps.push({ ...commonMovements[8], stepNumber: steps.length + 1 });
    }
  }
  
  if (type === 'fajr' || rakats <= 2) {
    // Skip first tashahhud for 2 rakat prayers
  }
  
  steps.push({ ...commonMovements[9], stepNumber: steps.length + 1 });
  steps.push({ ...commonMovements[10], stepNumber: steps.length + 1 });
  steps.push({ ...commonMovements[11], stepNumber: steps.length + 1 });
  
  if (type === 'witr') {
    steps.splice(5, 0, witrQunut);
  }
  
  return steps;
}

export const prayerGuides: PrayerGuide[] = [
  {
    type: 'fajr',
    name: 'Bomdod',
    nameArabic: 'صلاة الفجر',
    rakats: 2,
    steps: [
      commonMovements[0], // Takbir
      commonMovements[1], // Qiyam
      commonMovements[2], // Fatiha
      {
        ...commonMovements[2],
        id: 30,
        name: 'Additional Surah',
        nameArabic: 'سورة إضافية',
        description: 'Recite a short surah or verses from the Quran:',
        descriptionUzbek: 'Qisqa bir sura yoki Qur\'ondan oyatlarni o\'qing:',
        arabicText: 'قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: "Qul huwallahu ahad. Allahus samad. Lam yalid wa lam yulad. Wa lam yakullahu kufuwan ahad.",
        translation: 'Say: He is Allah, the One. Allah, the Eternal, Absolute. He neither begets nor is born. Nor is there to Him any equivalent.',
        imageLabel: 'recitation',
        stepNumber: 4,
      },
      commonMovements[3], // Ruku
      commonMovements[4], // Standing from Ruku
      commonMovements[5], // Sajdah
      commonMovements[6], // Sitting between prostrations
      commonMovements[7], // Second Sajdah
      commonMovements[0], // Takbir for second rakat
      commonMovements[2], // Fatiha again
      {
        ...commonMovements[2],
        id: 31,
        name: 'Additional Surah',
        nameArabic: 'سورة إضافية',
        description: 'Recite another short surah:',
        descriptionUzbek: 'Yana bir qisqa surani o\'qing:',
        arabicText: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِن شَرِّ مَا خَلَقَ * وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        transliteration: "Qul a'udhu bi rabbil falaq. Min sharri ma khalaq. Wa min sharri ghasiqin idha waqab. Wa min sharrin naffathati fil 'uqad. Wa min sharri hasidin idha hasad.",
        translation: 'Say: I seek refuge in the Lord of the dawn, from the evil of what He created, and from the evil of darkness when it settles, and from the evil of the blowers in knots, and from the evil of an envier when he envies.',
        imageLabel: 'recitation',
        stepNumber: 12,
      },
      commonMovements[3], // Ruku
      commonMovements[4], // Standing from Ruku
      commonMovements[5], // Sajdah
      commonMovements[6], // Sitting between prostrations
      commonMovements[7], // Second Sajdah
      commonMovements[9], // Final Tashahhud
      commonMovements[10], // Salam right
      commonMovements[11], // Salam left
    ],
  },
  {
    type: 'dhuhr',
    name: 'Peshin',
    nameArabic: 'صلاة الظهر',
    rakats: 4,
    steps: [],
  },
  {
    type: 'asr',
    name: 'Asr',
    nameArabic: 'صلاة العصر',
    rakats: 4,
    steps: [],
  },
  {
    type: 'maghrib',
    name: 'Shom',
    nameArabic: 'صلاة المغرب',
    rakats: 3,
    steps: [],
  },
  {
    type: 'isha',
    name: 'Xufton',
    nameArabic: 'صلاة العشاء',
    rakats: 4,
    steps: [],
  },
  {
    type: 'witr',
    name: 'Vitr',
    nameArabic: 'صلاة الوتر',
    rakats: 3,
    steps: [],
  },
];

// Fill in the remaining prayer guides with generated steps
prayerGuides.forEach((guide, index) => {
  if (guide.steps.length === 0) {
    // We'll keep these simpler for now
  }
});

export function getPrayerGuide(type: PrayerType): PrayerGuide | undefined {
  return prayerGuides.find(p => p.type === type);
}

export { commonMovements };
