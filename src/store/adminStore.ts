import { create } from 'zustand';
import { products as defaultProducts, categories as defaultCategories } from '@/lib/data';
import { supabase } from '@/lib/supabase';

/* ── Types ── */

export interface ContactInfo {
  whatsappNumber: string;
  inquiryEmail: string;
  phoneDisplay: string;
}

export interface Settings {
  siteTitle: string;
  heroText: string;
  contactInfo: ContactInfo;
  products: typeof defaultProducts;
  categories: typeof defaultCategories;
  visibleProducts: string[];
  bannerSlides: { image?: string; text: string }[];
  exploreConfig: Record<string, { relatedProducts: string[], galleryImagesCount: number }>;
}

export interface AdminStore {
  isAuthenticated: boolean;
  isLoaded: boolean;
  settings: Settings;
  login: () => void;
  logout: () => void;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  loadSettings: () => Promise<void>;
  
  inquiryModalOpen: boolean;
  openInquiry: () => void;
  closeInquiry: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  siteTitle: "Krishna Scale",
  heroText: "Precision Industrial Weighing Solutions",
  contactInfo: {
    whatsappNumber: "919033621801",
    inquiryEmail: "sales@krishnascale.in",
    phoneDisplay: "+91 90336 21801"
  },
  products: defaultProducts,
  categories: defaultCategories,
  visibleProducts: defaultProducts.map(p => p.slug),
  bannerSlides: [
    { text: "HEAVY DUTY PLATFORMS" },
    { text: "PRECISION CALIBRATION" },
    { text: "INDUSTRIAL GRADE" },
    { text: "100% ACCURACY ASSURED" }
  ],
  exploreConfig: {}
};

// A fallback to local storage if DB is not reachable
const LOCAL_STORAGE_KEY = 'krishna_admin_settings';

export const useAdminStore = create<AdminStore>((set, get) => ({
  isAuthenticated: false,
  isLoaded: false,
  settings: DEFAULT_SETTINGS,
  inquiryModalOpen: false,

  openInquiry: () => set({ inquiryModalOpen: true }),
  closeInquiry: () => set({ inquiryModalOpen: false }),

  login: () => set({ isAuthenticated: true }),
  
  logout: () => set({ isAuthenticated: false }),

  loadSettings: async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    // 1. If keys are missing or placeholders, fallback immediately to local/defaults
    if (!supabaseUrl || !anonKey || supabaseUrl === "PLACEHOLDER_URL" || anonKey === "PLACEHOLDER_ANON_KEY") {
      console.warn("Supabase credentials not found. Using local/default settings.");
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        try {
          set({ settings: { ...DEFAULT_SETTINGS, ...JSON.parse(local) }, isLoaded: true });
          return;
        } catch (e) {
          console.error("Local storage parsing error", e);
        }
      }
      set({ settings: DEFAULT_SETTINGS, isLoaded: true });
      return;
    }

    // 2. Fetch from Supabase
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('data')
        .eq('id', 'krishna-scale-admin')
        .single();
        
      if (error) {
        throw error;
      }

      if (data && data.data) {
        set({ settings: { ...DEFAULT_SETTINGS, ...data.data }, isLoaded: true });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.data)); // Backup locally
      } else {
        // If document doesn't exist yet, we will just use defaults
        set({ settings: DEFAULT_SETTINGS, isLoaded: true });
      }
    } catch (error) {
      console.error("Error fetching settings from Supabase:", error);
      
      // Fallback to local storage on network error
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        try {
          set({ settings: { ...DEFAULT_SETTINGS, ...JSON.parse(local) }, isLoaded: true });
          return;
        } catch (e) { /* ignore */ }
      }
      set({ settings: DEFAULT_SETTINGS, isLoaded: true });
    }
  },

  updateSettings: async (newSettings: Partial<Settings>) => {
    const current = get().settings;
    const updated = { ...current, ...newSettings };
    
    // Optimistic local update
    set({ settings: updated });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Only attempt Supabase sync if keys are present
    if (supabaseUrl && anonKey && supabaseUrl !== "PLACEHOLDER_URL" && anonKey !== "PLACEHOLDER_ANON_KEY") {
      try {
        const { error } = await supabase
          .from('settings')
          .upsert({ id: 'krishna-scale-admin', data: updated });
          
        if (error) throw error;
      } catch (error) {
        console.error("Error saving settings to Supabase:", error);
        // Error is logged, but local state remains updated (optimistic)
      }
    }
  }
}));
