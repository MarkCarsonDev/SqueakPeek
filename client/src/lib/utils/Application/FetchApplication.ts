import { SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import { createSupabaseClient } from '@/lib/supabase/client';
import { Profile } from '@/lib/store/profile';
import { Application } from '@/lib/store/track';

export async function FetchApplication(
  profile: Profile,
  supabase: SupabaseClient = createSupabaseClient(),
): Promise<{ data: Application[] | null; error: PostgrestError | null }> {
  // Fetch all applications for the profile with their corresponding thread_id
  const { data: applications, error: applicationsError } = await supabase
    .from('application')
    
    .select(`*,
       application:opportunity!opportunity_id(company_thread!opportunity_id(thread_id))
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

  // // Map the applications to include thread_id at the top level
  const applicationsWithThread: Application[] = applications.map((application) => {
    const thread_id = application.application?.company_thread?.thread_id || null;
    delete application.application;
    return { ...application, thread_id };
  });
  console.log(applicationsWithThread);
  return { data: applicationsWithThread, error: null };
}



// Alternative query to fetch applications with thread_id
// .select(`
//   *,
//   opportunity (
//     company_thread (thread_id)
//   )
// `)
// Or 
// .select(`*, 
//   application:opportunity!opportunity_id(opportunity_id, company_thread:company_thread!opportunity_id(thread_id))
//   `)
