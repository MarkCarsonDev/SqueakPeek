import { SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { createSupabaseClient } from '@/lib/supabase/client';

export async function CompanyThread(
  opportunity_id: string,
  supabase: SupabaseClient = createSupabaseClient()
): Promise<{ data: string | null; error: PostgrestError | null }> {
  // Find the thread_id that connects with opportunity_id
  const { data: thread, error: threadError } = await supabase
    .from('company_thread')
    .select('thread_id')
    .eq('opportunity_id', opportunity_id);

  if (threadError) {
    console.error('Error initializing company thread:', threadError.message);
    return { data: null, error: threadError };
  }

  if (thread && thread.length > 0) {
    console.log('Company thread initialized:', thread[0].thread_id);
    return { data: thread[0].thread_id, error: null };
  }

  return { data: null, error: { message: 'No thread found for the given opportunity_id' } as PostgrestError };
}