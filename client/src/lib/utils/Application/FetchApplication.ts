import {SupabaseClient} from '@supabase/supabase-js';
import {Profile} from '@/lib/store/profile';
import {Application} from '@/lib/store/track';

export async function FetchApplication(
    supabase: SupabaseClient,
    profile: Profile,
): Promise<Application[] | undefined> {
  if (!profile) {
    console.error('Profile is required to fetch applications');
    return undefined;
  }
  
    // Fetch all applications for the profile
  const {data: applications, error: applicationsError} = await supabase
      .from('application')
      .select('*')
      .eq('profile_id', profile.profile_id)
      .order('order', {ascending: true});

  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError.message);
    return undefined;
  }

  return applications as Application[];
}