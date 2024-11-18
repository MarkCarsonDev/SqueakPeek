import { SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/store/profile';
import { Application } from '@/lib/store/track';

export async function FetchApplication(
  profile: Profile,
  supabase: SupabaseClient = createSupabaseClient(),
): Promise<{ data: Application[] | null; error: PostgrestError | null }> {
  // Fetch all applications for the profile with their corresponding thread_id and opportunity_tracking
  const { data: applications, error: applicationsError } = await supabase
    .from('application')
    .select(`*,
      application:opportunity!opportunity_id(
      company_thread!opportunity_id(thread_id),
      opportunity_tracking!opportunity_id(applied, rejected, online_assessment, interviewing, offer)
       )
      `)    
    .eq('profile_id', profile.profile_id)
    .order('order', { ascending: true });

  if (applicationsError) {
    console.error('Error fetching applications:', applicationsError.message);
    return { data: null, error: applicationsError };
  }

  if (!applications) {
    return { data: null, error: null };
  }

  console.log(applications);
  console.log(applications[0].application);
  // Map the applications to include thread_id at the top level
  const finalApplications: Application[] = applications.map((application) => {
    const thread_id = application.application?.company_thread?.thread_id || null;
    const application_stats = application.application?.opportunity_tracking;
    delete application.application;
    //delete application.application?.company_thread;
    return { ...application, thread_id, application_stats };
  });
  console.log(finalApplications);
  return { data: finalApplications, error: null };
}
