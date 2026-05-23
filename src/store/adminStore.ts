import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as defaultProducts, categories as defaultCategories } from '@/lib/data';

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

/* ── Store ── */

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),

      updateExploreConfig: (slug, config) =>
        set((state) => ({
          settings: {
            ...state.settings,
            exploreConfig: {
              ...state.settings.exploreConfig,
              [slug]: {
                ...(state.settings.exploreConfig[slug] || { relatedProducts: [], galleryImagesCount: 4 }),
                ...config,
              },
            },
          },
        })),

      updateProduct: (slug, updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            products: state.settings.products.map(p =>
              p.slug === slug ? { ...p, ...updates } : p
            ),
          },
        })),

      updateProductTranslation: (slug, lang, updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            products: state.settings.products.map(p =>
              p.slug === slug
                ? { ...p, translations: { ...p.translations, [lang]: { ...p.translations[lang], ...updates } } }
                : p
            ),
          },
        })),

      updateProductSpecs: (slug, updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            products: state.settings.products.map(p =>
              p.slug === slug ? { ...p, specs: { ...p.specs, ...updates } } : p
            ),
          },
        })),

      updateProductGallery: (slug, gallery) =>
        set((state) => ({
          settings: {
            ...state.settings,
            products: state.settings.products.map(p =>
              p.slug === slug ? { ...p, gallery } : p
            ),
          },
        })),

      addProduct: (product) =>
        set((state) => ({
          settings: {
            ...state.settings,
            products: [...state.settings.products, product],
            visibleProducts: [...state.settings.visibleProducts, product.slug],
          },
        })),

      removeProduct: (slug) =>
        set((state) => ({
          settings: {
            ...state.settings,
            products: state.settings.products.filter(p => p.slug !== slug),
            visibleProducts: state.settings.visibleProducts.filter(s => s !== slug),
          },
        })),

      updateContactInfo: (info) =>
        set((state) => ({
          settings: {
            ...state.settings,
            contactInfo: { ...state.settings.contactInfo, ...info },
          },
        })),

      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'admin-storage',
    }
  )
);
