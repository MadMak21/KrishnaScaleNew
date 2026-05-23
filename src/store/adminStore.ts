import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products, categories } from '@/lib/data';

export interface BannerSlide {
  id: string;
  image: string;
  text: string;
}

export interface AdminSettings {
  bannerSlides: BannerSlide[];
  visibleProducts: string[];
  exploreConfig: Record<string, {
    relatedProducts: string[];
    galleryImagesCount: number;
  }>;
}

interface AdminStore {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
  updateExploreConfig: (slug: string, config: Partial<AdminSettings['exploreConfig'][string]>) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const defaultSettings: AdminSettings = {
  bannerSlides: categories.map((c, i) => ({
    id: `slide-${i}`,
    image: products[i % products.length].img,
    text: c,
  })),
  visibleProducts: products.map((p) => p.slug),
  exploreConfig: {},
};

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
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'admin-storage',
    }
  )
);
