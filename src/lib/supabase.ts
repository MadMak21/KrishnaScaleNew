import { createClient } from '@supabase/supabase-js';

// Placeholder configuration. 
// The user will need to provide actual values in their .env file.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "PLACEHOLDER_URL";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "PLACEHOLDER_ANON_KEY";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
