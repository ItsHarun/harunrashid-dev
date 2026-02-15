import { createClient } from '@supabase/supabase-js';

// Browser-safe Supabase client using Vite environment variables
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);
