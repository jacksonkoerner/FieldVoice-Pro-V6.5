// FieldVoice Pro - Shared Configuration
// This is the single source of truth for Supabase credentials and app constants

const SUPABASE_URL = 'https://egwpogdeqpfejwqwowib.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnd3BvZ2RlcXBmZWp3cXdvd2liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTkzMDIsImV4cCI6MjA4NTA3NTMwMn0.8os_wlTZ1UMer5i-_RvOOTJw8SxppZUhwmpbtnpiPAM';

// Initialize Supabase client (requires @supabase/supabase-js to be loaded first)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
