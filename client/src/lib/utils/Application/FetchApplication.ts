import {SupabaseClient, PostgrestError} from '@supabase/supabase-js';
import {createSupabaseClient} from '@/lib/supabase/client';
import {Profile} from '@/lib/store/profile';
import {Application} from '@/lib/store/track';

export async function FetchApplication(
    profile: Profile,
    supabase: SupabaseClient = createSupabaseClient(),
): Promise<{data: Application[] | null, error: PostgrestError | null}> {
    // Fetch all applications for the profile
  const {data: applications, error: applicationsError} = await supabase
      .from('application')
      .select('*')
      .eq('profile_id', profile.profile_id)
      .order('order', {ascending: true});

  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError.message);
    return {data: null, error: applicationsError};
  }

  return {data: applications as Application[], error: null};
}