import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hkklkglcrllictnhebec.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhra2xrZ2xjcmxsaWN0bmhlYmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMDEzMjYsImV4cCI6MjA2MTc3NzMyNn0.iq-7xNRUIBH4RfS_pSCWNUfO69OU1zcUdxiYSay5r6c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);