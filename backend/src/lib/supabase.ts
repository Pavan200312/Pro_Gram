import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with the service role key (backend-only)
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } } // disable session persistence for backend
);
