import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ykcercaqrkgkzflnkwxl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2VyY2Fxcmtna3pmbG5rd3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0MzAyMDMsImV4cCI6MjA4MTAwNjIwM30.q0OmiFS9Miz1onLKih-Zb3xiGtDtmSMqCHl80Pg2TzY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);