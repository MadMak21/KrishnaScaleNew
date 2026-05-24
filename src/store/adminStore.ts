import { create } from 'zustand';
import { products as defaultProducts, categories as defaultCategories } from '@/lib/data';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/* ── Types ── */

export interface ProductTranslation {
  name: string;
  tag: string;
  sub: string;
  description: string;
  features: string[];
  capacity: string;
}

export interface ProductSpecs {
  accuracy: string;
  material: string;
  displayType: string;
  batteryBackup: string;
  warranty: string;
}

export interface ProductData {
  id: string;
  slug: string;
  img: string;                     // main image (import path or base64)
  gallery: string[];               // multiple gallery images
  translations: {
    en: ProductTranslation;
    hi: ProductTranslation;
    gu: ProductTranslation;
  };
  specs: ProductSpecs;
}

export interface BannerSlide {
  id: string;
  image: string;
  text: string;
}

export interface ContactInfo {
  whatsappNumber: string;
  inquiryEmail: string;
  phoneDisplay: string;            // display format like "+91 90336 21801"
}

export interface ExploreConfig {
  relatedProducts: string[];
  galleryImagesCount: number;
}

export interface AdminSettings {
  bannerSlides: BannerSlide[];
  visibleProducts: string[];
  exploreConfig: Record<string, ExploreConfig>;
  products: ProductData[];
  contactInfo: ContactInfo;
}

interface AdminStore {
  settings: AdminSettings;
  isLoaded: boolean;               // tracks if initial load from Firebase is done
  loadSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  updateExploreConfig: (slug: string, config: Partial<ExploreConfig>) => void;
  updateProduct: (slug: string, updates: Partial<ProductData>) => void;
  updateProductTranslation: (slug: string, lang: 'en' | 'hi' | 'gu', updates: Partial<ProductTranslation>) => void;
  updateProductSpecs: (slug: string, updates: Partial<ProductSpecs>) => void;
  updateProductGallery: (slug: string, gallery: string[]) => void;
  addProduct: (product: ProductData) => void;
  removeProduct: (slug: string) => void;
  updateContactInfo: (info: Partial<ContactInfo>) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isInquiryOpen: boolean;
  inquiryProductSlug: string | null;
  openInquiry: (slug?: string | null) => void;
  closeInquiry: () => void;
}

/* ── Defaults from data.ts ── */

const defaultProductsData: ProductData[] = defaultProducts.map(p => ({
  id: p.id,
  slug: p.slug,
  img: p.img,
  gallery: p.gallery || [p.img],
  translations: p.translations,
  specs: {
    accuracy: 'Standard Class III / Heavy Duty',
    material: 'MS / SS (Industrial Grade)',
    displayType: 'High Brightness Red/Green LED',
    batteryBackup: 'Up to 48 Hours In-built',
    warranty: '1 Year Manufacturer Warranty',
  },
}));

const defaultSettings: AdminSettings = {
  bannerSlides: defaultCategories.map((c, i) => ({
    id: `slide-${i}`,
    image: defaultProducts[i % defaultProducts.length].img,
    text: c,
  })),
  visibleProducts: defaultProducts.map(p => p.slug),
  exploreConfig: {},
  products: defaultProductsData,
  contactInfo: {
    whatsappNumber: '919033621801',
    inquiryEmail: 'sales@krishnascale.in',
    phoneDisplay: '+91 90336 21801',
  },
};

/* ── Helper to sync state to Firebase ── */
const syncToFirebase = async (settings: AdminSettings) => {
  try {
    const docRef = doc(db, 'config', 'settings');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error("Failed to sync to Firebase. Ensure keys are valid.", error);
  }
};

/* ── Store ── */

