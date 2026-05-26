import { createClient } from '@supabase/supabase-js';

// Prioritize environment variables from .env / Vercel, with fallback to current project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://nxtapcvyyplrsjyxyzuk.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_YdQRiZcsBmenFJ80ozswAg_Vg0Bw0Pb";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
