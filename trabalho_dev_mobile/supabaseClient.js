import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jgzrqbmyndiwfvaldjyx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnenJxYm15bmRpd2Z2YWxkanl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MjMzNzMsImV4cCI6MjA2Mjk5OTM3M30.JsE9PWCc_drnmMYaeJOYSVdWXlRKrWAYI2LdVBNZVEk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
