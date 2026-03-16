import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unhmycyekqkqtlxlrgas.supabase.co';
const supabaseKey = 'sb_publishable_84Acz4U0XqH16xOU9clnfg_hCUe5ylT';

export const supabase = createClient(supabaseUrl, supabaseKey);
