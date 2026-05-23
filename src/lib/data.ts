import hangingScale from '@/assets/products/IMG-20260510-WA0011.png';
import tableTopScale from '@/assets/products/IMG-20260510-WA0008.png';
import miniBodyScale from '@/assets/products/Mini (1).png';
import heavyDutyScale from '@/assets/products/IMG-20260510-WA0005.png';
import hangingOrange from '@/assets/products/IMG-20260510-WA0006.png';

export const products = [
  {
    id: "hanging-scale",
    img: hangingScale,
    gallery: [hangingScale, hangingScale, hangingScale],
    slug: "hanging-scale",
    translations: {
      en: {
        name: "HANGING SCALE",
        tag: "INDUSTRIAL",
        sub: "HEAVY DUTY WEIGHING FOR WAREHOUSES",
        description: "Built for industrial environments, our hanging scales offer robust performance with digital precision. Perfect for scrap yards and heavy material handling.",
        features: ["High capacity up to 500kg", "Durable metal casing", "Bright LED display", "Rechargeable battery"],
        capacity: "200kg - 500kg"
      },
      hi: {
        name: "हैंगिंग स्केल",
        tag: "औद्योगिक",
        sub: "गोदामों के लिए भारी वजन तौलना",
        description: "औद्योगिक वातावरण के लिए निर्मित, हमारे हैंगिंग स्केल डिजिटल सटीकता के साथ मजबूत प्रदर्शन प्रदान करते हैं। स्क्रैप यार्ड और भारी सामग्री प्रबंधन के लिए बिल्कुल सही।",
        features: ["500 किग्रा तक उच्च क्षमता", "टिकाऊ धातु आवरण", "उज्ज्वल एलईडी डिस्प्ले", "रिचार्जेबल बैटरी"],
        capacity: "200kg - 500kg"
      },
      gu: {
        name: "હેંગિંગ સ્કેલ",
        tag: "ઔદ્યોગિક",
        sub: "ગોડાઉનો માટે ભારે વજન",
        description: "ઔદ્યોગિક વાતાવરણ માટે બનાવેલ, અમારા હેંગિંગ સ્કેલ ડિજિટલ ચોકસાઈ સાથે મજબૂત કામગીરી પ્રદાન કરે છે. સ્ક્રેપ યાર્ડ્સ અને ભારે સામગ્રી વ્યવસ્થાપન માટે આદર્શ.",
        features: ["500 કિગ્રા સુધી ઉચ્ચ ક્ષમતા", "ટકાઉ ધાતુનું આવરણ", "તેજસ્વી એલઇડી ડિસ્પ્લે", "રિચાર્જેબલ બેટરી"],
        capacity: "200kg - 500kg"
      }
    }
  },
  {
    id: "table-top",
    img: tableTopScale,
    gallery: [tableTopScale, tableTopScale, tableTopScale],
    slug: "table-top",
    translations: {
      en: {
        name: "TABLE TOP",
        tag: "RETAIL",
        sub: "PRECISION WEIGHING FOR COUNTERS",
        description: "Compact and highly accurate table top scales for grocery stores, sweet shops, and general retail use. Features dual display for customer trust.",
        features: ["Stainless steel pan", "Dual LED display (Front & Back)", "High precision load cell", "Compact design"],
        capacity: "10kg - 30kg"
      },
      hi: {
        name: "टेबल टॉप",
        tag: "रिटेल",
        sub: "काउंटरों के लिए सटीक वजन",
        description: "किराने की दुकानों, मिठाई की दुकानों और सामान्य खुदरा उपयोग के लिए कॉम्पैक्ट और अत्यधिक सटीक टेबल टॉप स्केल। ग्राहक के विश्वास के लिए दोहरे डिस्प्ले की सुविधा।",
        features: ["स्टेनलेस स्टील पैन", "डुअल एलईडी डिस्प्ले (फ्रंट और बैक)", "उच्च परिशुद्धता लोड सेल", "कॉम्पैक्ट डिजाइन"],
        capacity: "10kg - 30kg"
      },
      gu: {
        name: "ટેબલ ટોપ",
        tag: "રિટેલ",
        sub: "કાઉન્ટરો માટે ચોક્કસ વજન",
        description: "કરિયાણાની દુકાનો, મીઠાઈની દુકાનો અને સામાન્ય છૂટક ઉપયોગ માટે કોમ્પેક્ટ અને અત્યંત ચોક્કસ ટેબલ ટોપ સ્કેલ. ગ્રાહકના વિશ્વાસ માટે ડ્યુઅલ ડિસ્પ્લે.",
        features: ["સ્ટેનલેસ સ્ટીલ પાન", "ડ્યુઅલ એલઇડી ડિસ્પ્લે (આગળ અને પાછળ)", "ઉચ્ચ ચોકસાઈ લોડ સેલ", "કોમ્પેક્ટ ડિઝાઇન"],
        capacity: "10kg - 30kg"
      }
    }
  },
  {
    id: "mini-body",
    img: miniBodyScale,
    gallery: [miniBodyScale, miniBodyScale, miniBodyScale],
    slug: "mini-body",
    translations: {
      en: {
        name: "MINI BODY",
        tag: "PRECISION",
        sub: "COMPACT SCALE FOR SMALL ITEMS",
        description: "Our micro SS scales are designed for extreme precision. Ideal for jewellery, spices, and small hardware parts.",
        features: ["Micro-gram accuracy", "Wind shield included", "Easy calibration", "Battery backup"],
        capacity: "1kg - 10kg"
      },
      hi: {
        name: "मिनी बॉडी",
        tag: "सटीकता",
        sub: "छोटी वस्तुओं के लिए कॉम्पैक्ट स्केल",
        description: "हमारे माइक्रो SS स्केल अत्यधिक सटीकता के लिए डिज़ाइन किए गए हैं। आभूषण, मसालों और छोटे हार्डवेयर भागों के लिए आदर्श।",
        features: ["माइक्रोग्राम सटीकता", "विंड शील्ड शामिल", "आसान अंशांकन", "बैटरी बैकअप"],
        capacity: "1kg - 10kg"
      },
      gu: {
        name: "મીની બોડી",
        tag: "ચોકસાઇ",
        sub: "નાની વસ્તુઓ માટે કોમ્પેક્ટ સ્કેલ",
        description: "અમારા માઇક્રો SS સ્કેલ અત્યંત ચોકસાઈ માટે ડિઝાઇન કરવામાં આવ્યા છે. દાગીના, મસાલા અને નાના હાર્ડવેર ભાગો માટે આદર્શ.",
        features: ["માઇક્રોગ્રામ ચોકસાઈ", "વિન્ડ શિલ્ડ શામેલ છે", "સરળ કેલિબ્રેશન", "બેટરી બેકઅપ"],
        capacity: "1kg - 10kg"
      }
    }
  },
  {
    id: "heavy-duty",
    img: heavyDutyScale,
    gallery: [heavyDutyScale, heavyDutyScale, heavyDutyScale],
    slug: "heavy-duty",
    translations: {
      en: {
        name: "HEAVY DUTY CRANE",
        tag: "INDUSTRIAL",
        sub: "EXTREME WEIGHT MEASUREMENT",
        description: "When you need to weigh tons, our crane scales deliver. Built to withstand extreme conditions and heavy loads safely.",
        features: ["Remote control operated", "Heavy duty hook and shackle", "Overload alarm", "Die-cast aluminum alloy enclosure"],
        capacity: "1 Ton - 5 Ton"
      },
      hi: {
        name: "हैवी ड्यूटी क्रेन",
        tag: "औद्योगिक",
        sub: "अत्यधिक वजन मापन",
        description: "जब आपको टन वजन करने की आवश्यकता होती है, तो हमारे क्रेन स्केल काम आते हैं। अत्यधिक परिस्थितियों और भारी भार को सुरक्षित रूप से सहने के लिए निर्मित।",
        features: ["रिमोट कंट्रोल संचालित", "हैवी ड्यूटी हुक और हथकड़ी", "ओवरलोड अलार्म", "डाई-कास्ट एल्यूमीनियम मिश्र धातु आवरण"],
        capacity: "1 Ton - 5 Ton"
      },
      gu: {
        name: "હેવી ડ્યુટી ક્રેન",
        tag: "ઔદ્યોગિક",
        sub: "અત્યંત વજન માપન",
        description: "જ્યારે તમારે ટન વજન કરવાની જરૂર હોય, ત્યારે અમારા ક્રેન સ્કેલ કામ આવે છે. આત્યંતિક પરિસ્થિતિઓ અને ભારે ભારને સુરક્ષિત રીતે સહન કરવા માટે બનાવેલ છે.",
        features: ["રિમોટ કંટ્રોલ ઓપરેટેડ", "હેવી ડ્યુટી હૂક અને શૅકલ", "ઓવરલોડ એલાર્મ", "ડાઇ-કાસ્ટ એલ્યુમિનિયમ એલોય એન્ક્લોઝર"],
        capacity: "1 Ton - 5 Ton"
      }
    }
  },
  {
    id: "hanging-orange",
    img: hangingOrange,
    gallery: [hangingOrange, hangingOrange, hangingOrange],
    slug: "hanging-orange",
    translations: {
      en: {
        name: "HANGING LITHIUM",
        tag: "INDUSTRIAL",
        sub: "LITHIUM BATTERY POWERED",
        description: "Our modern hanging scale powered by advanced lithium-ion battery technology for ultra-long standby times.",
        features: ["Lithium battery (100 hours backup)", "Lightweight aluminum body", "High visibility display", "Rust-proof hooks"],
        capacity: "100kg - 300kg"
      },
      hi: {
        name: "हैंगिंग लिथियम",
        tag: "औद्योगिक",
        sub: "लिथियम बैटरी संचालित",
        description: "अल्ट्रा-लॉन्ग स्टैंडबाय टाइम के लिए उन्नत लिथियम-आयन बैटरी तकनीक द्वारा संचालित हमारा आधुनिक हैंगिंग स्केल।",
        features: ["लिथियम बैटरी (100 घंटे बैकअप)", "हल्के एल्यूमीनियम बॉडी", "उच्च दृश्यता डिस्प्ले", "जंग-रोधी हुक"],
        capacity: "100kg - 300kg"
      },
      gu: {
        name: "હેંગિંગ લિથિયમ",
        tag: "ઔદ્યોગિક",
        sub: "લિથિયમ બેટરી સંચાલિત",
        description: "અલ્ટ્રા-લાંબા સ્ટેન્ડબાય સમય માટે અદ્યતન લિથિયમ-આયન બેટરી તકનીક દ્વારા સંચાલિત અમારો આધુનિક હેંગિંગ સ્કેલ.",
        features: ["લિથિયમ બેટરી (100 કલાક બેકઅપ)", "હલકો એલ્યુમિનિયમ બોડી", "ઉચ્ચ દૃશ્યતા ડિસ્પ્લે", "કાટ-પ્રતિરોધક હુક્સ"],
        capacity: "100kg - 300kg"
      }
    }
  }
];

export const categories = ["HANGING SCALES", "TABLE TOP SCALES", "PLATFORM SCALES", "MINI BODY SCALES", "CRANE SCALES"];
