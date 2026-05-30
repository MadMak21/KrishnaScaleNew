import { createClient } from '@supabase/supabase-js';

// Force use of the new Supabase project explicitly to override any old Vercel environment variables
const supabaseUrl = "https://nxtapcvyyplrsjyxyzuk.supabase.co";
const supabaseAnonKey = "sb_publishable_YdQRiZcsBmenFJ80ozswAg_Vg0Bw0Pb";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