export const useAdminStore = create<AdminStore>()((set, get) => ({
  settings: defaultSettings,
  isLoaded: false,

  loadSettings: async () => {
    try {
      const docRef = doc(db, 'config', 'settings');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<AdminSettings>;
        
        // Merge fetched data with defaults
        const currentProducts = data.products && data.products.length > 0 ? data.products : defaultSettings.products;
        
        // Deep merge products to ensure no missing keys
        const mergedProducts = currentProducts.map(p => {
          const defaultP = defaultSettings.products.find(dp => dp.slug === p.slug || dp.id === p.id);
          if (!defaultP) return p;
          return {
            ...defaultP,
            ...p,
            translations: {
              en: { ...defaultP.translations.en, ...(p.translations?.en || {}) },
              hi: { ...defaultP.translations.hi, ...(p.translations?.hi || {}) },
              gu: { ...defaultP.translations.gu, ...(p.translations?.gu || {}) },
            },
            specs: { ...defaultP.specs, ...(p.specs || {}) }
          };
        });

        const mergedSettings: AdminSettings = {
          ...defaultSettings,
          ...data,
          products: mergedProducts,
          contactInfo: { ...defaultSettings.contactInfo, ...(data.contactInfo || {}) },
          exploreConfig: { ...defaultSettings.exploreConfig, ...(data.exploreConfig || {}) },
          bannerSlides: data.bannerSlides || defaultSettings.bannerSlides,
          visibleProducts: data.visibleProducts || defaultSettings.visibleProducts,
        };

        set({ settings: mergedSettings, isLoaded: true });
      } else {
        // Doc doesn't exist, use defaults and save them
        set({ isLoaded: true });
        await syncToFirebase(defaultSettings);
      }
    } catch (error) {
      console.warn("Firebase fetch failed. Using defaults.", error);
      set({ isLoaded: true });
    }
  },

  updateSettings: (newSettings) => {
    const s = get().settings;
    const updated = { ...s, ...newSettings };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  updateExploreConfig: (slug, config) => {
    const s = get().settings;
    const updated = {
      ...s,
      exploreConfig: {
        ...s.exploreConfig,
        [slug]: {
          ...(s.exploreConfig[slug] || { relatedProducts: [], galleryImagesCount: 4 }),
          ...config,
        },
      },
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  updateProduct: (slug, updates) => {
    const s = get().settings;
    const updated = {
      ...s,
      products: s.products.map(p => (p.slug === slug ? { ...p, ...updates } : p)),
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  updateProductTranslation: (slug, lang, updates) => {
    const s = get().settings;
    const updated = {
      ...s,
      products: s.products.map(p =>
        p.slug === slug
          ? { ...p, translations: { ...p.translations, [lang]: { ...p.translations[lang], ...updates } } }
          : p
      ),
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  updateProductSpecs: (slug, updates) => {
    const s = get().settings;
    const updated = {
      ...s,
      products: s.products.map(p => (p.slug === slug ? { ...p, specs: { ...p.specs, ...updates } } : p)),
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  updateProductGallery: (slug, gallery) => {
    const s = get().settings;
    const updated = {
      ...s,
      products: s.products.map(p => (p.slug === slug ? { ...p, gallery } : p)),
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  addProduct: (product) => {
    const s = get().settings;
    const updated = {
      ...s,
      products: [...s.products, product],
      visibleProducts: [...s.visibleProducts, product.slug],
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  removeProduct: (slug) => {
    const s = get().settings;
    const updated = {
      ...s,
      products: s.products.filter(p => p.slug !== slug),
      visibleProducts: s.visibleProducts.filter(id => id !== slug),
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  updateContactInfo: (info) => {
    const s = get().settings;
    const updated = {
      ...s,
      contactInfo: { ...s.contactInfo, ...info },
    };
    set({ settings: updated });
    syncToFirebase(updated);
  },

  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  isInquiryOpen: false,
  inquiryProductSlug: null,
  openInquiry: (slug = null) => set({ isInquiryOpen: true, inquiryProductSlug: slug }),
  closeInquiry: () => set({ isInquiryOpen: false, inquiryProductSlug: null }),
}));
