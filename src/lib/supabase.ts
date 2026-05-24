import { createClient } from '@supabase/supabase-js';

// Placeholder configuration. 
// The user will need to provide actual values in their .env file.
const supabaseUrl = "https://zufzdjnpgvbiqpdhlmzo.supabase.co";
const supabaseAnonKey = "sb_publishable_IYu7QcfMN17YiikCPhACzw_xKC-hVJP";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
