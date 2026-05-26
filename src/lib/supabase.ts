import { createClient } from '@supabase/supabase-js';

// Prioritize environment variables from .env / Vercel, with fallback to current project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zufzdjnpgvbiqpdhlmzo.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_IYu7QcfMN17YiikCPhACzw_xKC-hVJP";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
